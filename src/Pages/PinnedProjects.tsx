import React, { Component } from 'react';
import { List, ListItem, ListItemText, Typography, Chip, Container, CircularProgress, Button, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import PageDomain from "../Domain/Page/PageDomain";
import IProject from "../Models/IProject";
import IPage from "../Models/IPage";
import DOMPurify from "dompurify";

const statusStyles = {
    inProgress: {
        bgcolor: 'primary.main',
        color: 'common.white',
        fontWeight: 'bold',
        borderRadius: '4px',
        padding: '4px 8px',
        display: 'inline-block',
        border: '2px solid lightblue',
        borderColor: 'primary.dark'
    },
    done: {
        bgcolor: 'success.main',
        color: 'common.white',
        fontWeight: 'bold',
        borderRadius: '4px',
        padding: '4px 8px',
        display: 'inline-block',
        border: '2px solid lightgreen',
        borderColor: 'success.dark'
    }
};

const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
});

interface ProjectProps {
    page: IPage;
}

interface ProjectState {
    isLoading: boolean;
    projects: IProject[] | undefined;
}

export default class PinnedProjects extends Component<ProjectProps, ProjectState> {
    private pageDomain: PageDomain;

    constructor(props: ProjectProps) {
        super(props);
        this.pageDomain = new PageDomain();
        this.state = { isLoading: true, projects: undefined };
    }

    componentDidMount(): void {
        this.fetchPinnedProjects();
    }

    private async fetchPinnedProjects(): Promise<void> {
        try {
            const projects: IProject[] | undefined = await this.pageDomain.getPageProjects(this.props.page.id)
                .then(projects => {
                    return projects.filter(project => project.pinned);
                });
            this.setState({ projects, isLoading: false });
        } catch (error) {
            console.error('Failed to load projects:', error);
            this.setState({ isLoading: false });
        }
    }


    render() {
        const { isLoading, projects } = this.state;
        if (isLoading) {
            return <CircularProgress />;
        }

        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <Typography variant="h4" align="center" gutterBottom sx={{ mt: 3, mb: 2 }} color={'#011226'}>
                        Przypięte Projekty
                    </Typography>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {projects?.map((project, index) => (
                            <Link to={`/project/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItem alignItems="flex-start" key={index} sx={{ borderBottom: '1px solid #e0e0e0', pb: 2, mb: 2 }}>
                                    <ListItemText
                                        primary={
                                            <Link to={`/project/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <Typography variant="h5" gutterBottom>
                                                    {project.title}
                                                </Typography>
                                            </Link>
                                        }
                                        secondary={
                                            <>
                                                <Box component="span" sx={
                                                    project.status === 'inProgress' ?
                                                        statusStyles['inProgress'] :
                                                        statusStyles['done']
                                                }>
                                                    <b>Status:</b> {project.status === 'inProgress' ? 'W trakcie' : 'Zakończony'}
                                                </Box>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                    sx={{ display: 'block', mt: 1 }}
                                                >
                                                    {project.mainDescription && (
                                                        <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(project.mainDescription || '')}}/>
                                                    )}
                                                </Typography>
                                                {project.categories?.map((category, catIndex) => (
                                                    <Chip key={catIndex} label={category.name}
                                                          sx={{ marginRight: '5px', marginBottom: '5px', marginTop: '10px', backgroundColor: '#011226', color: '#ffffff' }}
                                                    />
                                                ))}
                                            </>
                                        }
                                    />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                    {projects && projects.length >= 1 && (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Button variant="contained" component={Link} to="/projects" sx={{ backgroundColor: '#011226', color: '#ffffff' }}>
                                Zobacz wszystkie projekty
                            </Button>
                        </div>
                    )}
                </Container>
            </ThemeProvider>
        );
    }
}
