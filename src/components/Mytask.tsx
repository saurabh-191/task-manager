import React, { useState } from "react";

// Extended sample task data
const sampleTasks = [
    { id: 205, title: "Implement feedback collector", status: "To Do", type: "feature", assignee: "A", comments: 9 },
    { id: 206, title: "Bump version for new API for billing", status: "To Do", type: "bug", assignee: "B", comments: 3 },
    { id: 208, title: "Add NPS feedback to wallboard", status: "To Do", type: "feature", assignee: "C", comments: 1 },
    { id: 213, title: "Update T&C copy with v1.9 from the writers guild in all products that have cross country compliance", status: "In Progress", type: "bug", assignee: "D", comments: 2 },
    { id: 216, title: "Refactor stripe verification key validator to a single call to avoid timing out on slow connections", status: "In Progress", type: "feature", assignee: "E", comments: 3 },
    { id: 218, title: "Investigate performance dips from last week", status: "In Progress", type: "feature", assignee: "F", comments: 3 },
    { id: 338, title: "Multi-dest search UI web", status: "In Review", type: "feature", assignee: "G", comments: 5 },
    { id: 336, title: "Quick booking for accomodations - web", status: "Done", type: "feature", assignee: "H", comments: 4 },
    { id: 354, title: "Shoping cart purchasing error - quick fix required.", status: "Done", type: "bug", assignee: "I", comments: 2 },
    // More tasks for realism
    { id: 401, title: "Design new onboarding flow", status: "To Do", type: "feature", assignee: "J", comments: 7 },
    { id: 402, title: "Fix login redirect bug", status: "To Do", type: "bug", assignee: "K", comments: 2 },
    { id: 403, title: "Update user profile page", status: "In Progress", type: "feature", assignee: "L", comments: 1 },
    { id: 404, title: "Optimize image loading", status: "In Progress", type: "feature", assignee: "M", comments: 4 },
    { id: 405, title: "Review payment gateway integration", status: "In Review", type: "feature", assignee: "N", comments: 6 },
    { id: 406, title: "Fix typo in dashboard", status: "Done", type: "bug", assignee: "O", comments: 0 },
    { id: 407, title: "Implement dark mode", status: "To Do", type: "feature", assignee: "P", comments: 5 },
    { id: 408, title: "Refactor notification system", status: "In Progress", type: "feature", assignee: "Q", comments: 2 },
    { id: 409, title: "Accessibility improvements", status: "In Review", type: "feature", assignee: "R", comments: 3 },
    { id: 410, title: "Add export to CSV", status: "Done", type: "feature", assignee: "S", comments: 1 },
];

const sections = [
    { key: "To Do", label: "TO DO", color: "#4F8CFF" },
    { key: "In Progress", label: "IN PROGRESS", color: "#FFB84F" },
    { key: "In Review", label: "IN REVIEW", color: "#6DD28A" },
    { key: "Done", label: "DONE", color: "#A7A7A7" },
];

type Task = typeof sampleTasks[0];

const getTypeIcon = (type: string) => {
    return type === "bug" ? "🐞" : "📝";
};

const getAvatar = (assignee: string) => {
    return (
        <div style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#e3e8ef",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 14,
            color: "#4F8CFF",
            boxShadow: "0 1px 4px #0001"
        }}>
            {assignee}
        </div>
    );
};

