import React, { Component } from 'react';
import {Button, CircularProgress, Container, Typography} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PageDomain from "../Domain/Page/PageDomain";
import IPage from "../Models/IPage";
import IProject from "../Models/IProject";
import {ProjectItem} from "../Components/ProjectItem";
import {Link} from "react-router-dom";

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
                    {projects && projects.map((project, index) => (
                        <ProjectItem key={index} project={project} />
                    ))}
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
