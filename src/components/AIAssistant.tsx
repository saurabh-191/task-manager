import React, { useRef, useState } from "react";
import { FiSend, FiPaperclip, FiImage, FiMic, FiFile } from "react-icons/fi";

interface Message {
    id: number;
    sender: "AI Assistant" | "user";
    name?: string;
    avatar?: string;
    content: string;
    type?: "text" | "image" | "file" | "audio";
    attachments?: Attachment[];
}

interface Attachment {
    id: number;
    type: "image" | "file" | "audio";
    name: string;
    url: string;
}

const initialMessages: Message[] = [
    {
        id: 1,
        sender: "AI Assistant",
        content: "Hello! How can I help you with your tasks today?",
        type: "text",
    },
    {
        id: 2,
        sender: "user",
        name: "Sophia",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        content:
            "I need help with a new project. It's about launching a new marketing campaign for our summer collection. The deadline is July 31st, and I'd like to assign the design tasks to Ethan and the content creation to Olivia. The priority should be high.",
        type: "text",
    },
    {
        id: 3,
        sender: "AI Assistant",
        content: `<b>Project:</b> Launch a new marketing campaign for the summer collection.<br/>
<b>Deadline:</b> July 31st<br/>
<b>Assignees:</b><br/>
- Design: Ethan<br/>
- Content Creation: Olivia<br/>
<b>Priority:</b> High<br/><br/>
Would you like me to create this project and assign the tasks accordingly?`,
        type: "text",
    },
];

