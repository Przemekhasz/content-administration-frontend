import React, { Component } from "react";
import PageDto from "../Dto/PageDto";
import PageRepository from "../Repository/PageRepository";
import {AxiosResponse} from "axios";
import {Box, CircularProgress, Typography} from "@mui/material";
import MenuItemsComponent from "./MenuItemsComponent";
import HeroComponent from "./HeroComponent";
import LoadingScreen from "../../../Infrastructure/Shared/components/LoadingScreen";

interface PageViewerState {
    page: PageDto | null;
    isLoading: boolean;
    error?: Error;
}

export default class PageViewer extends Component<{}, PageViewerState> {
    private pageRepository: PageRepository;

    constructor(props: {}) {
        super(props);
        this.state = {
            page: null,
            isLoading: false,
            error: undefined
        };
        this.pageRepository = new PageRepository();
    }

    componentDidMount(): void {
        this.fetchPages();
    }

    public fetchPages = async (): Promise<void> => {
        this.setState({ isLoading: true });
        try {
            const pagesResponse: AxiosResponse<PageDto[]> = await this.pageRepository.getPages();
            const pages: PageDto[] = pagesResponse.data;
            if (pages.length > 0) {
                const minPageNumberPage: PageDto = pages.reduce((prev: PageDto, curr: PageDto): PageDto => (prev.pageNumber ?? Infinity) < (curr.pageNumber ?? Infinity) ? prev : curr);
                await this.fetchPageById(minPageNumberPage.id as string);
            }
        } catch (error: unknown) {
            this.setState({ isLoading: false, error: error instanceof Error ? error : new Error('Failed to fetch pages') });
        }
    };

    public fetchPageById = async (id: string): Promise<void> => {
        try {
            const pageResponse: AxiosResponse<PageDto> = await this.pageRepository.getPageById(id);
            this.setState({ page: pageResponse.data, isLoading: false });
        } catch (error: unknown) {
            this.setState({ isLoading: false, error: error instanceof Error ? error : new Error('Failed to fetch page details') });
        }
    };

    render() {
        const { page, isLoading, error } = this.state;

        if (isLoading) {
            return <LoadingScreen />;
        }

        if (error) {
            return <Typography color="error">Error: {error.message}</Typography>;
        }

        if (!page) {
            return <Typography>No page available</Typography>;
        }

        return (
            <Box>
                <MenuItemsComponent />
                <HeroComponent />
            </Box>
        );
    }
}
