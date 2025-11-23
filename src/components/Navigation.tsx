import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    InputBase,
    Avatar,
    Typography,
    useTheme,
    Divider,
    Paper,
    MenuItem,
    Menu,
} from '@mui/material';
import type { ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const isAuthenticated = true;

export const HEADER_HEIGHT = 72; // px - keep in sync with Toolbar minHeight

const FlatAppBar = styled(AppBar)(({ theme }) => ({
    background: '#fff',
    boxShadow: '0 2px 8px rgba(60,60,60,0.06)',
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: 'sticky',
    top: 0,
    zIndex: 1200, // ensure it sits above content
}));

const NavButton = styled(Button)<ButtonProps & { to?: string }>(({ theme }) => ({
    margin: '0 4px',
    fontWeight: 500,
    color: theme.palette.text.primary,
    textTransform: 'none',
    borderRadius: 8,
    padding: '6px 18px',
    '&:hover': {
        background: theme.palette.action.hover,
        color: theme.palette.primary.main,
    },
}));

const SearchBox = styled(Paper)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '2px 10px',
    borderRadius: 8,
    background: theme.palette.grey[100],
    boxShadow: 'none',
    border: `1px solid ${theme.palette.divider}`,
}));

const Navigation: React.FC = () => {
    const theme = useTheme();
    const location = useLocation();

    const isRouteActive = (path: string) => {
        if (!path) return false;
        if (path === '/') return location.pathname === '/';
        return location.pathname === path || location.pathname.startsWith(path + '/') || location.pathname.startsWith(path);
    };

    const navSx = (path: string, extra: any = {}) => ({
        ...extra,
        ...(isRouteActive(path) ? { background: theme.palette.primary.main, color: '#fff', fontWeight: 700 } : {}),
    });

    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

    return (
        <FlatAppBar position="static" elevation={0}>
            <Toolbar sx={{ justifyContent: 'space-between', minHeight: 72 }}>
                {/* Left: Logo & App Name */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mr: 1,
                        }}
                    >
                        <img
                            src="/logo.png"
                            alt="Logo"
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(99,102,241,0.10)',
                            }}
                        />
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: 1,
                            color: theme.palette.primary.main,
                            userSelect: 'none',
                        }}
                    >
                        TaskMaster
                    </Typography>
                    <Divider orientation="vertical" flexItem sx={{ mx: 2, height: 32 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {!isAuthenticated ? (
                            <>
                                <NavButton component={RouterLink} to="/login" variant="text" sx={navSx('/login')}>
                                    Login
                                </NavButton>
                                <NavButton
                                    component={RouterLink}
                                    to="/signup"
                                    variant="contained"
                                    sx={navSx('/signup', {
                                        ml: 1,
                                        background: theme.palette.primary.main,
                                        color: '#fff',
                                        '&:hover': {
                                            background: theme.palette.primary.dark,
                                        },
                                    })}
                                >
                                    Sign Up
                                </NavButton>
                            </>
                        ) : (
                            <>
                                <NavButton component={RouterLink} to="/" sx={navSx('/')}>
                                    Home
                                </NavButton>
                                <NavButton component={RouterLink} to="/my-tasks" sx={navSx('/my-tasks')}>
                                    My Tasks
                                </NavButton>
                                <NavButton component={RouterLink} to="/projects" sx={navSx('/projects')}>
                                    Projects
                                </NavButton>
                                <NavButton component={RouterLink} to="/reports" sx={navSx('/reports')}>
                                    Reports
                                </NavButton>
                                <NavButton component={RouterLink} to="/worklogs" sx={navSx('/worklogs')}>
                                    WorkLogs
                                </NavButton>
                                <NavButton component={RouterLink} to="/ai-assistant" sx={navSx('/ai-assistant')}>
                                    AI Assistant
                                </NavButton>
                            </>
                        )}
                    </Box>
                </Box>

                {/* Right: Search & Profile */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {isAuthenticated && (
                        <SearchBox>
                            <InputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                sx={{
                                    ml: 1,
                                    flex: 1,
                                    fontWeight: 400,
                                    fontSize: 15,
                                    color: theme.palette.text.primary,
                                }}
                            />
                        </SearchBox>
                    )}
                    <span style={{ fontSize: 22, color: "#b0b0b0", marginRight: 8 }}>🔔</span>
                    {isAuthenticated && (
                        <Box sx={{ position: 'relative' }}>
                            <Button
                                onClick={(e) => setMenuAnchorEl(e.currentTarget)}
                                sx={{
                                    minWidth: 0,
                                    p: 0,
                                    borderRadius: '50%',
                                    ml: 1,
                                }}
                            >
                                <Avatar
                                    alt="Profile"
                                    src="/profile.png"
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        border: `2px solid ${theme.palette.primary.light}`,
                                    }}
                                />
                            </Button>
                            <Menu
                                anchorEl={menuAnchorEl}
                                open={Boolean(menuAnchorEl)}
                                onClose={() => setMenuAnchorEl(null)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem component={RouterLink} to="/profile/edit" onClick={() => setMenuAnchorEl(null)}>
                                    Edit Profile
                                </MenuItem>
                                <MenuItem component={RouterLink} to="/settings" onClick={() => setMenuAnchorEl(null)}>
                                    Settings
                                </MenuItem>
                                <MenuItem component={RouterLink} to="/maintenance" onClick={() => setMenuAnchorEl(null)}>
                                    Maintenance
                                </MenuItem>
                                <MenuItem component={RouterLink} to="/integrations" onClick={() => setMenuAnchorEl(null)}>
                                    Integrations
                                </MenuItem>
                                <MenuItem onClick={() => { setMenuAnchorEl(null); /* handle logout here */ }}>
                                    Logout
                                </MenuItem>
                                <Divider />
                                <MenuItem component={RouterLink} to="/help" onClick={() => setMenuAnchorEl(null)}>
                                    Help & Support
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Box>
            </Toolbar>
        </FlatAppBar>
    );
};

export default Navigation;
