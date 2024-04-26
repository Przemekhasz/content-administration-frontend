import React, { Component } from "react";
import { Box } from "@mui/material";
import HeroComponent from "./HeroComponent";
import IPage from "../Dto/IPage";
import ProjectList from "./ProjectList";
import GalleryList from "./GalleryList";
import MenuItemsComponent from "../../../Infrastructure/Shared/components/MenuItemsComponent";
import Footer from "../../../Infrastructure/Shared/components/Footer";

interface PageViewerProps {
    page: IPage;
}

export default class PageViewer extends Component<PageViewerProps> {
    private pageIdStorage(): void {
        localStorage.setItem("pageId", this.props.page.id ?? "")
    }

    componentDidMount(): void {
        this.pageIdStorage();
    }

    render() {
        const { page } = this.props;

        return (
            <Box>
                <MenuItemsComponent />
                <HeroComponent page={page} />
                <ProjectList page={page} />
                <GalleryList page={page} />
                <Footer />
            </Box>
        );
    }
}

