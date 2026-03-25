"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);

type ChatMessage = {
  user: string;
  message: string;
  time: string;
};

export default function Home() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket.on("receive_message", (data: ChatMessage) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const joinChat = () => {
    if (!username.trim()) return;
    setJoined(true);
  };

  const sendMessage = () => {
    if (!message.trim() || !username.trim()) return;

    const newMessage: ChatMessage = {
      user: username,
      message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socket.emit("send_message", newMessage);
    setMessage("");
  };

  if (!joined) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 500,
          background: "white",
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          padding: 24,
          border: "1px solid #e5e7eb",
        }}
      >
        <h1 style={{ margin: 0, marginBottom: 16 }}>Join Chat</h1>

        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                joinChat();
              }
            }}
            placeholder="Your name..."
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              border: "1px solid #d1d5db",
              outline: "none",
            }}
          />
          <button
            onClick={joinChat}
            style={{
              padding: "12px 18px",
              borderRadius: 8,
              border: "none",
              background: "#4f46e5",
              color: "white",
              cursor: "pointer",
            }}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 850,
          height: "80vh",
          background: "white",
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <ChatHeader username={username} />

        <ChatMessages
          messages={messages}
          username={username}
          bottomRef={bottomRef}
        />

        <ChatInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}