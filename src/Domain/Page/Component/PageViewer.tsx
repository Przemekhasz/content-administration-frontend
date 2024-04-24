import React, { Component } from "react";
import { Box, Typography } from "@mui/material";
import HeroComponent from "./HeroComponent";
import LoadingScreen from "../../../Infrastructure/Shared/components/LoadingScreen";
import IPage from "../Dto/IPage";

interface PageViewerProps {
    page: IPage;
}

export default class PageViewer extends Component<PageViewerProps> {
    render() {
        const { page } = this.props;

        return (
            <Box>
                <HeroComponent page={page} />
            </Box>
        );
    }
}

