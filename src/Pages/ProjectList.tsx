import React, { Component, Suspense } from 'react';
import { Grid, Paper, Typography, Chip, Container, CircularProgress, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import PageDomain from "../Domain/Page/PageDomain";
import IProject from "../Models/IProject";
import IPage from "../Models/IPage";
import { apiUrl } from "../env";
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

interface ProjectState {
    isLoading: boolean;
    projects: IProject[] | null;
}

export default class ProjectList extends Component<ProjectProps, ProjectState> {
    private pageDomain: PageDomain;

    constructor(props: ProjectProps) {
        super(props);
        this.pageDomain = new PageDomain();
        this.state = { isLoading: true, projects: null };
    }

    componentDidMount(): void {
        this.fetchProjects();
    }

    private async fetchProjects(): Promise<void> {
        try {
            const projects = await this.pageDomain.getPageProjects(this.props.page.id);
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

        const displayProjects = projects?.slice(0, 2);

        return (
            <ThemeProvider theme={theme}>
                <Container>
                    {projects && projects.length > 0 && (
                        <>
                            <Typography variant="h4" align="center" gutterBottom sx={{ mt: 3, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                                Projekty
                            </Typography>
                        </>
                    )}
                    <Grid container spacing={3}>
                        {displayProjects?.map((project, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Link to={`/project/${project.id}`} style={{textDecoration: 'none'}}>
                                    <Paper sx={{
                                        p: 2,
                                        borderRadius: 1,
                                        boxShadow: 1,
                                        '&:hover': {
                                            boxShadow: 2,
                                        },
                                        backgroundColor: index % 2 === 0 ? 'grey.200' : 'common.white',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 2
                                    }}>
                                        <Suspense fallback={<CircularProgress />}>
                                            <img
                                                src={apiUrl + '/uploads/img/' + project.details?.[0]?.imagePath ?? ''}
                                                alt={project.title ?? ''}
                                                style={{width: '100%', height: 'auto'}}
                                            />
                                        </Suspense>
                                        <div>
                                            <Typography variant="h5" gutterBottom>
                                                {project.title}
                                            </Typography>
                                            <div
                                                style={statusStyles.inProgress}>
                                                {'inProgress'}
                                            </div>
                                            {project.mainDescription && (
                                                <Typography variant="body1" gutterBottom dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(project.mainDescription || '')}}/>
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
                                                              backgroundColor: '#011226',
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
                                                        backgroundColor: '#011226',
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
                    {projects && projects.length > 0 && (
                        <>
                            {projects.length > 1 && (
                                <div style={{textAlign: 'center', marginBottom: '20px', marginTop: '20px'}}>
                                    <Button variant="contained" color="primary" component={Link} to={`/projects`}>
                                        Zobacz wszystkie projekty
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </Container>
            </ThemeProvider>
        );
    }
}
