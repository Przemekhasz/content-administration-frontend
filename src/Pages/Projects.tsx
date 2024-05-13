import React, { Component } from 'react';
import {CircularProgress, Container, Theme, Typography} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PageDomain from "../Domain/Page/PageDomain";
import IPage from "../Models/IPage";
import IProject from "../Models/IProject";
import {ProjectItem} from "../Components/ProjectItem";
import PaginationComponent from "../Components/PaginationComponent";

const theme: Theme = createTheme({
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
    totalProjects: number;
    currentPage: number;
}

export default class Projects extends Component<ProjectProps, ProjectState> {
    private pageDomain: PageDomain;
    private projectsPerPage: number = 3;

    constructor(props: ProjectProps) {
        super(props);
        this.pageDomain = new PageDomain();
        this.state = {
            isLoading: true,
            projects: null,
            totalProjects: 0,
            currentPage: 1
        };

        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.firstPage = this.firstPage.bind(this);
        this.lastPage = this.lastPage.bind(this);
    }


    componentDidMount(): void {
        this.fetchProjects();
    }

    private async fetchProjects(): Promise<void> {
        try {
            const projects: IProject[] = await this.pageDomain.getPageProjects(this.props.page.id);
            this.setState({ projects, totalProjects: projects.length, isLoading: false });
        } catch (error) {
            console.error('Failed to load projects:', error);
            this.setState({ isLoading: false });
        }
    }

    private nextPage(): void  {
        this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
    };

    private prevPage(): void  {
        this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
    };

    private firstPage(): void  {
        this.setState({ currentPage: 1 });
    };

    private lastPage(): void  {
        const totalPages: number = Math.ceil(this.state.totalProjects / this.projectsPerPage);
        this.setState({ currentPage: totalPages });
    };

    render() {
        const { isLoading, projects, currentPage, totalProjects } = this.state;
        if (isLoading) {
            return <CircularProgress />;
        }

        const indexOfLastProject: number = currentPage * this.projectsPerPage;
        const indexOfFirstProject: number = indexOfLastProject - this.projectsPerPage;
        const currentProjects: IProject[] | undefined = projects?.slice(indexOfFirstProject, indexOfLastProject);

        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <Typography variant="h4" align="center" gutterBottom sx={{ mt: 3, mb: 2 }} color={'#011226'}>
                        Projekty
                    </Typography>
                    {currentProjects && currentProjects.map((project, index) => (
                        <ProjectItem key={index} project={project} />
                    ))}
                    {projects && projects.length > this.projectsPerPage && (
                        <PaginationComponent
                            currentPage={this.state.currentPage}
                            itemsPerPage={this.projectsPerPage}
                            totalItems={this.state.totalProjects}
                            onNextPage={this.nextPage}
                            onPrevPage={this.prevPage}
                            onFirstPage={this.firstPage}
                            onLastPage={this.lastPage}
                        />
                    )}
                </Container>
            </ThemeProvider>
        );
    }
}
