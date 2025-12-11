import React, { useRef, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import BuildIcon from "@mui/icons-material/Build";
import {
    Box,
    Button,
    TextField,
    Typography,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    IconButton,
    Paper,
} from "@mui/material";

const Profile: React.FC = () => {
    // Profile menu state
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Profile form state
    const [name, setName] = useState("Jane Doe");
    const [email, setEmail] = useState("jane.doe@example.com");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [profilePic, setProfilePic] = useState<string | undefined>(undefined);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handlers
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => setProfilePic(ev.target?.result as string);
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleUpdatePassword = () => {
        // Implement password update logic
        setCurrentPassword("");
        setNewPassword("");
    };

    const handleSaveChanges = () => {
        // Implement save logic
    };

    return (
        <Box sx={{ bgcolor: "#f8f9fb", minHeight: "100vh", p: 2 }}>

            {/* Profile Settings */}
            <Box
                sx={{
                    maxWidth: { xs: '100%', md: '70%' },
                    mx: "auto",
                    mt: { xs: 2, md: 4 },
                    bgcolor: "#fff",
                    p: { xs: 3, md: 5 },
                    borderRadius: 3,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                }}
                component={Paper}
                elevation={0}
            >
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                    Profile Settings
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 4 }}>
                    Manage your account settings and set your preferences.
                </Typography>

                {/* Personal Information */}
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Personal Information
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 2 }}>
                    Update your name and email address.
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        fullWidth
                    />
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* Password */}
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Password
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 2 }}>
                    Change your password.
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
                    <TextField
                        label="Current Password"
                        type="password"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        fullWidth
                    />
                </Box>
                <Button
                    variant="contained"
                    sx={{ bgcolor: "#e3eafc", color: "#1976d2", mb: 4, width: 180 }}
                    onClick={handleUpdatePassword}
                >
                    Update Password
                </Button>

                <Divider sx={{ my: 4 }} />

                {/* Profile Picture */}
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Profile Picture
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 2 }}>
                    Update your profile picture.
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
                    <Avatar
                        src={profilePic}
                        sx={{ width: 64, height: 64, border: "2px solid #eee" }}
                    />
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        onChange={handleProfilePicChange}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => fileInputRef.current?.click()}
                        sx={{ bgcolor: "#e3eafc", color: "#1976d2" }}
                    >
                        Upload New Picture
                    </Button>
                    <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                        JPG, GIF or PNG. 1MB max.
                    </Typography>
                </Box>

                {/* Actions */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                    <Button variant="outlined" color="inherit">
                        Cancel
                    </Button>
                    <Button variant="contained" sx={{ bgcolor: "#1976d2" }} onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;