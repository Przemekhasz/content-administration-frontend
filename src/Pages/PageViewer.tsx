import React, { Component } from "react";
import { Box } from "@mui/material";
import HeroComponent from "../Components/HeroComponent";
import IPage from "../Models/IPage";
import ProjectList from "./ProjectList";
import GalleryList from "./GalleryList";
import MenuItemsComponent from "../Components/MenuItemsComponent";
import Footer from "../Components/Footer";
import {BodyTextComponent} from "../Components/BodyTextComponent";
import {ContactForm} from "../Components/ContactForm";

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
                <BodyTextComponent page={page} />
                <ProjectList page={page} />
                <GalleryList page={page} />
                <ContactForm />
                <Footer />
            </Box>
        );
    }
}
