import React, { Component } from 'react';
import { Grid, Paper, Typography, Chip, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import PageDomain from "../PageDomain";
import IProject from "../Dto/IProject";
import IPage from "../Dto/IPage";
import { apiUrl } from "../../../env";
import DOMPurify from "dompurify";

const statusStyles = {
    inProgress: {
        bgcolor: 'primary.main', // Blue background for "In Progress"
        color: 'common.white',
        fontWeight: 'bold',
        borderRadius: '4px',
        padding: '4px 8px',
        display: 'inline-block',
        border: '2px solid lightblue',
        borderColor: 'primary.dark'
    },
    completed: {
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

export default class ProjectList extends Component<ProjectProps> {
    private pageDomain: PageDomain;
    private projects: IProject[] | null;

    constructor(props: ProjectProps) {
        super(props);
        this.state = {
            isLoading: false,
            error: undefined
        };
        this.pageDomain = new PageDomain();
        this.projects = null;
    }

    componentDidMount(): void {
        this.fetchProjects();
    }

    private async fetchProjects(): Promise<void> {
        this.setState({ isLoading: true });

        try {
            this.projects = await this.pageDomain.getPageProjects(this.props.page.id);
            this.setState({ isLoading: false });
        } catch (error) {
            this.setState({ isLoading: false });
        }
    };
    render() {
        const { projects } = this;

        return (
            <ThemeProvider theme={theme}>
                <Container>
                    {projects && projects.length > 0 && (
                        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 3, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                            Projekty
                        </Typography>
                    )}
                    <Grid container spacing={3}>
                        {projects?.map((project, index) => (
                            <Grid item xs={12} key={index}>
                                <Link to={`/project/${project.id}`} style={{textDecoration: 'none'}}>
                                    <Paper sx={{
                                        p: 2,
                                        borderRadius: 1,
                                        boxShadow: 1,
                                        '&:hover': {
                                            boxShadow: 2,
                                        },
                                        backgroundColor: index % 2 === 0 ? 'grey.200' : 'common.white',
                                        // display: 'flex',
                                        flexDirection: {xs: 'column', sm: index % 2 === 0 ? 'row-reverse' : 'row'},
                                        alignItems: 'center',
                                        gap: 2
                                    }}>
                                        <img
                                            src={apiUrl + '/uploads/img/' + project.details?.[0]?.imagePath ?? ''}
                                            alt={project.title ?? ''}
                                            style={{width: '100%', height: 'auto'}}
                                        />
                                        <div>
                                            <Typography variant="h5" gutterBottom>
                                                {project.title}
                                            </Typography>
                                            <div
                                                style={statusStyles.inProgress}>
                                                {'inProgress'}
                                            </div>
                                            {project.mainDescription && (
                                                <Typography variant="body1" gutterBottom>
                                                    <Typography variant="body1"
                                                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(project.mainDescription || '')}}/>
                                                </Typography>
                                            )}
                                        </div>
                                        <div>
                                            <Typography variant="body1" sx={{fontWeight: 600}}>Kategorie:</Typography>
                                            <div style={{marginBottom: '10px'}}>
                                                {project.categories?.map((category, catIndex) => (
                                                    <Chip key={catIndex} label={category.name}
                                                          style={{
                                                              marginRight: '5px',
                                                              marginBottom: '5px',
                                                              backgroundColor: '#a83232',
                                                              color: '#ffffff'
                                                          }}/>
                                                ))}
                                            </div>
                                            <Typography variant="body1" sx={{fontWeight: 600}}>Tagi:</Typography>
                                            <div>
                                                {project.tags?.map((tag, tagIndex) => (
                                                    <Chip key={tagIndex} label={tag.name} style={{
                                                        marginRight: '5px',
                                                        marginBottom: '5px',
                                                        backgroundColor: '#a83232',
                                                        color: '#ffffff'
                                                    }}/>
                                                ))}
                                            </div>
                                        </div>
                                    </Paper>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </ThemeProvider>
        );
    }
}
