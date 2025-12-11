import React, { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
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
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import type { ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

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
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const [mobileOpen, setMobileOpen] = useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

    const isRouteActive = (path: string) => {
        if (!path) return false;
        if (path === '/') return location.pathname === '/';
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    const navSx = (path: string, extra: any = {}) => ({
        ...extra,
        ...(isRouteActive(path) ? { background: theme.palette.primary.main, color: '#fff', fontWeight: 700 } : {}),
    });

    const handleLogout = () => {
        setMenuAnchorEl(null);
        setMobileOpen(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'My Tasks', path: '/my-tasks' },
        { label: 'Projects', path: '/projects' },
        { label: 'Reports', path: '/reports' },
        { label: 'WorkLogs', path: '/worklogs' },
        { label: 'AI Assistant', path: '/ai-assistant' },
    ];

    const drawerContent = (
        <Box sx={{ width: 250, pt: 2 }} role="presentation">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 2 }}>
                <Typography variant="h6" fontWeight="bold" color="primary">TaskMaster</Typography>
                <IconButton onClick={handleDrawerToggle}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <List>
                {isAuthenticated ? (
                    navLinks.map((link) => (
                        <ListItem key={link.label} disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to={link.path}
                                onClick={handleDrawerToggle}
                                selected={isRouteActive(link.path)}
                                sx={{
                                    '&.Mui-selected': {
                                        bgcolor: 'primary.light',
                                        color: 'primary.contrastText',
                                        '&:hover': { bgcolor: 'primary.main' },
                                    },
                                    borderRadius: 1,
                                    mx: 1,
                                }}
                            >
                                <ListItemText primary={link.label} />
                            </ListItemButton>
                        </ListItem>
                    ))
                ) : (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton component={RouterLink} to="/login" onClick={handleDrawerToggle}>
                                <ListItemText primary="Login" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={RouterLink} to="/signup" onClick={handleDrawerToggle}>
                                <ListItemText primary="Sign Up" />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    );

    return (
        <FlatAppBar position="static" elevation={0}>
            <Toolbar sx={{ justifyContent: 'space-between', minHeight: 72 }}>
                {/* Left: Logo & Nav or Hamburger */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, color: 'text.primary' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
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
                    {!isMobile && (
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: 1,
                                color: theme.palette.primary.main,
                                userSelect: 'none',
                                mr: 2,
                            }}
                        >
                            TaskMaster
                        </Typography>
                    )}

                    {!isMobile && (
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
                                navLinks.map(link => (
                                    <NavButton key={link.label} component={RouterLink} to={link.path} sx={navSx(link.path)}>
                                        {link.label}
                                    </NavButton>
                                ))
                            )}
                        </Box>
                    )}
                </Box>

                {/* Right: Search & Profile */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1 : 2 }}>
                    {isAuthenticated && !isMobile && (
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
                                <MenuItem onClick={handleLogout}>
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

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
                }}
            >
                {drawerContent}
            </Drawer>
        </FlatAppBar>
    );
};

export default Navigation;
