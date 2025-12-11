import React, { useState } from "react";
import { HEADER_HEIGHT } from "./Navigation";
import { useMediaQuery, useTheme, Drawer, IconButton, Box, Typography, Button, Select, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const tasks = {
    todo: [
        {
            title: "Design landing page",
            tags: [
                { label: "Design", color: "#dbeafe", textColor: "#2563eb" },
                { label: "UX", color: "#fce7f3", textColor: "#db2777" },
            ],
        },
        {
            title: "Create wireframes",
            tags: [{ label: "Design", color: "#dbeafe", textColor: "#2563eb" }],
        },
        {
            title: "Conduct user research",
            tags: [{ label: "Research", color: "#fef9c3", textColor: "#ca8a04" }],
        },
    ],
    inProgress: [
        {
            title: "Develop user authentication",
            tags: [
                { label: "Development", color: "#d1fae5", textColor: "#059669" },
            ],
        },
        {
            title: "Implement database schema",
            tags: [
                { label: "Development", color: "#d1fae5", textColor: "#059669" },
            ],
        },
        {
            title: "Test API endpoints",
            tags: [{ label: "Testing", color: "#ede9fe", textColor: "#7c3aed" }],
        },
    ],
    done: [
        {
            title: "Launch marketing campaign",
            tags: [
                { label: "Marketing", color: "#fee2e2", textColor: "#dc2626" },
            ],
        },
        {
            title: "Analyze user feedback",
            tags: [{ label: "Research", color: "#fef9c3", textColor: "#ca8a04" }],
        },
        {
            title: "Celebrate project completion",
            tags: [{ label: "Misc", color: "#e0e7ff", textColor: "#6366f1" }],
        },
    ],
};

const projects = [
    { icon: "🚀", label: "Project Alpha", active: true },
    { icon: "🌱", label: "Project Beta" },
    { icon: "💡", label: "Project Gamma" },
    { icon: "📦", label: "Project Delta" },
];

const boardTabs = ["Board", "List", "Timeline", "Calendar"];

function Tag({ label, color, textColor }: { label: string; color: string; textColor: string }) {
    return (
        <span
            style={{
                background: color,
                color: textColor,
                fontSize: 12,
                borderRadius: 12,
                padding: "2px 10px",
                marginRight: 6,
                fontWeight: 500,
                display: "inline-block",
            }}
        >
            {label}
        </span>
    );
}

function TaskCard({ title, tags }: { title: string; tags: any[] }) {
    return (
        <div
            style={{
                background: "#fff",
                boxShadow: "0 1px 4px #0001",
                padding: 20,
                marginBottom: 18,
                minHeight: 70,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 8,
            }}
        >
            <div style={{ fontWeight: 500, marginBottom: 10 }}>{title}</div>
            <div>
                {tags.map((tag, idx) => (
                    <Tag key={idx} {...tag} />
                ))}
            </div>
        </div>
    );
}

function BoardColumn({ title, count, tasks }: { title: string; count: number; tasks: any[] }) {
    // Mobile: no minWidth blocking, allow stacking. Desktop: minWidth for columns.
    return (
        <div style={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontWeight: 600, fontSize: 18 }}>{title}</span>
                <span
                    style={{
                        marginLeft: 8,
                        background: '#f3f4f6',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#6b7280',
                    }}
                >
                    {count}
                </span>
            </div>
            <div style={{ overflowY: 'auto' }}>
                {tasks.map((task, idx) => (
                    <TaskCard key={idx} {...task} />
                ))}
            </div>
        </div>
    );
}

const sidebarWidth = 240;

