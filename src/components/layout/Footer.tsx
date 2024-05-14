import React, { Component } from 'react';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import {Facebook, Twitter, Instagram, LinkedIn, YouTube} from '@mui/icons-material';
import IFooter from "../../types/IFooter";
import FooterDomain from "../../domain/Footer/FooterDomain";

interface FooterState {
    footer: IFooter;
    isLoading: boolean;
}

class Footer extends Component<{}, FooterState> {
    private readonly footerDomain: FooterDomain;

    constructor(props: {}) {
        super(props);
        this.state = {
            footer: {},
            isLoading: false
        };
        this.footerDomain = new FooterDomain();
    }

    componentDidMount(): void {
        this.fetchFooter();
    }

    private async fetchFooter(): Promise<void> {
        this.setState({ isLoading: true });

        const res: IFooter = await this.footerDomain.getFooter();

        this.setState({ footer: res, isLoading: false })
    }

    // TODO: Add dynamic social media link & icons
    render() {
        return (
            <Box sx={{
                backgroundColor: '#011226',
                color: 'white',
                padding: 3,
                marginTop: 3
            }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={4} textAlign="center">
                        <Typography variant="body1">{this.state.footer.followUs}</Typography>
                        <IconButton color="inherit" component="a" href="https://www.linkedin.com/in/przemys%C5%82aw-tarapacki-6b175a229/" aria-label="LinkedIn">
                            <LinkedIn />
                        </IconButton>
                        <IconButton color="inherit" component="a" href="https://www.facebook.com/profile.php?id=100008155635759" aria-label="Facebook">
                            <Facebook />
                        </IconButton>
                        <IconButton color="inherit" component="a" href="https://twitter.com/Rumcajs60484194" aria-label="Twitter">
                            <Twitter />
                        </IconButton>
                        <IconButton color="inherit" component="a" href="https://www.instagram.com/przeeemek18" aria-label="Instagram">
                            <Instagram />
                        </IconButton>
                        <IconButton color="inherit" component="a" href="https://www.youtube.com/channel/UCnXEAHARicY9KgLFJv_hN6A" aria-label="YouTube">
                            <YouTube />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} md={4} textAlign="center">
                        <Typography variant="h6">{this.state.footer.siteName}</Typography>
                        <Typography variant="body2">{this.state.footer.description}</Typography>
                        <Typography variant="body2">Email: <a href={`mailto:${this.state.footer.email}`}>{this.state.footer.email}</a></Typography>
                        <Typography variant="body2">Tel: <a href={`tel:${this.state.footer.phoneNumber}`}>{this.state.footer.phoneNumber}</a></Typography>
                    </Grid>
                    <Grid item xs={12} md={4} textAlign="center">
                        <Typography variant="body1">© {new Date().getFullYear()} {this.state.footer.siteName}, All rights reserved.</Typography>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default Footer;
