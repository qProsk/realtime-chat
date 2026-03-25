type Props = {
  username: string;
};

export default function ChatHeader({ username }: Props) {
  return (
    <div
      style={{
        padding: 20,
        borderBottom: "1px solid #e5e7eb",
        background: "#fafafa",
      }}
    >
      <h1 style={{ margin: 0, marginBottom: 6 }}>Realtime Chat</h1>
      <p style={{ margin: 0, color: "#4b5563" }}>
        Logged in as: <strong style={{ color: "#111827" }}>{username}</strong>
      </p>
    </div>
  );
}