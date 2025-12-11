import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardActions, Button, Avatar } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TableChartIcon from '@mui/icons-material/TableChart'; // Sheets
import DescriptionIcon from '@mui/icons-material/Description'; // Docs
import ChatIcon from '@mui/icons-material/Chat'; // Slack
import BugReportIcon from '@mui/icons-material/BugReport'; // Jira placeholder

const tools = [
    {
        id: 'github',
        name: 'GitHub',
        description: 'Sync issues, pull requests, and repositories directly.',
        icon: <GitHubIcon sx={{ fontSize: 40, color: '#333' }} />,
        color: '#333',
        connected: false,
    },
    {
        id: 'google-calendar',
        name: 'Google Calendar',
        description: 'Schedule meetings and reminders seamlessly.',
        icon: <CalendarTodayIcon sx={{ fontSize: 40, color: '#4285F4' }} />,
        color: '#4285F4',
        connected: true,
    },
    {
        id: 'google-sheets',
        name: 'Google Sheets',
        description: 'Export tasks and reports to spreadsheets.',
        icon: <TableChartIcon sx={{ fontSize: 40, color: '#34A853' }} />,
        color: '#34A853',
        connected: false,
    },
    {
        id: 'google-docs',
        name: 'Google Docs',
        description: 'Attach and edit documents within tasks.',
        icon: <DescriptionIcon sx={{ fontSize: 40, color: '#4285F4' }} />,
        color: '#4285F4',
        connected: false,
    },
    {
        id: 'slack',
        name: 'Slack',
        description: 'Receive notifications and updates in your channels.',
        icon: <ChatIcon sx={{ fontSize: 40, color: '#E01E5A' }} />,
        color: '#E01E5A',
        connected: false,
    },
    {
        id: 'jira',
        name: 'Jira',
        description: 'Import and sync tickets with Jira projects.',
        icon: <BugReportIcon sx={{ fontSize: 40, color: '#0052CC' }} />,
        color: '#0052CC',
        connected: false,
    },
];

const Integrations = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [toolsState, setToolsState] = React.useState(tools);

    const handleToggle = (id: string) => {
        setToolsState(prev => prev.map(t =>
            t.id === id ? { ...t, connected: !t.connected } : t
        ));
    };

    const filteredTools = toolsState.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box sx={{ mb: 6, textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h3" component="h1" gutterBottom fontWeight="800" sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Integrations
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                    Supercharge your workflow by connecting your favorite tools.
                </Typography>
                <Box sx={{ mt: 3 }}>
                    <input
                        type="text"
                        placeholder="Search integrations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '12px 20px',
                            width: '100%',
                            maxWidth: '400px',
                            borderRadius: '50px',
                            border: '1px solid #e0e0e0',
                            fontSize: '16px',
                            outline: 'none',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            transition: 'all 0.3s'
                        }}
                        onFocus={(e) => e.target.style.boxShadow = '0 4px 12px rgba(33, 150, 243, 0.15)'}
                        onBlur={(e) => e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'}
                    />
                </Box>
            </Box>

            <Grid container spacing={{ xs: 2, md: 4 }} alignItems="stretch">
                {filteredTools.map((tool) => (
                    // @ts-ignore - Grid size prop might be missing in older types or strict checks, but required for newer MUI
                    <Grid key={tool.id} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex' }}>
                        <Card
                            sx={{
                                width: '100%', // Ensure it fills the grid cell
                                height: '100%', // Flex stretch will handle height
                                minHeight: 340,
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 4,
                                border: '1px solid transparent',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                transition: 'all 0.3s ease-in-out',
                                position: 'relative',
                                overflow: 'visible',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                                    borderColor: tool.color,
                                },
                            }}
                        >
                            {tool.connected && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        right: 16,
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                        bgcolor: 'success.main',
                                        boxShadow: '0 0 0 4px rgba(76, 175, 80, 0.2)'
                                    }}
                                />
                            )}
                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', pt: 4 }}>
                                <Avatar
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        bgcolor: `${tool.color}10`, // 10% opacity
                                        color: tool.color,
                                        mb: 3,
                                        transition: 'transform 0.3s',
                                        '.MuiCard-root:hover &': {
                                            transform: 'scale(1.1)',
                                        }
                                    }}
                                >
                                    {tool.icon}
                                </Avatar>
                                <Typography variant="h5" component="h2" gutterBottom fontWeight="700">
                                    {tool.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, px: 2, lineHeight: 1.6 }}>
                                    {tool.description}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ p: 3, pt: 0, justifyContent: 'center' }}>
                                <Button
                                    variant={tool.connected ? "outlined" : "contained"}
                                    onClick={() => handleToggle(tool.id)}
                                    color={tool.connected ? "inherit" : "primary"}
                                    disableElevation
                                    sx={{
                                        borderRadius: '50px',
                                        px: 4,
                                        py: 1,
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        bgcolor: tool.connected ? 'transparent' : 'primary.main',
                                        borderColor: tool.connected ? 'divider' : 'transparent',
                                        color: tool.connected ? 'text.secondary' : '#fff',
                                        '&:hover': {
                                            bgcolor: tool.connected ? 'action.hover' : 'primary.dark',
                                            borderColor: tool.connected ? 'text.primary' : 'transparent',
                                        }
                                    }}
                                >
                                    {tool.connected ? 'Disconnect' : 'Connect'}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Integrations;
