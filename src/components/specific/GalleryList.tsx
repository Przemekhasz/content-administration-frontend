import React, { Component } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { apiUrl } from '../../env';
import LoadingScreen from '../common/LoadingScreen';
import PageDomain from "../../domain/Page/PageDomain";
import IGallery from "../../types/IGallery";
import IPage from "../../types/IPage";
import { Link } from "react-router-dom";

interface GalleryListProps {
    page: IPage | null;
}

interface GalleryListState {
    galleries: IGallery[] | null;
}

class GalleryList extends Component<GalleryListProps, GalleryListState> {
    private readonly pageDomain: PageDomain;

    constructor(props: GalleryListProps) {
        super(props);
        this.state = {
            galleries: null,
        };
        this.pageDomain = new PageDomain();
    }

    componentDidMount() {
        this.fetchGalleries();
    }

    private async fetchGalleries(): Promise<void> {
        try {
            const galleries = await this.pageDomain.getPageGalleries(this.props.page?.id);
            this.setState({ galleries });
        } catch (error) {
            console.error('Error fetching galleries:', error);
        }
    }

    render() {
        const { galleries } = this.state;

        if (!galleries) {
            return <LoadingScreen />;
        }

        return (
            <Container>
                {galleries && galleries.length > 0 && (
                    <>
                        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 3, mb: 2 }} color={'#ff5252'}>
                            Galleries
                        </Typography>
                        <Grid container spacing={3}>
                            {galleries.map((gallery, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Link to={`/gallery/${gallery.id}`} style={{ textDecoration: 'none' }}>
                                        <Paper
                                            elevation={3}
                                            sx={{
                                                padding: '20px',
                                                borderRadius: '10px',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                '&:hover': {
                                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                                },
                                                backgroundImage: `url(${apiUrl}/uploads/img/${gallery.images?.[0]?.imagePath ?? ''})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                minHeight: '200px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Typography variant="h5" style={{ color: '#ffffff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                                                {gallery.name}
                                            </Typography>
                                        </Paper>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </Container>
        );
    }
}

export default GalleryList;
