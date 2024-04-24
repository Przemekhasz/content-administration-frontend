import React, { Component, Suspense, lazy } from 'react';
import {Routes, Route, Navigate, Link} from 'react-router-dom';
import LoadingScreen from "./Infrastructure/Shared/components/LoadingScreen";
import IPage from "./Domain/Page/Dto/IPage";
import MenuItemsComponent from "./Domain/Page/Component/MenuItemsComponent";
import PageDomain from "./Domain/Page/PageDomain";
import {ArrowBack} from "@mui/icons-material";
import { PageNotFound } from './Infrastructure/Shared/components/PageNotFound';

const PageViewer = lazy(() => import("./Domain/Page/Component/PageViewer"));

interface PageViewerState {
    isLoading: boolean;
    error?: Error;
}

export default class App extends Component<{}, PageViewerState> {
    private pageDomain: PageDomain;
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
        const { isLoading, error } = this.state;

        if (isLoading) return <LoadingScreen />;
        if (error) return <div>Error: {error.message}</div>;

        return (
            <>
                <MenuItemsComponent />
                <Suspense fallback={<LoadingScreen />}>
                    <Routes>
                        {this.pages?.map(page => (
                            <Route path={page.menuItem?.url || ''} element={<PageViewer page={page} key={page.id} />} />
                        ))}
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Suspense>
            </>
        );
    }
}
