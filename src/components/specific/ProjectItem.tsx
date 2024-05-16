import React from 'react';
import { ListItem, ListItemText, Typography, Box, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import IProject from "../../types/IProject";
import DOMPurify from "dompurify";

const statusStyles = {
    inProgress: {
        color: '#000000',
        fontWeight: 'bold',
        borderRadius: '8px',
        padding: '4px 12px',
        display: 'inline-block',
        border: '2px solid',
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)',
        }
    },
    done: {
        color: '#000000',
        fontWeight: 'bold',
        borderRadius: '8px',
        padding: '4px 12px',
        display: 'inline-block',
        border: '2px solid',
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)',
        }
    }
};

interface ProjectItemProps {
    project: IProject;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => (
    <Link to={`/project/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem alignItems="flex-start" sx={{ borderBottom: '1px solid #e0e0e0', pb: 2, mb: 2, '&:hover': { backgroundColor: '#f5f5f5' } }}>
            <ListItemText
                primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link to={`/project/${project.id}`} style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
                            <Typography variant="h5" gutterBottom>
                                {project.title}
                            </Typography>
                        </Link>
                        <Box component="span" sx={
                            project.status === 'inProgress' ?
                                statusStyles['inProgress'] :
                                statusStyles['done']
                        }>
                            {project.status === 'inProgress' ? 'IN PROGRESS' : 'DONE'}
                        </Box>
                    </Box>
                }
                secondary={
                    <>
                        <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            sx={{ display: 'block', mt: 1 }}
                        >
                            {project.mainDescription && (
                                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.mainDescription || '') }} />
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
