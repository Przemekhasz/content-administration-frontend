import React, { Component } from "react";
import { Box } from "@mui/material";
import HeroComponent from "../Components/HeroComponent";
import IPage from "../Models/IPage";
import ProjectList from "./ProjectList";
import GalleryList from "./GalleryList";
import MenuItemsComponent from "../Components/MenuItemsComponent";
import Footer from "../Components/Footer";
import { ContactForm } from "../Components/ContactForm";
import { BodyTextComponent } from "../Components/BodyTextComponent";

class PageViewer extends Component<{ page: IPage }> {
    private pageIdStorage(): void {
        localStorage.setItem("pageId", this.props.page.id ?? "");
    }

    componentDidMount(): void {
        this.pageIdStorage();
    }

    render() {
        const { page } = this.props;

        return (
            <>
                {page.public ? (
                    <Box>
                        <MenuItemsComponent />
                        <HeroComponent page={page} />
                        <BodyTextComponent page={page} />
                        <ProjectList page={page} />
                        <GalleryList page={page} />
                        <ContactForm />
                        <Footer />
                    </Box>
                ) : (
                    <h1>Niepubliczna</h1>
                )}
            </>
        );
    }
}

export default PageViewer;
