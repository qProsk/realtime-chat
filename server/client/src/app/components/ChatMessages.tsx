import { RefObject } from "react";

type ChatMessage = {
  user: string;
  message: string;
  time: string;
};

type Props = {
  messages: ChatMessage[];
  username: string;
  bottomRef: RefObject<HTMLDivElement | null>;
};

export default function ChatMessages({
  messages,
  username,
  bottomRef,
}: Props) {
  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        background: "#f9fafb",
      }}
    >
      {messages.length === 0 ? (
        <div style={{ color: "#6b7280", textAlign: "center", marginTop: 20 }}>
          No messages yet. Start the conversation.
        </div>
      ) : (
        messages.map((msg, i) => {
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
                  padding: 12,
                  background: isMe ? "#4f46e5" : "#e5e7eb",
                  color: isMe ? "white" : "black",
                  borderRadius: 12,
                  maxWidth: "70%",
                }}
              >
                <div style={{ fontWeight: "bold", marginBottom: 4 }}>
                  {msg.user} ({msg.time})
                </div>
                <div>{msg.message}</div>
              </div>
            </div>
          );
        })
      )}

      <div ref={bottomRef} />
    </div>
  );
}