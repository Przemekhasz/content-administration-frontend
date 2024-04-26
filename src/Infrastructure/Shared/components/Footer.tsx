import React, { Component } from 'react';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

class Footer extends Component {
    render() {
        return (
            <Box sx={{
                backgroundColor: '#303030',
                color: 'white',
                padding: 3,
                marginTop: 3
            }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={4} textAlign="center">
                        <Typography variant="body1">Follow us:</Typography>
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
                        <Typography variant="h6">MySiteName</Typography>
                        <Typography variant="body2">Explore the world of possibilities with us.</Typography>
                        <Typography variant="body2">Email: contact@mysitename.com</Typography>
                        <Typography variant="body2">Tel: +123 456 7890</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} textAlign="center">
                        <Typography variant="body1">© 2024 MySiteName, All rights reserved.</Typography>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default Footer;
