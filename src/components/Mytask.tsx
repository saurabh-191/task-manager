import React, { useState } from "react";
// CKEditor

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HEADER_HEIGHT } from "./Navigation";

// Extended sample task data
const sampleTasks = [
    { id: 205, title: "Implement feedback collector", status: "To Do", type: "feature", assignee: "A", comments: 9, description: "" },
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
    { id: 410, title: "Add export to CSV", status: "Done", type: "feature", assignee: "S", comments: 1, description: "" },
];

const initialSections = [
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

    // Make sections and tasks stateful so we can add columns and open modals
    const [sectionsState, setSectionsState] = useState(initialSections);
    const [tasks, setTasks] = useState(sampleTasks);
    const [addingColumn, setAddingColumn] = useState(false);
    const [newColumnName, setNewColumnName] = useState("");
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    // Local comments map for tasks (taskId -> array of comments)
    const [localComments, setLocalComments] = useState<Record<number, Array<{ author: string; text: string; when: string }>>>({});
    const [commentText, setCommentText] = useState("");
    // Activity tabs: 'all' | 'comments' | 'history' | 'worklog'
    const [activityTab, setActivityTab] = useState<'all' | 'comments' | 'history' | 'worklog'>('comments');
    // Worklog state per task
    const [worklogs, setWorklogs] = useState<Record<number, Array<{ hours: number; description: string; date: string; author: string }>>>({});
    const [worklogModalOpen, setWorklogModalOpen] = useState(false);
    const [worklogForm, setWorklogForm] = useState<{ hours: string; description: string; date: string }>({ hours: '', description: '', date: '' });
    const [editingDescription, setEditingDescription] = useState(false);

    // Group tasks by status using the stateful sections and tasks
    const groupedTasks: { [key: string]: Task[] } = {};
    sectionsState.forEach((section) => {
        groupedTasks[section.key] = tasks.filter(
            (task) => task.status === section.key
        );
    });

    const colors = ["#4F8CFF", "#FFB84F", "#6DD28A", "#A7A7A7", "#D08CFF", "#FF8CA6"];

    const addColumn = (label: string) => {
        const key = label.trim();
        if (!key) return;
        const color = colors[Math.floor(Math.random() * colors.length)];
        setSectionsState((s) => [...s, { key, label: label.toUpperCase(), color }]);
        setAddingColumn(false);
        setNewColumnName("");
    };

    const openTask = (task: Task) => setSelectedTask(task);
    const closeTask = () => setSelectedTask(null);
    const saveWorklog = () => {
        if (!selectedTask) return;
        const hours = parseFloat(worklogForm.hours || '0');
        if (!hours || !worklogForm.date) return;
        const entry = { hours, description: worklogForm.description || '', date: worklogForm.date, author: 'You' };
        setWorklogs(prev => {
            const existing = prev[selectedTask.id] || [];
            return { ...prev, [selectedTask.id]: [entry, ...existing] };
        });
        // reset and close
        setWorklogForm({ hours: '', description: '', date: '' });
        setWorklogModalOpen(false);
    };

    return (
        <div style={{
            padding: 10,
            background: "#f7f9fb",
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            boxSizing: "border-box",
            display: 'flex',
        }}>
            <div style={{
                maxWidth: '100%',
                margin: "0 auto",
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                padding: window.innerWidth < 600 ? 16 : 32, // Responsive padding
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: window.innerWidth < 600 ? 'column' : 'row', // Stack header on mobile
                    justifyContent: 'space-between',
                    alignItems: window.innerWidth < 600 ? 'flex-start' : 'center',
                    gap: window.innerWidth < 600 ? 16 : 0,
                    marginBottom: 24
                }}>

                    {/* Left: Page Title - Reordered for logic if needed, but keeping Right: Title as original */}
                    <h2 style={{
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        margin: 0,
                        color: '#111',
                        fontSize: window.innerWidth < 600 ? '1.5rem' : '1.5em'
                    }}>
                        My Tasks
                    </h2>
                    {/* View Toggle Buttons */}
                    <div style={{ width: window.innerWidth < 600 ? '100%' : 'auto', display: 'flex' }}>
                        <button
                            onClick={() => setView("list")}
                            disabled={view === "list"}
                            style={{
                                flex: window.innerWidth < 600 ? 1 : 'initial',
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
                            List
                        </button>
                        <button
                            onClick={() => setView("kanban")}
                            disabled={view === "kanban"}
                            style={{
                                flex: window.innerWidth < 600 ? 1 : 'initial',
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
                            Kanban
                        </button>
                    </div>
                </div>

                {/* Content area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                    {view === "list" ? (
                        <div style={{ overflowX: "auto", overflowY: 'auto', flex: 1 }}>
                            <table style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                background: "#fff",
                                minWidth: 400 // Ensure valid width for scroll
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
                                            color: "#4F8CFF",
                                            width: 120
                                        }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.length === 0 ? (
                                        <tr>
                                            <td colSpan={2} style={{ color: "#aaa", fontStyle: "italic", padding: 16 }}>No tasks</td>
                                        </tr>
                                    ) : (
                                        tasks.map((task) => (
                                            <tr key={task.id}>
                                                <td style={{
                                                    padding: "10px 8px",
                                                    borderBottom: "1px solid #f0f0f0"
                                                }}>{task.title}</td>
                                                <td style={{
                                                    padding: "10px 8px",
                                                    borderBottom: "1px solid #f0f0f0",
                                                    color: sectionsState.find(s => s.key === task.status)?.color,
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
                            // Mobile: vertical stack (with internal scroll if needed, though typically full height). Desktop: Horizontal row.
                            flexDirection: window.innerWidth < 900 ? "column" : "row",
                            gap: 24,
                            overflowX: window.innerWidth < 900 ? "hidden" : "auto",
                            overflowY: window.innerWidth < 900 ? "auto" : "hidden",
                            paddingBottom: 16,
                            flex: 1,
                            minHeight: 0,
                            background: "#f7f9fb",
                            borderRadius: 12,
                        }}>
                            {sectionsState.map((section) => (
                                <div
                                    key={section.key}
                                    style={{
                                        minWidth: 300,
                                        background: "#f4f5f7",
                                        borderRadius: 8,
                                        padding: 16,
                                        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                                        flex: window.innerWidth < 900 ? "none" : "0 0 320px", // Full stacking on mobile
                                        display: "flex",
                                        flexDirection: "column",
                                        height: window.innerWidth < 900 ? 'auto' : '100%',
                                        // Make sure mobile columns don't stretch indefinitely if empty, but enough to see
                                        minHeight: 100,
                                    }}>
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
                                        overflowY: window.innerWidth < 900 ? "visible" : "auto", // No inner scroll on mobile stack
                                        minHeight: 0,
                                        paddingRight: window.innerWidth < 900 ? 0 : 4,
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
                                                    onClick={() => openTask(task)}
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
                    {worklogModalOpen && selectedTask && (
                        <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }} onClick={() => setWorklogModalOpen(false)}>
                            <div onClick={e => e.stopPropagation()} style={{ width: 520, maxWidth: '96%', background: '#fff', borderRadius: 8, padding: 18, boxShadow: '0 12px 40px rgba(2,6,23,0.2)' }}>
                                <h3 style={{ margin: 0, marginBottom: 12 }}>Add work log</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    <label style={{ fontSize: 13, color: '#64748b' }}>Hours (decimal)</label>
                                    <input type='number' min='0' step='0.25' value={worklogForm.hours} onChange={e => setWorklogForm(s => ({ ...s, hours: e.target.value }))} style={{ padding: 8, borderRadius: 6, border: '1px solid #eef3f9' }} />
                                    <label style={{ fontSize: 13, color: '#64748b' }}>Date & time</label>
                                    <input type='datetime-local' value={worklogForm.date} onChange={e => setWorklogForm(s => ({ ...s, date: e.target.value }))} style={{ padding: 8, borderRadius: 6, border: '1px solid #eef3f9' }} />
                                    <label style={{ fontSize: 13, color: '#64748b' }}>Description</label>
                                    <textarea rows={4} value={worklogForm.description} onChange={e => setWorklogForm(s => ({ ...s, description: e.target.value }))} style={{ padding: 8, borderRadius: 6, border: '1px solid #eef3f9' }} />
                                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
                                        <button onClick={() => setWorklogModalOpen(false)} style={{ padding: '8px 12px', borderRadius: 6, background: '#fff', border: '1px solid #eef3f9' }}>Close</button>
                                        <button onClick={saveWorklog} style={{ padding: '8px 12px', borderRadius: 6, background: '#0b5fff', color: '#fff', border: 'none' }}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* Task detail modal (Jira-like polish) */}
                {selectedTask && (
                    <div
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(2,6,23,0.45)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2000,
                            padding: 24
                        }}
                        onClick={closeTask}
                    >
                        <div
                            onClick={e => e.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                            style={{
                                width: '100%',
                                maxWidth: 1280,
                                height: '90vh',
                                background: '#fff',
                                borderRadius: 10,
                                padding: 20,
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 20px 60px rgba(2,6,23,0.35)',
                                fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                                <div style={{ fontSize: 13, color: '#6b7280' }}>Project Alpha</div>
                                <div style={{ height: 18, width: 1, background: '#eef3f9' }} />
                                <div style={{ fontSize: 13, color: '#0b5fff', fontWeight: 700 }}>SCRUM-2</div>
                                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
                                    <button aria-label="watch" title="Watch" style={{ border: 'none', background: '#f6f8fb', padding: 8, borderRadius: 8, cursor: 'pointer' }}>👁️</button>
                                    <button aria-label="share" title="Share" style={{ border: 'none', background: '#f6f8fb', padding: 8, borderRadius: 8, cursor: 'pointer' }}>🔗</button>
                                    <button aria-label="more" title="More" style={{ border: 'none', background: '#f6f8fb', padding: 8, borderRadius: 8, cursor: 'pointer' }}>⋯</button>
                                    <button onClick={closeTask} aria-label="close" title="Close" style={{ border: 'none', background: '#fff', padding: 6, borderRadius: 6, cursor: 'pointer' }}>✕</button>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 20, flex: 1, minHeight: 0, overflow: 'hidden' }}>
                                {/* Left main column */}
                                <div style={{ flex: 1.6, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
                                    <div style={{ padding: '6px 0 12px 0', borderBottom: '1px solid #eef3f9' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{ fontSize: 12, color: '#0b5fff', background: '#eef6ff', padding: '6px 10px', borderRadius: 8, fontWeight: 700 }}>{selectedTask.status}</div>
                                            <h1 style={{ margin: 0, fontSize: 24, lineHeight: 1.15, color: '#0f1724' }}>{selectedTask.title}</h1>
                                            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                                                <div style={{ fontSize: 13, color: '#6b7280' }}>#{selectedTask.id}</div>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: 10, color: '#475569' }}>Edit description</div>
                                    </div>

                                    <div style={{ flex: 1, display: 'flex', gap: 20, minHeight: 0, overflow: 'hidden', paddingTop: 14 }}>
                                        <div style={{ flex: 1, overflowY: 'auto', paddingRight: 6, minHeight: 0 }}>
                                            <section>
                                                <h4 style={{ margin: '0 0 8px 0', fontSize: 16 }}>Description</h4>
                                                <div style={{ background: '#fbfdff', padding: 14, borderRadius: 8, color: '#334155' }}>A short description goes here. Use this area for acceptance criteria, context, and implementation notes.</div>
                                            </section>

                                            <section style={{ marginTop: 18 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <h4 style={{ margin: 0, fontSize: 16 }}>Subtasks</h4>
                                                    <div style={{ fontSize: 13, color: '#94a3b8' }}>0% Done</div>
                                                </div>
                                                <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                    {[1, 2, 3].map(i => (
                                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', padding: 12, borderRadius: 8, border: '1px solid #eef3f9' }}>
                                                            <input type="checkbox" />
                                                            <div style={{ flex: 1 }}><div style={{ fontWeight: 600 }}>{`Subtask ${i}`}</div><div style={{ fontSize: 13, color: '#64748b' }}>Small note about the subtask</div></div>
                                                            <div style={{ fontSize: 13, color: '#94a3b8' }}>To Do</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>

                                            {/* Activity area: tabs + content */}
                                            <section style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                    <div style={{ fontSize: 16, fontWeight: 700 }}>Activity</div>
                                                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                                                        <button onClick={() => setActivityTab('all')} style={{ padding: '6px 10px', borderRadius: 8, background: activityTab === 'all' ? '#eef6ff' : '#fff', border: '1px solid #eef3f9' }}>All</button>
                                                        <button onClick={() => setActivityTab('comments')} style={{ padding: '6px 10px', borderRadius: 8, background: activityTab === 'comments' ? '#eef6ff' : '#fff', border: '1px solid #eef3f9' }}>Comments</button>
                                                        <button onClick={() => setActivityTab('history')} style={{ padding: '6px 10px', borderRadius: 8, background: activityTab === 'history' ? '#eef6ff' : '#fff', border: '1px solid #eef3f9' }}>History</button>
                                                        <button onClick={() => setActivityTab('worklog')} style={{ padding: '6px 10px', borderRadius: 8, background: activityTab === 'worklog' ? '#eef6ff' : '#fff', border: '1px solid #eef3f9' }}>Work log</button>
                                                    </div>
                                                </div>

                                                <div style={{ display: activityTab === 'comments' || activityTab === 'all' ? 'block' : 'none' }}>
                                                    <h4 style={{ margin: '8px 0 8px 0', fontSize: 16 }}>Comments</h4>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                                        {/* existing mock comments */}
                                                        <div style={{ display: 'flex', gap: 12 }}>
                                                            {getAvatar('S')}
                                                            <div style={{ background: '#f7f9fb', padding: 12, borderRadius: 8 }}>
                                                                <div style={{ fontWeight: 700 }}>Sarah Chen <span style={{ color: '#94a3b8', fontSize: 12, marginLeft: 8 }}>2 days ago</span></div>
                                                                <div style={{ color: '#334155' }}>Initial API development is complete. Moving on to testing.</div>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'flex', gap: 12 }}>
                                                            {getAvatar('D')}
                                                            <div style={{ background: '#f7f9fb', padding: 12, borderRadius: 8 }}>
                                                                <div style={{ fontWeight: 700 }}>David Lee <span style={{ color: '#94a3b8', fontSize: 12, marginLeft: 8 }}>1 day ago</span></div>
                                                                <div style={{ color: '#334155' }}>Great work, Sarah! I'll start working on the front-end integration.</div>
                                                            </div>
                                                        </div>

                                                        {/* render local comments for this task, if any */}
                                                        {selectedTask && localComments[selectedTask.id] && localComments[selectedTask.id].map((c, idx) => (
                                                            <div key={`local-${idx}`} style={{ display: 'flex', gap: 12 }}>
                                                                {getAvatar(c.author.charAt(0).toUpperCase())}
                                                                <div style={{ background: '#f7f9fb', padding: 12, borderRadius: 8 }}>
                                                                    <div style={{ fontWeight: 700 }}>{c.author} <span style={{ color: '#94a3b8', fontSize: 12, marginLeft: 8 }}>{c.when}</span></div>
                                                                    <div style={{ color: '#334155' }}>{c.text}</div>
                                                                </div>
                                                            </div>
                                                        ))}

                                                        {/* input to add a new comment (rich-ish editor) */}
                                                        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 6 }}>
                                                            <div>{getAvatar('Y')}</div>
                                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                                {/* simple toolbar */}
                                                                <div style={{ display: 'flex', gap: 8 }}>
                                                                    <button onClick={() => setCommentText(prev => prev + '\n**Bold** ')} style={{ padding: '6px 10px', borderRadius: 6 }}>Bold</button>
                                                                    <button onClick={() => setCommentText(prev => prev + '\n_Italic_ ')} style={{ padding: '6px 10px', borderRadius: 6 }}>Italic</button>
                                                                    <button onClick={() => setCommentText(prev => prev + '\n- Checklist item ')} style={{ padding: '6px 10px', borderRadius: 6 }}>Checklist</button>
                                                                </div>
                                                                <textarea value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Add a comment..." rows={4} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #eef3f9', resize: 'vertical' }} />
                                                                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                                                    <button onClick={() => { setCommentText(''); }} style={{ padding: '8px 12px', borderRadius: 8, background: '#fff', border: '1px solid #eef3f9' }}>Cancel</button>
                                                                    <button onClick={() => {
                                                                        if (!selectedTask) return;
                                                                        const text = commentText.trim();
                                                                        if (!text) return;
                                                                        setLocalComments(prev => {
                                                                            const existing = prev[selectedTask.id] || [];
                                                                            return { ...prev, [selectedTask.id]: [{ author: 'You', text, when: 'just now' }, ...existing] };
                                                                        });
                                                                        setTasks(prev => prev.map(t => t.id === selectedTask.id ? { ...t, comments: t.comments + 1 } : t));
                                                                        setCommentText('');
                                                                    }} style={{ padding: '8px 12px', borderRadius: 8, background: '#0b5fff', color: '#fff', border: 'none' }}>Post</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* History tab (stub) */}
                                                <div style={{ display: activityTab === 'history' || activityTab === 'all' ? 'block' : 'none' }}>
                                                    <h4 style={{ margin: '8px 0 8px 0', fontSize: 16 }}>History</h4>
                                                    <div style={{ background: '#fff', padding: 12, borderRadius: 8, border: '1px solid #eef3f9' }}>
                                                        <div style={{ fontSize: 13 }}>• Task created by Alex Johnson</div>
                                                        <div style={{ fontSize: 13 }}>• Status changed from "In Progress" to "In Review"</div>
                                                    </div>
                                                </div>

                                                {/* Work log tab */}
                                                <div style={{ display: activityTab === 'worklog' || activityTab === 'all' ? 'block' : 'none' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <h4 style={{ margin: '8px 0 8px 0', fontSize: 16 }}>Work log</h4>
                                                        <div>
                                                            <button onClick={() => setWorklogModalOpen(true)} style={{ padding: '8px 12px', borderRadius: 8, background: '#0b5fff', color: '#fff', border: 'none' }}>Add work log</button>
                                                        </div>
                                                    </div>
                                                    <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                        {selectedTask && worklogs[selectedTask.id] && worklogs[selectedTask.id].length > 0 ? (
                                                            worklogs[selectedTask.id].map((w, i) => (
                                                                <div key={i} style={{ background: '#fff', padding: 12, borderRadius: 8, border: '1px solid #eef3f9' }}>
                                                                    <div style={{ fontWeight: 700 }}>{w.author} — {w.hours}h</div>
                                                                    <div style={{ fontSize: 13, color: '#64748b' }}>{w.date}</div>
                                                                    <div style={{ marginTop: 8 }}>{w.description}</div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div style={{ color: '#94a3b8' }}>No work logs yet.</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </section>
                                        </div>

                                        {/* removed Quick Actions - simplified left column */}
                                    </div>
                                </div>

                                {/* Right sidebar */}
                                <aside style={{ width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto', paddingLeft: 4 }}>
                                    <div style={{ padding: 14, borderRadius: 10, border: '1px solid #eef3f9', background: '#fff' }}>
                                        <div style={{ fontWeight: 700, marginBottom: 8 }}>Assignee</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            {getAvatar(selectedTask.assignee)}
                                            <div style={{ fontWeight: 700 }}>{selectedTask.assignee === 'A' ? 'Saurabh Singh' : `User ${selectedTask.assignee}`}</div>
                                        </div>
                                    </div>

                                    <div style={{ padding: 14, borderRadius: 10, border: '1px solid #eef3f9', background: '#fff' }}>
                                        <div style={{ fontWeight: 700, marginBottom: 8 }}>Details</div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                            <div style={{ color: '#64748b', fontSize: 13 }}>Type</div><div style={{ fontWeight: 600 }}>{selectedTask.type}</div>
                                            <div style={{ color: '#64748b', fontSize: 13 }}>Comments</div><div style={{ fontWeight: 600 }}>{selectedTask.comments}</div>
                                            <div style={{ color: '#64748b', fontSize: 13 }}>Priority</div><div style={{ fontWeight: 600 }}>Medium</div>
                                            <div style={{ color: '#64748b', fontSize: 13 }}>Due</div><div style={{ fontWeight: 600 }}>—</div>
                                        </div>
                                    </div>

                                    <div style={{ padding: 14, borderRadius: 10, border: '1px solid #eef3f9', background: '#fff' }}>
                                        <div style={{ fontWeight: 700, marginBottom: 8 }}>Attachments</div>
                                        <div style={{ background: '#f8fbff', padding: 10, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ fontSize: 14 }}>API_spec.pdf</div>
                                            <div style={{ color: '#0b5fff' }}>⬇</div>
                                        </div>
                                    </div>

                                    <div style={{ padding: 14, borderRadius: 10, border: '1px solid #eef3f9', background: '#fff' }}>
                                        <div style={{ fontWeight: 700, marginBottom: 8 }}>Activity</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            <div style={{ fontSize: 13 }}>• Task created by Alex Johnson</div>
                                            <div style={{ fontSize: 13 }}>• Assigned to {selectedTask.assignee}</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button onClick={closeTask} style={{ flex: 1, padding: '10px 12px', borderRadius: 8, background: '#fff', border: '1px solid #eef3f9' }}>Close</button>
                                        <button style={{ flex: 1, padding: '10px 12px', borderRadius: 8, background: '#0b5fff', color: '#fff', border: 'none' }}>Edit</button>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mytask;