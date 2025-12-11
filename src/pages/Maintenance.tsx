import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';

const Maintenance = () => {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '80vh',
                    textAlign: 'center',
                    gap: 3,
                }}
            >
                <BuildIcon sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }} />

                <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" color="text.primary">
                    Under Maintenance
                </Typography>

                <Typography variant="h5" color="text.secondary" paragraph>
                    We are currently improving our platform to serve you better.
                    Please check back soon!
                </Typography>

                <Typography variant="body1" color="text.secondary">
                    Thank you for your patience.
                </Typography>
            </Box>
        </Container>
    );
};

export default Maintenance;
