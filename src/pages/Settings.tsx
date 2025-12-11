import React, { useState } from "react";

const Settings: React.FC = () => {
    const [theme, setTheme] = useState(false);
    const [taskReminders, setTaskReminders] = useState(true);
    const [projectUpdates, setProjectUpdates] = useState(false);

    return (
        <div
            style={{
                background: "#f7f8f9",
                minHeight: "100vh",
                fontFamily: "Inter, Arial, sans-serif",
                padding: "0 16px",
                margin: 0,
            }}
        >
            <div
                style={{
                    maxWidth: 600,
                    margin: "40px auto",
                    background: "transparent",
                    padding: "0 0 40px 0",
                }}
            >
                <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 8 }}>
                    Settings
                </h1>
                <div style={{ color: "#6b7280", marginBottom: 32 }}>
                    Customize your TaskMaster experience.
                </div>

                {/* Appearance */}
                <SectionTitle>Appearance</SectionTitle>
                <SectionDivider />

                <SettingRow
                    label="Theme"
                    description="Switch between light and dark themes."
                    control={
                        <Switch checked={theme} onChange={() => setTheme((v) => !v)} />
                    }
                />

                {/* Notifications */}
                <SectionTitle>Notifications</SectionTitle>
                <SectionDivider />

                <SettingRow
                    label="Task Reminders"
                    description="Receive notifications for upcoming tasks."
                    control={
                        <Switch
                            checked={taskReminders}
                            onChange={() => setTaskReminders((v) => !v)}
                        />
                    }
                />
                <SectionDivider small />
                <SettingRow
                    label="Project Updates"
                    description="Get notified about changes in your projects."
                    control={
                        <Switch
                            checked={projectUpdates}
                            onChange={() => setProjectUpdates((v) => !v)}
                        />
                    }
                />

                {/* Workflows */}
                <SectionTitle>Workflows</SectionTitle>
                <SectionDivider />

                <div style={{ marginTop: 16 }}>
                    <WorkflowCard
                        label="Create New Workflow"
                        buttonLabel="Create"
                        onClick={() => { }}
                    />
                    <WorkflowCard
                        label="Edit Existing Workflow"
                        buttonLabel="Edit"
                        onClick={() => { }}
                    />
                </div>

                <div style={{ textAlign: "right", marginTop: 40 }}>
                    <button
                        style={{
                            background: "#1884f7",
                            color: "#fff",
                            border: "none",
                            borderRadius: 8,
                            padding: "10px 32px",
                            fontWeight: 500,
                            fontSize: 16,
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(24,132,247,0.08)",
                        }}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                fontWeight: 700,
                fontSize: 20,
                marginTop: 32,
                marginBottom: 8,
            }}
        >
            {children}
        </div>
    );
}

function SectionDivider({ small }: { small?: boolean }) {
    return (
        <div
            style={{
                borderBottom: "1px solid #e5eaf1",
                margin: small ? "0 0 0 0" : "0 0 24px 0",
            }}
        />
    );
}

function SettingRow({
    label,
    description,
    control,
}: {
    label: string;
    description: string;
    control: React.ReactNode;
}) {
    // Responsive row: wrap if needed
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 0",
                flexWrap: "wrap",
                gap: 16
            }}
        >
            <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontWeight: 500, fontSize: 15 }}>{label}</div>
                <div style={{ color: "#6b7280", fontSize: 13 }}>{description}</div>
            </div>
            <div>{control}</div>
        </div>
    );
}

function Switch({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: () => void;
}) {
    return (
        <label style={{ display: "inline-block", cursor: "pointer" }}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                style={{ display: "none" }}
            />
            <span
                style={{
                    display: "inline-block",
                    width: 40,
                    height: 22,
                    background: checked ? "#1884f7" : "#e5eaf1",
                    borderRadius: 22,
                    position: "relative",
                    transition: "background 0.2s",
                }}
            >
                <span
                    style={{
                        display: "block",
                        width: 18,
                        height: 18,
                        background: "#fff",
                        borderRadius: "50%",
                        position: "absolute",
                        top: 2,
                        left: checked ? 20 : 2,
                        transition: "left 0.2s",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    }}
                />
            </span>
        </label>
    );
}

function WorkflowCard({
    label,
    buttonLabel,
    onClick,
}: {
    label: string;
    buttonLabel: string;
    onClick: () => void;
}) {
    return (
        <div
            style={{
                background: "#fff",
                border: "1px solid #e5eaf1",
                borderRadius: 10,
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
                boxShadow: "0 1px 4px rgba(0,0,0,0.01)",
            }}
        >
            <div style={{ fontWeight: 500 }}>{label}</div>
            <button
                style={{
                    background: "#eaf3fd",
                    color: "#1884f7",
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 22px",
                    fontWeight: 500,
                    fontSize: 15,
                    cursor: "pointer",
                }}
                onClick={onClick}
            >
                {buttonLabel}
            </button>
        </div>
    );
}

export default Settings;