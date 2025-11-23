import React from "react";

const teamMembers = [
    { name: "Liam", value: 90 },
    { name: "Olivia", value: 70 },
    { name: "Noah", value: 95 },
    { name: "Emma", value: 80 },
    { name: "Ethan", value: 60 },
    { name: "Ava", value: 50 },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const completionData = [40, 80, 50, 60, 45, 55];

const progressData = [60, 65, 62, 70, 60, 80, 65];

const Reports: React.FC = () => {
    return (
        <div style={{ padding: "32px 40px", background: "#fafbfc", minHeight: "100vh" }}>
            {/* Header */}
            <div>
                <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Reporting & Analytics</h1>
                <div style={{ color: "#6b7280", fontSize: 16, marginBottom: 32 }}>
                    Gain insights into project progress, team performance, and task completion rates.
                </div>
            </div>

            {/* Filters */}
            <div style={{ marginBottom: 32 }}>
                <div style={{ fontWeight: 600, marginBottom: 12 }}>Filters</div>
                <div style={{ display: "flex", gap: 12 }}>
                    <select style={filterStyle}>
                        <option>Project</option>
                    </select>
                    <select style={filterStyle}>
                        <option>Team Member</option>
                    </select>
                    <select style={filterStyle}>
                        <option>Date Range</option>
                    </select>
                    <select style={filterStyle}>
                        <option>Status</option>
                    </select>
                </div>
            </div>

            {/* Project Overview */}
            <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
                {/* Task Completion Rate */}
                <div style={cardStyle}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Task Completion Rate</div>
                    <div style={{ fontSize: 40, fontWeight: 700, marginBottom: 4 }}>85%</div>
                    <div style={{ color: "#6b7280", fontSize: 14, marginBottom: 12 }}>
                        Last 30 Days <span style={{ color: "#22c55e", fontWeight: 600 }}>+5%</span>
                    </div>
                    {/* Bar Chart */}
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 60 }}>
                        {completionData.map((val, idx) => (
                            <div key={idx} style={{
                                width: 28,
                                height: `${val * 0.7}px`,
                                background: "#c7e0fa",
                                borderRadius: 4,
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "center"
                            }} />
                        ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280", marginTop: 4 }}>
                        {months.map((m) => <span key={m}>{m}</span>)}
                    </div>
                </div>

                {/* Project Progress Over Time */}
                <div style={cardStyle}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Project Progress Over Time</div>
                    <div style={{ fontSize: 40, fontWeight: 700, marginBottom: 4 }}>70%</div>
                    <div style={{ color: "#6b7280", fontSize: 14, marginBottom: 12 }}>
                        Last 90 Days <span style={{ color: "#22c55e", fontWeight: 600 }}>+10%</span>
                    </div>
                    {/* Line Chart */}
                    <svg width="100%" height="60" viewBox="0 0 220 60" style={{ marginBottom: 4 }}>
                        <polyline
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="3"
                            points={progressData
                                .map((val, idx) => {
                                    const x = (idx * 36) + 10;
                                    const y = 60 - (val * 0.6);
                                    return `${x},${y}`;
                                })
                                .join(" ")}
                        />
                    </svg>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280" }}>
                        {["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6"].map((w) => <span key={w}>{w}</span>)}
                    </div>
                </div>
            </div>

            {/* Team Performance */}
            <div style={{ ...cardStyle, marginBottom: 32 }}>
                <div style={{ fontWeight: 600, marginBottom: 16 }}>Tasks Completed by Team Member</div>
                <div style={{ color: "#6b7280", fontSize: 14, marginBottom: 16 }}>Last Month</div>
                <div>
                    {teamMembers.map((member) => (
                        <div key={member.name} style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                            <div style={{ width: 70, fontSize: 15, color: "#374151" }}>{member.name}</div>
                            <div style={{ flex: 1, background: "#e5e7eb", height: 8, borderRadius: 4, marginLeft: 12, marginRight: 12, position: "relative" }}>
                                <div style={{
                                    width: `${member.value}%`,
                                    background: "#2563eb",
                                    height: 8,
                                    borderRadius: 4,
                                    position: "absolute",
                                    left: 0,
                                    top: 0
                                }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Customizable Reports */}
            <div>
                <button
                    style={{
                        background: "#2563eb",
                        color: "#fff",
                        fontWeight: 600,
                        border: "none",
                        borderRadius: 6,
                        padding: "12px 28px",
                        fontSize: 16,
                        cursor: "pointer"
                    }}
                >
                    Generate Report
                </button>
            </div>
        </div>
    );
};

const filterStyle: React.CSSProperties = {
    padding: "8px 16px",
    borderRadius: 6,
    border: "1px solid #e5e7eb",
    background: "#fff",
    fontSize: 15,
    fontWeight: 500,
    color: "#374151",
    outline: "none",
};

const cardStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    padding: 24,
    flex: 1,
    minWidth: 320,
};

export default Reports;