import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Grid, Box, useTheme, useMediaQuery } from '@mui/material';
import { apiUrl } from '../../env';
import LoadingScreen from '../common/LoadingScreen';
import IProject from '../../types/IProject';
import { useParams } from "react-router-dom";
import MenuItemsComponent from "../layout/MenuItemsComponent";
import Footer from "../layout/Footer";
import DOMPurify from 'dompurify';
import ProjectDomain from "../../domain/Project/ProjectDomain";

export function ProjectDetail() {
    const [project, setProject] = useState<IProject | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { projectId } = useParams<{ projectId: string }>();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchProject = async (): Promise<void> => {
            if (!projectId) return;
            const projectDomain = new ProjectDomain();
            try {
                const fetchedProject = await projectDomain.getProjectById(projectId);
                setProject(fetchedProject);
                setError('');
            } catch (error) {
                console.error('Error fetching project:', error);
                setError('Failed to load the project. Please try again later.');
            }
            setLoading(false);
        };

        fetchProject();
    }, [projectId]);

    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        return (
            <Typography variant="h6" color="error" align="center">
                {error}
            </Typography>
        );
    }

    if (!project) {
        return (
            <Typography variant="h6" align="center">
                Project not found.
            </Typography>
        );
    }

    return (
        <>
            <MenuItemsComponent />
            <Container sx={{ marginTop: '17rem', padding: isMobile ? '0' : '2rem' }}>
                <Paper elevation={3} sx={{ p: '20px', mb: '20px', backgroundColor: '#011226', color: '#ffffff' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        {project.title}
                    </Typography>
                    <Box
                        component="img"
                        src={apiUrl + '/uploads/img/' + project.details?.[0]?.imagePath ?? ''}
                        alt={project.title ?? ''}
                        sx={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                    />
                </Paper>
                {project.details?.map((detail, index) => (
                    <Grid container spacing={3} key={index}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(detail.description || '') }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                component="img"
                                src={apiUrl + '/uploads/img/' + detail.imagePath ?? ''}
                                alt={detail.description ?? ''}
                                sx={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                            />
                        </Grid>
                    </Grid>
                ))}
            </Container>
            <Footer />
        </>
    );
}