const Project: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>(boardTabs[0]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const isBoard = activeTab === 'Board';

    const SidebarContent = (
        <div
            style={{
                width: isMobile ? '100%' : sidebarWidth,
                height: '100%',
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                padding: "0 0 24px 0",
            }}
        >
            <div style={{ fontWeight: 700, fontSize: 22, padding: "28px 32px 24px" }}>Projects</div>
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: 0 }}>
                {projects.map((link) => (
                    <div
                        key={link.label}
                        onClick={() => isMobile && setMobileOpen(false)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "12px 32px",
                            background: link.active ? "#2563eb" : "transparent",
                            color: link.active ? "#fff" : "#374151",
                            borderRadius: 8,
                            margin: "0 12px 4px 12px",
                            fontWeight: link.active ? 600 : 500,
                            cursor: "pointer",
                            transition: "background 0.2s",
                        }}
                    >
                        <span style={{ marginRight: 14, fontSize: 18 }}>{link.icon}</span>
                        {link.label}
                    </div>
                ))}
            </div>
            <div style={{ padding: "0 32px", marginTop: "auto", background: '#fff' }}>
                <button
                    style={{
                        width: "100%",
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "12px 0",
                        fontWeight: 600,
                        fontSize: 16,
                        marginBottom: 16,
                        cursor: "pointer",
                    }}
                >
                    New Project
                </button>
                <div style={{ color: "#2563eb", fontWeight: 500, fontSize: 15, cursor: "pointer" }}>
                    + Invite members
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ display: "flex", height: `calc(100vh - ${HEADER_HEIGHT}px)`, background: "#f8fafc", overflow: 'hidden', flexDirection: 'column' }}>

            {/* Mobile Sidebar Toggle - only show if mobile */}
            {isMobile && (
                <Box sx={{ p: 2, bgcolor: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography fontWeight={700} fontSize={18}>Project Alpha</Typography>
                    <IconButton onClick={() => setMobileOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                </Box>
            )}

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Desktop Sidebar */}
                {!isMobile && (
                    <aside style={{ height: '100%', borderRight: "1px solid #e5e7eb", background: '#fff' }}>
                        {SidebarContent}
                    </aside>
                )}

                {/* Mobile Sidebar Drawer */}
                <Drawer
                    anchor="left"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    sx={{ '& .MuiDrawer-paper': { width: 280 } }}
                >
                    {SidebarContent}
                </Drawer>

                {/* Main Content */}
                <main style={{ flex: 1, height: '100%', overflowY: isBoard && !isMobile ? 'hidden' : 'auto', padding: 0 }}>
                    <div style={{
                        maxWidth: 1200,
                        margin: "0 auto",
                        padding: isMobile ? "24px 16px" : "40px 40px 0 40px",
                        display: 'flex',
                        flexDirection: 'column',
                        height: isMobile ? 'auto' : '100%'
                    }}>
                        {/* Project Title (Desktop only, mobile shows in header) */}
                        {!isMobile && (
                            <div>
                                <div style={{ fontSize: 36, fontWeight: 700, color: "#1e293b" }}>Project Alpha</div>
                                <div style={{ color: "#64748b", fontSize: 16, marginTop: 4, marginBottom: 28 }}>
                                    Enhancing core product offerings and expanding market reach.
                                </div>
                            </div>
                        )}

                        {/* Tabs */}
                        <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: 32, overflowX: 'auto' }}>
                            {boardTabs.map((tab) => (
                                <div
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    style={{
                                        padding: '0 24px 12px 0',
                                        fontWeight: activeTab === tab ? 600 : 500,
                                        color: activeTab === tab ? '#2563eb' : '#64748b',
                                        borderBottom: activeTab === tab ? '2.5px solid #2563eb' : 'none',
                                        cursor: 'pointer',
                                        fontSize: 16,
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {tab}
                                </div>
                            ))}
                        </div>

                        {/* Board / List container */}
                        <div style={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: 24,
                            flex: 1,
                            overflowX: isBoard && !isMobile ? 'auto' : 'hidden',
                            alignItems: 'flex-start',
                            paddingBottom: 24 // Add some bottom padding for scroll
                        }}>
                            <BoardColumn title="To Do" count={tasks.todo.length} tasks={tasks.todo} />
                            <BoardColumn title="In Progress" count={tasks.inProgress.length} tasks={tasks.inProgress} />
                            <BoardColumn title="Done" count={tasks.done.length} tasks={tasks.done} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Project;