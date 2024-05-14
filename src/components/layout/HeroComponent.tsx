import React, { Component } from 'react';
import { Box, IconButton } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import IPage from "../../types/IPage";
import { apiUrl } from "../../env";
import IPageHeader from "../../types/IPageHeader";

interface HeroComponentProps {
    page: IPage;
}

export default class HeroComponent extends Component<HeroComponentProps> {
    render() {
        const { page } = this.props;

        const mainHeader: IPageHeader | undefined = page.pageHeaders?.find(header => header.main);

        return (
            <Box sx={{
                position: 'relative',
                color: 'white',
                p: 6,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundImage: `url(${page.banner?.image ? `${apiUrl}/${page.banner.image}` : 'defaultImagePath'})`,
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',
                    zIndex: -1,
                }
            }}
            >
                <h1>{mainHeader ? mainHeader.name : ""}</h1>
                <IconButton
                    onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
                    sx={{
                        position: 'absolute',
                        bottom: 4,
                        color: 'white',
                        fontSize: '2rem',
                        mb: 6,
                    }}
                >
                    <KeyboardArrowDown />
                </IconButton>
            </Box>
        );
    }
}
