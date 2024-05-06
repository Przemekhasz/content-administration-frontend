import React, { Component } from 'react';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import IFooter from "../../../Domain/Page/Dto/IFooter";
import PageDomain from "../../../Domain/Page/PageDomain";


interface FooterState {
    footer: IFooter;
    isLoading: boolean;
}

class Footer extends Component<{}, FooterState> {
    private pageDomain: PageDomain;

    constructor(props: {}) {
        super(props);
        this.state = {
            footer: {},
            isLoading: false
        };
        this.pageDomain = new PageDomain();
    }

    componentDidMount(): void {
        this.fetchFooter();
    }

    private async fetchFooter(): Promise<void> {
        this.setState({ isLoading: true });

        const res: IFooter = await this.pageDomain.getFooter();

        this.setState({ footer: res, isLoading: false })
    }

    render() {
        return (
            <Box sx={{
                backgroundColor: '#a83232',
                color: 'white',
                padding: 3,
                marginTop: 3
            }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={4} textAlign="center">
                        <Typography variant="body1">{this.state.footer.followUs}</Typography>
                        <IconButton color="inherit" component="a" href="https://facebook.com" aria-label="Facebook">
                            <Facebook />
                        </IconButton>
                        <IconButton color="inherit" component="a" href="https://twitter.com" aria-label="Twitter">
                            <Twitter />
                        </IconButton>
                        <IconButton color="inherit" component="a" href="https://instagram.com" aria-label="Instagram">
                            <Instagram />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} md={4} textAlign="center">
                        <Typography variant="h6">{this.state.footer.siteName}</Typography>
                        <Typography variant="body2">{this.state.footer.description}</Typography>
                        <Typography variant="body2">Email: {this.state.footer.email}</Typography>
                        <Typography variant="body2">Tel: {this.state.footer.phoneNumber}</Typography>
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
