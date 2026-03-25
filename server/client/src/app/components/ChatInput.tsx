type Props = {
  message: string;
  setMessage: (val: string) => void;
  sendMessage: () => void;
};

export default function ChatInput({
  message,
  setMessage,
  sendMessage,
}: Props) {
  return (
    <div
      style={{
        padding: 16,
        borderTop: "1px solid #e5e7eb",
        background: "white",
        display: "flex",
        gap: 10,
      }}
    >
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
        placeholder="Write message..."
        style={{
          flex: 1,
          padding: 12,
          borderRadius: 8,
          border: "1px solid #d1d5db",
          outline: "none",
        }}
      />
      <button
        onClick={sendMessage}
        style={{
          padding: "12px 18px",
          borderRadius: 8,
          border: "none",
          background: "#4f46e5",
          color: "white",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}