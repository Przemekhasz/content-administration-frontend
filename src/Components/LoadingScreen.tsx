import React from 'react';
import { Box, Typography } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';

const LoadingComponent = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            flexDirection="column"
            style={{ animation: 'fadeIn 0.5s' }}
        >
            <ExploreIcon
                style={{
                    fontSize: 60,
                    animation: "spin 2s linear infinite",
                    transform: "translateZ(0)"  // Sprzętowa akceleracja
                }}
            />
            <Typography variant="h6" marginTop={2} style={{ position: 'relative', width: 'fit-content' }}>
                <span style={{ whiteSpace: 'pre' }}>
                    L<span style={{ animation: 'typing 2s steps(7, end) infinite' }}>oading...</span>
                </span>
            </Typography>
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes typing {
                    from { width: 0; }
                    to { width: 100%; }
                }

                @keyframes blink {
                    from, to { border-color: transparent; }
                    50% { border-color: black; }
                }
                `}
            </style>
        </Box>
    );
};

export default LoadingComponent;
