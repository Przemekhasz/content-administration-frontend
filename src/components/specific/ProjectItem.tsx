import React from 'react';
import { ListItem, ListItemText, Typography, Box, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import IProject from "../../types/IProject";
import DOMPurify from "dompurify";

const statusStyles = {
    inProgress: {
        bgcolor: 'primary.main',
        color: 'common.white',
        fontWeight: 'bold',
        borderRadius: '4px',
        padding: '4px 8px',
        display: 'inline-block',
        border: '2px solid lightblue',
        borderColor: 'primary.dark'
    },
    done: {
        bgcolor: 'success.main',
        color: 'common.white',
        fontWeight: 'bold',
        borderRadius: '4px',
        padding: '4px 8px',
        display: 'inline-block',
        border: '2px solid lightgreen',
        borderColor: 'success.dark'
    }
};

interface ProjectItemProps {
    project: IProject;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => (
    <Link to={`/project/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem alignItems="flex-start" sx={{ borderBottom: '1px solid #e0e0e0', pb: 2, mb: 2 }}>
            <ListItemText
                primary={
                    <Link to={`/project/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h5" gutterBottom>
                            {project.title}
                        </Typography>
                    </Link>
                }
                secondary={
                    <>
                        <Box component="span" sx={
                            project.status === 'inProgress' ?
                                statusStyles['inProgress'] :
                                statusStyles['done']
                        }>
                            <b>Status:</b> {project.status === 'inProgress' ? 'W trakcie' : 'Zakończony'}
                        </Box>
                        <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            sx={{ display: 'block', mt: 1 }}
                        >
                            {project.mainDescription && (
                                <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(project.mainDescription || '')}}/>
                            )}
                        </Typography>
                        {project.categories?.map((category, catIndex) => (
                            <Chip key={catIndex} label={category.name}
                                  sx={{ marginRight: '5px', marginBottom: '5px', marginTop: '10px', backgroundColor: '#011226', color: '#ffffff' }}
                            />
                        ))}
                    </>
                }
            />
        </ListItem>
    </Link>
);

