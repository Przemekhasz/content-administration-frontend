import React from 'react';
import { Box, Typography } from '@mui/material';
import CameraIcon from '@mui/icons-material/PhotoCamera';

const LoadingScreen: React.FC = () => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" height="150vh" flexDirection="column">
            <CameraIcon style={{ fontSize: 60, animation: "spin 2s linear infinite" }} />
            <Typography variant="h6" marginTop={2}>
                Loading...
            </Typography>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </Box>
    );
};

export default LoadingScreen;
