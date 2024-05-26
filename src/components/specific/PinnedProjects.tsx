import React, { Component } from 'react';
import { CircularProgress, Container, Typography, Box, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import PageDomain from "../../domain/Page/PageDomain";
import IPage from "../../types/IPage";
import IProject from "../../types/IProject";
import { ProjectItem } from "./ProjectItem";
import { Link } from "react-router-dom";
import theme from '../../theme';

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
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <CircularProgress />
                </Box>
            );
        }

        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <Typography variant="h4" align="center" gutterBottom sx={{ mt: 3, mb: 2 }} color={'#ff5252'}>
                        Pinned Projects
                    </Typography>
                    {projects && projects.map((project, index) => (
                        <ProjectItem key={index} project={project} />
                    ))}
                    {projects && projects.length >= 1 && (
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Button
                                variant="contained"
                                component={Link}
                                to="/projects"
                                sx={{ backgroundColor: '#011226', color: '#ffffff' }}
                            >
                                See all projects
                            </Button>
                        </Box>
                    )}
                </Container>
            </ThemeProvider>
        );
    }
}
