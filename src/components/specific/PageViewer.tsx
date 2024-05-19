import React, { Component } from "react";
import { Box } from "@mui/material";
import HeroComponent from "../layout/HeroComponent";
import IPage from "../../types/IPage";
import Projects from "./Projects";
import GalleryList from "./GalleryList";
import MenuItemsComponent from "../layout/MenuItemsComponent";
import Footer from "../layout/Footer";
import { ContactForm } from "./ContactForm";
import { BodyTextComponent } from "../layout/BodyTextComponent";
import PrivatePageNotification from "../common/PrivatePageNotification";
import PinnedProjects from "../specific/PinnedProjects";
import {SkillsCard} from "./SkillsList";

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
                            <>
                                <SkillsCard />
                                <PinnedProjects page={page} />
                            </>
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
