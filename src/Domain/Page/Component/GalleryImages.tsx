import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Dialog, DialogContent, DialogTitle, Container, Chip, Box } from '@mui/material';
import { apiUrl } from '../../../env';
import IImage from '../Dto/IImage';
import { useParams } from "react-router-dom";
import PageDomain from "../PageDomain";
import IGallery from "../Dto/IGallery";
import LoadingScreen from "../../../Infrastructure/Shared/components/LoadingScreen";
import MenuItemsComponent from "../../../Infrastructure/Shared/components/MenuItemsComponent";
import Footer from "../../../Infrastructure/Shared/components/Footer";
import DOMPurify from "dompurify";

export const GalleryImages: React.FC = () => {
    const [gallery, setGallery] = useState<IGallery | null>(null);
    const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
    const { galleryId } = useParams<{ galleryId: string }>();

    useEffect(() => {
        const fetchGallery = async () => {
            const pageDomain = new PageDomain();
            try {
                const fetchedGallery = await pageDomain.getGalleryById(galleryId);
                setGallery(fetchedGallery);
            } catch (error) {
                console.error('Error fetching gallery:', error);
            }
        };

        fetchGallery();
    }, [galleryId]);

    const handleImageClick = (image: IImage) => {
        setSelectedImage(image);
    };

    const handleClose = () => {
        setSelectedImage(null);
    };

    if (!gallery) {
        return <LoadingScreen />;
    }

    return (
        <>
            <MenuItemsComponent />
            <Container sx={{ marginTop: '300px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper
                            elevation={3}
                            sx={{
                                backgroundImage: `url(${apiUrl}/uploads/img/${gallery.images?.[0]?.imagePath ?? ''})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '300px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#ffffff',
                            }}
                        >
                            <Typography variant="h4">{gallery.name}</Typography>
                        </Paper>
                    </Grid>
                    {gallery.images?.map((image, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                            <Paper
                                elevation={3}
                                onClick={() => handleImageClick(image)}
                                sx={{
                                    backgroundImage: `url(${apiUrl}/uploads/img/${image.imagePath})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '200px',
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#ffffff',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: 24,
                                    }
                                }}
                            >
                                <Box sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '90%',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                                    color: 'white',
                                    padding: '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start',
                                    justifyContent: 'end',
                                }}>
                                    <Typography variant="h6">{image.title}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                {selectedImage && (
                    <Dialog
                        open={true}
                        onClose={handleClose}
                        fullWidth={true}
                        maxWidth="md"
                        PaperProps={{
                            style: {
                                height: '90vh',
                                width: '50vw',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: 0,
                            }
                        }}
                    >
                        <DialogTitle>{selectedImage.title}</DialogTitle>
                        <DialogContent>
                            <img src={`${apiUrl}/uploads/img/${selectedImage.imagePath}`}
                                 alt={selectedImage.title ?? ''}
                                 style={{
                                     width: '100%',
                                     height: 'auto',
                                     marginBottom: '20px'
                                 }} />
                            <Typography variant="body1" sx={{ marginBottom: '12px' }} gutterBottom>
                                <Typography variant="body1"
                                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(selectedImage.description || '')}}/>
                            </Typography>
                            <Typography variant="body2" sx={{ display: 'block', marginBottom: '8px' }}>
                                Kategorie:
                                {selectedImage.categories?.map((category, index) => (
                                    <Chip key={index} label={category.name}
                                          style={{
                                              marginRight: '5px',
                                              marginBottom: '5px',
                                              backgroundColor: '#ffa726',
                                              color: '#ffffff'
                                          }} />
                                ))}
                            </Typography>
                            <Typography variant="body2" sx={{ display: 'block' }}>
                                Tagi:
                                {selectedImage.tags?.map((tag, index) => (
                                    <Chip key={index} label={tag.name} style={{
                                        marginRight: '5px',
                                        marginBottom: '5px',
                                        backgroundColor: '#f06292',
                                        color: '#ffffff'
                                    }} />
                                ))}
                            </Typography>
                        </DialogContent>
                    </Dialog>
                )}
            </Container>
            <Footer />
        </>
    );
};