const Mytask: React.FC = () => {
    const [view, setView] = useState<"kanban" | "list">("kanban");

    // Group tasks by status
    const groupedTasks: { [key: string]: Task[] } = {};
    sections.forEach((section) => {
        groupedTasks[section.key] = sampleTasks.filter(
            (task) => task.status === section.key
        );
    });

    return (
        <div style={{
            padding: 10,
            background: "#f7f9fb",
            minHeight: "100vh",
            boxSizing: "border-box"
        }}>
            <div style={{
                maxWidth: '100%',
                margin: "0 auto",
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                padding: 32,
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 24
                }}>

                    {/* Right: Page Title */}
                    <h2 style={{
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        margin: 0,
                        color: '#111'
                    }}>
                        My Tasks
                    </h2>
                    {/* Left: View Toggle Buttons */}
                    <div>
                        <button
                            onClick={() => setView("list")}
                            disabled={view === "list"}
                            style={{
                                marginRight: 8,
                                padding: "8px 20px",
                                borderRadius: 6,
                                border: "none",
                                background: view === "list" ? "#4F8CFF" : "#e3e8ef",
                                color: view === "list" ? "#fff" : "#222",
                                fontWeight: 500,
                                cursor: view === "list" ? "default" : "pointer",
                                boxShadow: view === "list" ? "0 2px 8px #4F8CFF22" : "none",
                                transition: "all 0.2s",
                            }}
                            aria-pressed={view === "list"}
                        >
                            List View
                        </button>
                        <button
                            onClick={() => setView("kanban")}
                            disabled={view === "kanban"}
                            style={{
                                padding: "8px 20px",
                                borderRadius: 6,
                                border: "none",
                                background: view === "kanban" ? "#4F8CFF" : "#e3e8ef",
                                color: view === "kanban" ? "#fff" : "#222",
                                fontWeight: 500,
                                cursor: view === "kanban" ? "default" : "pointer",
                                boxShadow: view === "kanban" ? "0 2px 8px #4F8CFF22" : "none",
                                transition: "all 0.2s",
                            }}
                            aria-pressed={view === "kanban"}
                        >
                            Kanban View
                        </button>
                    </div>
                </div>

                {view === "list" ? (
                    <div style={{ overflowX: "auto" }}>
                        <table style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            background: "#fff"
                        }}>
                            <thead>
                                <tr>
                                    <th style={{
                                        textAlign: "left",
                                        padding: "12px 8px",
                                        borderBottom: "2px solid #e3e8ef",
                                        fontWeight: 600,
                                        color: "#4F8CFF"
                                    }}>Title</th>
                                    <th style={{
                                        textAlign: "left",
                                        padding: "12px 8px",
                                        borderBottom: "2px solid #e3e8ef",
                                        fontWeight: 600,
                                        color: "#4F8CFF"
                                    }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sampleTasks.length === 0 ? (
                                    <tr>
                                        <td colSpan={2} style={{ color: "#aaa", fontStyle: "italic", padding: 16 }}>No tasks</td>
                                    </tr>
                                ) : (
                                    sampleTasks.map((task) => (
                                        <tr key={task.id}>
                                            <td style={{
                                                padding: "10px 8px",
                                                borderBottom: "1px solid #f0f0f0"
                                            }}>{task.title}</td>
                                            <td style={{
                                                padding: "10px 8px",
                                                borderBottom: "1px solid #f0f0f0",
                                                color: sections.find(s => s.key === task.status)?.color,
                                                fontWeight: 500
                                            }}>{task.status}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{
                        display: "flex",
                        gap: 24,
                        overflowX: "auto",
                        paddingBottom: 16,
                        minHeight: 400,
                        background: "#f7f9fb",
                        borderRadius: 12,
                    }}>
                        {sections.map((section) => (
                            <div
                                key={section.key}
                                style={{
                                    minWidth: 320,
                                    background: "#f4f5f7",
                                    borderRadius: 8,
                                    padding: 16,
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                                    flex: "0 0 320px",
                                    display: "flex",
                                    flexDirection: "column",
                                    maxHeight: 520,
                                }}
                            >
                                <div style={{
                                    fontWeight: 700,
                                    fontSize: 15,
                                    marginBottom: 12,
                                    color: section.color,
                                    letterSpacing: 0.5,
                                    borderBottom: `2px solid ${section.color}33`,
                                    paddingBottom: 6,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <span>{section.label}</span>
                                    <span style={{
                                        background: "#fff",
                                        borderRadius: 12,
                                        padding: "2px 10px",
                                        fontSize: 13,
                                        color: "#888",
                                        fontWeight: 600,
                                        marginLeft: 8,
                                        border: `1px solid ${section.color}33`
                                    }}>
                                        {groupedTasks[section.key].length}
                                    </span>
                                </div>
                                <div style={{
                                    flex: 1,
                                    overflowY: "auto",
                                    minHeight: 100,
                                    maxHeight: 420,
                                    paddingRight: 4,
                                }}>
                                    {groupedTasks[section.key].length === 0 ? (
                                        <div style={{ color: "#aaa", fontStyle: "italic", marginTop: 8 }}>No tasks</div>
                                    ) : (
                                        groupedTasks[section.key].map((task) => (
                                            <div
                                                key={task.id}
                                                style={{
                                                    background: "#fff",
                                                    margin: "12px 0",
                                                    padding: "14px 16px",
                                                    borderRadius: 8,
                                                    fontWeight: 500,
                                                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                                    cursor: "pointer",
                                                    borderLeft: `4px solid ${section.color}`,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: 8,
                                                    transition: "box-shadow 0.2s",
                                                }}
                                                onMouseOver={e => (e.currentTarget.style.boxShadow = "0 4px 16px #4F8CFF22")}
                                                onMouseOut={e => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)")}
                                            >
                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                    <span style={{
                                                        fontSize: 13,
                                                        fontWeight: 700,
                                                        color: "#A7A7A7",
                                                        background: "#f7f9fb",
                                                        borderRadius: 6,
                                                        padding: "2px 8px",
                                                        marginRight: 6,
                                                        letterSpacing: 1
                                                    }}>
                                                        NUC-{task.id}
                                                    </span>
                                                    <span style={{ fontSize: 16 }}>{getTypeIcon(task.type)}</span>
                                                    <span style={{
                                                        marginLeft: "auto",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 6
                                                    }}>
                                                        <span style={{
                                                            fontSize: 13,
                                                            color: "#888",
                                                            display: "flex",
                                                            alignItems: "center"
                                                        }}>
                                                            💬 {task.comments}
                                                        </span>
                                                        {getAvatar(task.assignee)}
                                                    </span>
                                                </div>
                                                <div style={{
                                                    fontSize: 15,
                                                    color: "#222",
                                                    fontWeight: 600,
                                                    marginTop: 2,
                                                    marginBottom: 2,
                                                    lineHeight: 1.4
                                                }}>
                                                    {task.title}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mytask;