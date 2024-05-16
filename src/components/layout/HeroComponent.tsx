import React, { Component } from 'react';
import { Box, IconButton, Typography, Button } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { LinkedIn, GitHub } from '@mui/icons-material';
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
                marginTop: '120px',
                p: { xs: 2, sm: 4, md: 6 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                textAlign: 'center',
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
                    filter: 'brightness(0.5)',
                }
            }}>
                <Box sx={{
                    textAlign: 'center',
                    maxWidth: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
                }}>
                    <Typography variant="h3" sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                    }}>
                        {mainHeader ? mainHeader.name : ""}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Welcome to my portfolio website! Discover my projects and get in touch.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, backgroundColor: '#011226' }}
                        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
                    >
                        Learn More
                    </Button>
                    <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'center' }}>
                        <IconButton href="https://www.linkedin.com/in/przemys%C5%82aw-tarapacki-6b175a229/" target="_blank" sx={{ color: 'white' }}>
                            <LinkedIn fontSize="large" />
                        </IconButton>
                        <IconButton href="https://github.com/Przemekhasz" target="_blank" sx={{ color: 'white' }}>
                            <GitHub fontSize="large" />
                        </IconButton>
                    </Box>
                </Box>
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