const AI_Assistant: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSend = () => {
        if (!input.trim() && attachments.length === 0) return;
        const newMsg: Message = {
            id: Date.now(),
            sender: "user",
            name: "Sophia",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            content: input,
            type: "text",
            attachments: attachments.length ? attachments : undefined,
        };
        setMessages((msgs) => [...msgs, newMsg]);
        setInput("");
        setAttachments([]);
        // Simulate AI response (for demo)
        setTimeout(() => {
            setMessages((msgs) => [
                ...msgs,
                {
                    id: Date.now() + 1,
                    sender: "AI Assistant",
                    content: "Thank you for your message. I'll get started on this right away!",
                    type: "text",
                },
            ]);
        }, 1200);
    };

    const handleAttach = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "file") => {
        const files = e.target.files;
        if (!files) return;
        const newAttachments: Attachment[] = [];
        Array.from(files).forEach((file) => {
            const url = URL.createObjectURL(file);
            newAttachments.push({
                id: Date.now() + Math.random(),
                type,
                name: file.name,
                url,
            });
        });
        setAttachments((prev) => [...prev, ...newAttachments]);
        e.target.value = "";
    };

    return (
        <div style={{
            width: "100%",
            height: "100vh",
            margin: 0,
            padding: 0,
            border: "none",
            borderRadius: 0,
            boxShadow: "none",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            fontFamily: "Inter, sans-serif",
            zIndex: 9999
        }}>
            <header style={{
                padding: "18px 28px",
                borderBottom: "1px solid #f1f1f1",
                fontWeight: 700,
                fontSize: 22,
                background: "#f9fafb"
            }}>
                AI Assistant
            </header>
            <div style={{
                flex: 1,
                overflowY: "auto",
                padding: "24px 20px",
                background: "#f7f8fa"
            }}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        style={{
                            display: "flex",
                            flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                            alignItems: "flex-start",
                            marginBottom: 22,
                        }}
                    >
                        {msg.sender === "user" ? (
                            <img
                                src={msg.avatar}
                                alt={msg.name}
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: "50%",
                                    marginLeft: 12,
                                    marginRight: 0,
                                    objectFit: "cover",
                                    border: "2px solid #e5e7eb"
                                }}
                            />
                        ) : (
                            <div style={{
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                background: "#e0e7ef",
                                color: "#3b82f6",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 700,
                                fontSize: 18,
                                marginRight: 12,
                                marginLeft: 0,
                            }}>
                                AI
                            </div>
                        )}
                        <div style={{
                            maxWidth: 340,
                            background: msg.sender === "user" ? "#3b82f6" : "#fff",
                            color: msg.sender === "user" ? "#fff" : "#222",
                            borderRadius: 14,
                            padding: "14px 18px",
                            boxShadow: msg.sender === "user" ? "0 2px 8px #3b82f61a" : "0 2px 8px #0001",
                            fontSize: 15,
                            wordBreak: "break-word",
                            border: msg.sender === "user" ? "none" : "1px solid #e5e7eb",
                            position: "relative"
                        }}>
                            {msg.type === "text" ? (
                                <span
                                    dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, "<br/>") }}
                                />
                            ) : null}
                            {msg.attachments &&
                                msg.attachments.map((att) =>
                                    att.type === "image" ? (
                                        <img
                                            key={att.id}
                                            src={att.url}
                                            alt={att.name}
                                            style={{ marginTop: 8, maxWidth: 180, borderRadius: 8, border: "1px solid #eee" }}
                                        />
                                    ) : att.type === "file" ? (
                                        <a
                                            key={att.id}
                                            href={att.url}
                                            download={att.name}
                                            style={{
                                                display: "block",
                                                marginTop: 8,
                                                color: "#3b82f6",
                                                textDecoration: "underline",
                                                fontSize: 14,
                                            }}
                                        >
                                            <FiFile style={{ marginRight: 4, verticalAlign: "middle" }} />
                                            {att.name}
                                        </a>
                                    ) : null
                                )}
                        </div>
                    </div>
                ))}
            </div>
            {/* Attachments Preview */}
            {attachments.length > 0 && (
                <div style={{
                    padding: "8px 22px 0 22px",
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                    background: "#f9fafb"
                }}>
                    {attachments.map((att) =>
                        att.type === "image" ? (
                            <div key={att.id} style={{ position: "relative" }}>
                                <img
                                    src={att.url}
                                    alt={att.name}
                                    style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8, border: "1px solid #eee" }}
                                />
                            </div>
                        ) : (
                            <div key={att.id} style={{
                                display: "flex",
                                alignItems: "center",
                                background: "#fff",
                                border: "1px solid #e5e7eb",
                                borderRadius: 8,
                                padding: "4px 10px",
                                fontSize: 13
                            }}>
                                <FiFile style={{ marginRight: 4 }} />
                                {att.name}
                            </div>
                        )
                    )}
                </div>
            )}
            {/* Input Area */}
            <div style={{
                borderTop: "1px solid #f1f1f1",
                padding: "14px 18px",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 10
            }}>
                <button
                    title="Attach file"
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 22,
                        color: "#6b7280"
                    }}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <FiPaperclip />
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    multiple
                    onChange={(e) => handleAttach(e, "file")}
                />
                <label title="Attach image" style={{ cursor: "pointer", fontSize: 22, color: "#6b7280" }}>
                    <FiImage />
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        multiple
                        onChange={(e) => handleAttach(e, "image")}
                    />
                </label>
                <button
                    title="Record audio (not implemented)"
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 22,
                        color: "#6b7280"
                    }}
                    disabled
                >
                    <FiMic />
                </button>
                <input
                    type="text"
                    placeholder="Ask me anything about your tasks..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        fontSize: 16,
                        background: "transparent",
                        padding: "8px 0"
                    }}
                    onKeyDown={e => {
                        if (e.key === "Enter") handleSend();
                    }}
                />
                <button
                    onClick={handleSend}
                    style={{
                        background: "#3b82f6",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "8px 18px",
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: "pointer",
                        marginLeft: 6
                    }}
                >
                    <FiSend style={{ verticalAlign: "middle", marginRight: 4 }} />
                    Send
                </button>
            </div>
        </div>
    );
};

export default AI_Assistant;