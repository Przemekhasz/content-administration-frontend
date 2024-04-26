import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Grid, Button, AppBar, Toolbar } from '@mui/material';
import { apiUrl } from '../../../env';
import LoadingScreen from '../../../Infrastructure/Shared/components/LoadingScreen';
import IProject from '../Dto/IProject';
import PageDomain from '../../../Domain/Page/PageDomain';
import {useParams} from "react-router-dom";
import MenuItemsComponent from "../../../Infrastructure/Shared/components/MenuItemsComponent";
import Footer from "../../../Infrastructure/Shared/components/Footer";

interface RouteParams {
    projectId: string;
}


export function ProjectDetail() {
    const [project, setProject] = useState<IProject | null>(null);
    const { projectId } = useParams<{ projectId: string }>();
    const pageDomain = new PageDomain();

    useEffect(() => {
        const fetchProject = async (projectId: string | undefined) => {
            try {
                if (project && project.id === projectId) {
                    return;
                }
                const fetchedProject = await pageDomain.getProjectById(projectId);
                setProject(fetchedProject);
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };

        fetchProject(projectId);
    }, [projectId, pageDomain]);


    if (!project) {
        return <LoadingScreen />;
    }

    return (
        <>
            <MenuItemsComponent />
            <Container sx={{ marginTop: '300px' }}>
                <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        {project.title}
                    </Typography>
                    <img
                        src={apiUrl + '/uploads/img/' + project.details?.[0]?.imagePath ?? ''}
                        alt={project.title ?? ''}
                        style={{ width: '100%', maxWidth: '100%' }}
                    />
                </Paper>
                {project.details?.map((detail, index) => (
                    <Grid container spacing={3} key={index} style={{ marginBottom: '20px' }}>
                        {index % 2 === 0 ? (
                            <>
                                <Grid item xs={6}>
                                    <Typography variant="body1">{detail.description}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <img
                                        src={apiUrl + '/uploads/img/' + detail.imagePath ?? ''}
                                        alt={detail.description ?? ''}
                                        style={{ width: '100%', maxWidth: '100%' }}
                                    />
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs={6}>
                                    <img
                                        src={apiUrl + '/uploads/img/' + detail.imagePath ?? ''}
                                        alt={detail.description ?? ''}
                                        style={{ width: '100%', maxWidth: '100%' }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">{detail.description}</Typography>
                                </Grid>
                            </>
                        )}
                    </Grid>
                ))}
            </Container>
            <Footer />
        </>
    );
}
