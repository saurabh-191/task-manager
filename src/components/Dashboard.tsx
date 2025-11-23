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

const Dashboard: React.FC = () => {
    return (
        <div style={{ background: "#F5F7FA", minHeight: "100vh", padding: 0 }}>
            {/* Header */}
            

            {/* Main Content */}
            <div style={{ maxWidth: "90%", margin: "0 auto", padding: "32px 0" }}>
                {/* <div> */}
                    <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Good morning, Sarah</h1>


                    {/* Buttons */}
                    {/* <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
                        <button
                            style={{
                                background: "#E5E9F2",
                                color: "#222",
                                border: "none",
                                borderRadius: 8,
                                padding: "10px 24px",
                                fontWeight: 600,
                                fontSize: 15,
                                cursor: "pointer",
                            }}
                        >
                            View All
                        </button>
                        <button
                            style={{
                                background: "#1976D2",
                                color: "#fff",
                                border: "none",
                                borderRadius: 8,
                                padding: "10px 24px",
                                fontWeight: 600,
                                fontSize: 15,
                                cursor: "pointer",
                            }}
                        >
                            New Task
                        </button>
                    </div> */}
                {/* </div> */}

                {/* Task Summary */}
                <div>
                    <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>My Task Summary</h2>
                    <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
                        {taskSummary.map((item, idx) => (
                            <div
                                key={item.title}
                                style={{
                                    background: "#fff",
                                    borderRadius: 16,
                                    padding: "24px 24px 16px 24px",
                                    flex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                                    border: item.highlight ? "1.5px solid #FF5A5F" : "none",
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 17 }}>{item.title}</div>
                                    <div style={{ color: item.highlight ? "#FF5A5F" : "#888", fontSize: 15, marginTop: 4 }}>
                                        {item.subtitle}
                                    </div>
                                </div>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 12,
                                        objectFit: "cover",
                                        marginLeft: 16,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Activity */}
                <div>
                    <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Team Activity</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {teamActivity.map((activity, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: "#fff",
                                    borderRadius: 12,
                                    padding: "18px 24px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 18,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.01)",
                                }}
                            >
                                <img
                                    src={activity.avatar}
                                    alt={activity.name}
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                    }}
                                />
                                <div>
                                    <div style={{ fontWeight: 500, fontSize: 15 }}>
                                        {activity.name} <span style={{ color: "#444" }}>{activity.action}</span>
                                    </div>
                                    <div style={{ color: "#8A94A6", fontSize: 14, marginTop: 2 }}>{activity.project}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;