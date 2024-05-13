import React, { Component } from "react";
import { Box } from "@mui/material";
import HeroComponent from "../Components/HeroComponent";
import IPage from "../Models/IPage";
import Projects from "./Projects";
import GalleryList from "./GalleryList";
import MenuItemsComponent from "../Components/MenuItemsComponent";
import Footer from "../Components/Footer";
import { ContactForm } from "../Components/ContactForm";
import { BodyTextComponent } from "../Components/BodyTextComponent";
import PinnedProjects from "./PinnedProjects";
import PrivatePageNotification from "../Components/PrivatePageNotification";

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
                        {page.showPinnedProjects ? (
                            <PinnedProjects page={page} />
                        ) : (
                            <Projects page={page} />
                        )}
                        <GalleryList page={page} />
                        <ContactForm />
                        <Footer />
                    </Box>
                ) : (
                    <PrivatePageNotification />
                )}
            </>
        );
    }
}

export default PageViewer;
