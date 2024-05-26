import React, { Component, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingScreen from "./components/common/LoadingScreen";
import IPage from "./types/IPage";
import PageDomain from "./domain/Page/PageDomain";
import { PageNotFound } from './components/common/PageNotFound';
import { ProjectDetail } from './components/specific/ProjectDetail';
import { GalleryImages } from "./components/specific/GalleryImages";
import theme from './theme';
import "./App.css";

const PageViewer = lazy(() => import("./components/specific/PageViewer"));

interface PageViewerState {
    isLoading: boolean;
    error?: Error;
}

export default class App extends Component<{}, PageViewerState> {
    private readonly pageDomain: PageDomain;
    private pages: IPage[] | null;

    constructor(props: {}) {
        super(props);
        this.state = {
            isLoading: false,
            error: undefined
        };
        this.pageDomain = new PageDomain();
        this.pages = null;
    }

    componentDidMount(): void {
        this.fetchPages();
    }

    private async fetchPages(): Promise<void> {
        this.setState({ isLoading: true });

        try {
            this.pages = await this.pageDomain.findPages();
            this.setState({ isLoading: false });
        } catch (error) {
            this.setState({ isLoading: false });
        }
    };

    render() {
        const { isLoading } = this.state;

        if (isLoading) return <LoadingScreen />;

        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Suspense fallback={<LoadingScreen />}>
                    <Routes>
                        {this.pages?.map(page => (
                            <Route
                                key={page.id}
                                path={page.menuItem?.url || ''}
                                element={<PageViewer page={page} key={page.id} />}
                            />
                        ))}
                        <Route path='/project/:projectId' element={<ProjectDetail />} />
                        <Route path='/gallery/:galleryId' element={<GalleryImages />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Suspense>
            </ThemeProvider>
        );
    }
}
