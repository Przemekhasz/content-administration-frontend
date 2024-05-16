import React, { Component } from 'react';
import {
    CircularProgress,
    Container,
    Typography,
    Box
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PageDomain from "../../domain/Page/PageDomain";
import IPage from "../../types/IPage";
import IProject from "../../types/IProject";
import { ProjectItem } from "./ProjectItem";
import PaginationComponent from "../common/PaginationComponent";
import { DataModel, FilterConfig } from "../../types/types";
import { FilterManager } from "../common/FilterManager";
import { filterData } from "../../utils/filterData";

const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
    palette: {
        primary: {
            main: '#011226',
        },
    },
});

const filters: FilterConfig[] = [
    { field: 'title', type: 'string', label: 'Title' },
    { field: 'pinned', type: 'boolean', label: 'Pinned' },
];

interface ProjectProps {
    page: IPage;
}

interface ProjectState {
    isLoading: boolean;
    projects: IProject[] | null;
    totalProjects: number;
    currentPage: number;
    filterValues: Partial<DataModel>;
}

export default class Projects extends Component<ProjectProps, ProjectState> {
    private pageDomain: PageDomain;
    private projectsPerPage: number = 5;

    constructor(props: ProjectProps) {
        super(props);
        this.state = {
            isLoading: true,
            projects: null,
            totalProjects: 0,
            currentPage: 1,
            filterValues: {}
        };
        this.pageDomain = new PageDomain();
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

    private nextPage = (): void => {
        this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
    };

    private prevPage = (): void => {
        this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
    };

    private firstPage = (): void => {
        this.setState({ currentPage: 1 });
    };

    private lastPage = (): void => {
        const totalPages: number = Math.ceil(this.state.totalProjects / this.projectsPerPage);
        this.setState({ currentPage: totalPages });
    };

    private handleFilterChange = (filters: Partial<DataModel>): void => {
        this.setState({ filterValues: filters });
    }

    render() {
        const { isLoading, projects, currentPage, filterValues } = this.state;
        if (isLoading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <CircularProgress />
                </Box>
            );
        }

        const filteredProjects: IProject[] = filterData(projects || [], filterValues);

        const indexOfLastProject: number = currentPage * this.projectsPerPage;
        const indexOfFirstProject: number = indexOfLastProject - this.projectsPerPage;
        const currentProjects: IProject[] | undefined = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <Typography variant="h4" align="center" gutterBottom sx={{ mt: 3, mb: 2 }} color={'#011226'}>
                        Projects
                    </Typography>
                    <FilterManager filters={filters} onFilterChange={this.handleFilterChange} />
                    {currentProjects && currentProjects.map((project, index) => (
                        <ProjectItem key={index} project={project} />
                    ))}
                    {filteredProjects.length > this.projectsPerPage && (
                        <PaginationComponent
                            currentPage={this.state.currentPage}
                            itemsPerPage={this.projectsPerPage}
                            totalItems={filteredProjects.length}
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
