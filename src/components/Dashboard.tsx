import React from "react";

const taskSummary = [
    {
        title: "Tasks Due Today",
        count: 3,
        subtitle: "3 tasks",
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=80&q=80",
    },
    {
        title: "Total Incomplete Tasks",
        count: 1,
        subtitle: "1 task",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80",
        highlight: true,
    },
    {
        title: "Overdue Week",
        count: 6,
        subtitle: "6 tasks",
        image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=80&q=80",
    },
    {
        title: "Completed This Week",
        count: 5,
        subtitle: "1 tasks",
        image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=80&q=80",
    },
];

const teamActivity = [
    {
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        name: "Mark",
        action: "completed the 'Client Presentation' task",
        project: "Project Alpha",
    },
    {
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        name: "Emily",
        action: "updated the 'Marketing Strategy' document",
        project: "Project Beta",
    },
    {
        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
        name: "David",
        action: "commented on the 'Product Roadmap' task",
        project: "Project Gamma",
    },
];

import { Grid, Box, Typography, Card, Avatar } from '@mui/material';

const Dashboard: React.FC = () => {
    return (
        <Box sx={{ bgcolor: '#F5F7FA', minHeight: '100vh', p: { xs: 2, md: 4 } }}>
            <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
                <Typography variant="h4" fontWeight="700" sx={{ mb: 1, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                    Good morning, Sarah
                </Typography>

                {/* Task Summary */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>My Task Summary</Typography>
                    <Grid container spacing={3}>
                        {taskSummary.map((item, idx) => (
                            <Grid item xs={12} sm={6} md={3} key={item.title}>
                                <Card sx={{
                                    p: 3,
                                    borderRadius: 4,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                                    border: item.highlight ? "1.5px solid #FF5A5F" : "none",
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <Box>
                                        <Typography fontWeight="600" fontSize={17}>{item.title}</Typography>
                                        <Typography color={item.highlight ? "#FF5A5F" : "text.secondary"} fontSize={15} sx={{ mt: 0.5 }}>
                                            {item.subtitle}
                                        </Typography>
                                    </Box>
                                    <Avatar src={item.image} variant="rounded" sx={{ width: 64, height: 64, borderRadius: 3 }} />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Team Activity */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>Team Activity</Typography>
                    <Grid container spacing={2}>
                        {teamActivity.map((activity, idx) => (
                            <Grid item xs={12} key={idx}>
                                <Card sx={{
                                    p: { xs: 2, md: 3 },
                                    borderRadius: 3,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.01)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2
                                }}>
                                    <Avatar src={activity.avatar} sx={{ width: 48, height: 48 }} />
                                    <Box>
                                        <Typography fontWeight="500" fontSize={15}>
                                            {activity.name} <Typography component="span" color="text.secondary">{activity.action}</Typography>
                                        </Typography>
                                        <Typography color="text.secondary" fontSize={14} sx={{ mt: 0.5 }}>{activity.project}</Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;