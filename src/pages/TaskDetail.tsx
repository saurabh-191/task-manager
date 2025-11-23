import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaRegCalendarAlt, FaDownload } from "react-icons/fa";

const mockTask = {
    project: "Project Alpha",
    title: "Develop User Authentication Module",
    urgent: true,
    dueDate: "2024-08-15",
    description:
        "Create a robust and secure user authentication system that includes registration, login, and password reset functionalities. The backend should be built with Node.js and Express, and the frontend should use React.",
    subtasks: [
        { id: 1, text: "Implement user registration API", done: true },
        { id: 2, text: "Implement user login API", done: true },
        { id: 3, text: "Implement password reset functionality", done: false },
        { id: 4, text: "Integrate with frontend login form", done: false },
    ],
    assignees: [
        { name: "Sarah Chen", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
        { name: "David Lee", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    ],
    labels: ["Backend", "API", "Feature"],
    attachments: [{ name: "API_spec.pdf", url: "#" }],
    comments: [
        {
            user: { name: "Sarah Chen", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
            text: "Initial API development is complete. Moving on to testing.",
            time: "2 days ago",
        },
        {
            user: { name: "David Lee", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
            text: "Great work, Sarah! I'll start working on the front-end integration.",
            time: "1 day ago",
        },
    ],
    activity: [
        {
            icon: "plus",
            text: "Task created",
            by: "Alex Johnson",
            time: "2 days ago",
        },
        {
            icon: "user",
            text: "Assigned to Sarah Chen",
            by: "Alex Johnson",
            time: "2 days ago",
        },
        {
            icon: "user",
            text: "Assigned to David Lee",
            by: "Alex Johnson",
            time: "2 days ago",
        },
    ],
};

const labelColors: Record<string, string> = {
    Backend: "bg-blue-100 text-blue-700",
    API: "bg-purple-100 text-purple-700",
    Feature: "bg-green-100 text-green-700",
};

const TaskDetail: React.FC = () => {
    const [subtasks, setSubtasks] = useState(mockTask.subtasks);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(mockTask.comments);
    const navigate = useNavigate();
    const location = useLocation();

    // Optional: Get task data from navigation state if coming from MyTasks
    // const task = location.state?.task || mockTask;

    const handleSubtaskToggle = (id: number) => {
        setSubtasks((prev) =>
            prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s))
        );
    };

    const handleAddComment = () => {
        if (!comment.trim()) return;
        setComments([
            ...comments,
            {
                user: {
                    name: "You",
                    avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
                },
                text: comment,
                time: "Just now",
            },
        ]);
        setComment("");
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-2">
                    <span className="text-blue-600 cursor-pointer" onClick={() => navigate(-1)}>
                        {mockTask.project}
                    </span>{" "}
                    / <span className="text-gray-700">Task Details</span>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow p-6 mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <h1 className="text-2xl font-semibold">{mockTask.title}</h1>
                                {mockTask.urgent && (
                                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded font-medium">
                                        Urgent
                                    </span>
                                )}
                                <span className="flex items-center text-gray-500 text-sm ml-4">
                                    <FaRegCalendarAlt className="mr-1" />
                                    Due: {mockTask.dueDate}
                                </span>
                            </div>
                            <p className="text-gray-700 mb-4">{mockTask.description}</p>

                            <div>
                                <h2 className="font-medium mb-2">Subtasks</h2>
                                <ul>
                                    {subtasks.map((sub) => (
                                        <li
                                            key={sub.id}
                                            className="flex items-center gap-2 mb-1 cursor-pointer"
                                            onClick={() => handleSubtaskToggle(sub.id)}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={sub.done}
                                                readOnly
                                                className="accent-blue-600"
                                            />
                                            <span
                                                className={`${
                                                    sub.done ? "line-through text-gray-400" : "text-gray-800"
                                                }`}
                                            >
                                                {sub.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Comments */}
                        <div className="bg-white rounded-xl shadow p-6">
                            <h2 className="font-medium mb-4">Comments</h2>
                            <div className="space-y-4 mb-4">
                                {comments.map((c, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <img
                                            src={c.user.avatar}
                                            alt={c.user.name}
                                            className="w-9 h-9 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="font-semibold text-gray-800">{c.user.name}</div>
                                            <div className="text-gray-700">{c.text}</div>
                                            <div className="text-xs text-gray-400">{c.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    className="flex-1 border rounded-lg px-3 py-2 text-sm"
                                    placeholder="Add a comment..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                                />
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
                                    onClick={handleAddComment}
                                >
                                    Post Comment
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full md:w-80 flex-shrink-0 flex flex-col gap-6">
                        {/* Assignees */}
                        <div className="bg-white rounded-xl shadow p-4">
                            <h3 className="font-medium mb-2">Assignees</h3>
                            <div className="flex -space-x-3">
                                {mockTask.assignees.map((a, idx) => (
                                    <img
                                        key={idx}
                                        src={a.avatar}
                                        alt={a.name}
                                        className="w-9 h-9 rounded-full border-2 border-white object-cover"
                                        title={a.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Labels */}
                        <div className="bg-white rounded-xl shadow p-4">
                            <h3 className="font-medium mb-2">Labels</h3>
                            <div className="flex gap-2 flex-wrap">
                                {mockTask.labels.map((label) => (
                                    <span
                                        key={label}
                                        className={`px-2 py-1 rounded text-xs font-medium ${labelColors[label] || "bg-gray-100 text-gray-700"}`}
                                    >
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Attachments */}
                        <div className="bg-white rounded-xl shadow p-4">
                            <h3 className="font-medium mb-2">Attachments</h3>
                            {mockTask.attachments.map((att, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <FaDownload className="text-gray-500" />
                                    <a
                                        href={att.url}
                                        className="text-blue-600 underline"
                                        download
                                    >
                                        {att.name}
                                    </a>
                                </div>
                            ))}
                        </div>

                        {/* Activity */}
                        <div className="bg-white rounded-xl shadow p-4">
                            <h3 className="font-medium mb-2">Activity</h3>
                            <ul className="space-y-2">
                                {mockTask.activity.map((act, idx) => (
                                    <li key={idx} className="text-sm text-gray-700">
                                        <span className="text-blue-600 font-medium">{act.text}</span>
                                        <span className="text-gray-400"> by {act.by}, {act.time}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;