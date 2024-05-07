import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Grid } from '@mui/material'; // Usunięto nieużywane zmienne AppBar i Toolbar
import { apiUrl } from '../../../env';
import LoadingScreen from '../../../Infrastructure/Shared/components/LoadingScreen';
import IProject from '../Dto/IProject';
import PageDomain from '../../../Domain/Page/PageDomain';
import { useParams } from "react-router-dom";
import MenuItemsComponent from "../../../Infrastructure/Shared/components/MenuItemsComponent";
import Footer from "../../../Infrastructure/Shared/components/Footer";
import DOMPurify from 'dompurify';

export function ProjectDetail() {
    const [project, setProject] = useState<IProject | null>(null);
    const { projectId } = useParams<{ projectId: string }>();

    useEffect((): void => {
        const fetchProject = async (projectId: string | undefined): Promise<void> => {
            const pageDomain: PageDomain = new PageDomain();
            try {
                const fetchedProject: IProject = await pageDomain.getProjectById(projectId);
                setProject(fetchedProject);
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };

        fetchProject(projectId);
    }, [projectId]);

    if (!project) {
        return <LoadingScreen />;
    }

    return (
        <>
            <MenuItemsComponent />
            <Container sx={{ marginTop: { xs: '300px', sm: '300px', md: '300px' } }}>
                <Paper elevation={3} sx={{ p: '20px', mb: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>
                        {project.title}
                    </Typography>
                    <img
                        src={apiUrl + '/uploads/img/' + project.details?.[0]?.imagePath ?? ''}
                        alt={project.title ?? ''}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Paper>
                {project.details?.map((detail, index) => (
                    <Grid container spacing={3} key={index} sx={{ mb: '20px' }}>
                        <Grid item xs={12} sm={index % 2 === 0 ? 6 : 12}>
                            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(detail.description || '') }} />
                        </Grid>
                        <Grid item xs={12} sm={index % 2 === 0 ? 6 : 12}>
                            <img
                                src={apiUrl + '/uploads/img/' + detail.imagePath ?? ''}
                                alt={detail.description ?? ''}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Grid>
                    </Grid>
                ))}
            </Container>
            <Footer />
        </>
    );
}
