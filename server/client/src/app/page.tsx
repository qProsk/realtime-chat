"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

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

  useEffect(() => {
    socket.on("receive_message", (data: ChatMessage) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

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
      <div style={{ padding: 40, maxWidth: 500, margin: "0 auto" }}>
        <h1>Join Chat</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name..."
            style={{ flex: 1, padding: 10 }}
          />
          <button onClick={joinChat} style={{ padding: "10px 16px" }}>
            Join
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, maxWidth: 700, margin: "0 auto" }}>
      <h1>Realtime Chat</h1>
      <p>
        Logged in as: <strong>{username}</strong>
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write message..."
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={sendMessage} style={{ padding: "10px 16px" }}>
          Send
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((msg, i) => {
          const isMe = msg.user === username;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: isMe ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  padding: 10,
                  background: isMe ? "#4f46e5" : "#e5e5e5",
                  color: isMe ? "white" : "black",
                  borderRadius: 8,
                  maxWidth: "70%",
                }}
              >
                <div style={{ fontWeight: "bold" }}>
                  {msg.user} ({msg.time})
                </div>
                <div>{msg.message}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
