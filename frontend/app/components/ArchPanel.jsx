"use client";

export default function ArchPanel() {
  const items = [
    {
      icon: "🔌",
      title: "WebSockets",
      desc: "Real-time communication using Socket.io",
    },
    {
      icon: "⚡",
      title: "Redis",
      desc: "Queue for matchmaking + 24hr message expiry",
    },
    {
      icon: "🏠",
      title: "Rooms",
      desc: "Each chat gets a unique private room",
    },
    {
      icon: "🎲",
      title: "Matchmaking",
      desc: "FIFO queue pairs users randomly",
    },
    {
      icon: "⏱️",
      title: "24hr TTL",
      desc: "Messages auto-delete after 24 hours",
    },
    {
      icon: "👻",
      title: "Anonymous",
      desc: "No login, no identity, pure anonymous chat",
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-4">

      {/* Title */}
      <h2 className="text-lg font-bold mb-1">🏗️ Architecture</h2>
      <p className="text-xs text-gray-500 mb-4">
        How ShadowChat works internally
      </p>

      {/* Cards */}
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-[#1a1a2e] border border-gray-800 rounded-xl p-3 flex gap-3"
          >
            <div className="text-xl">{item.icon}</div>

            <div>
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Socket Events Section */}
      <div className="mt-5 bg-[#0d1a0d] border border-green-900 rounded-xl p-3">
        <h3 className="text-xs text-blue-400 font-semibold mb-2">
          💻 Socket Events
        </h3>

        <div className="space-y-1 text-xs">
          {[
            ["join_global", "Enter global room"],
            ["send_message", "Broadcast message"],
            ["find_partner", "Start matchmaking"],
            ["matched", "Partner found"],
            ["send_dm", "Private message"],
            ["partner_left", "Stranger disconnected"],
          ].map(([ev, desc]) => (
            <div
              key={ev}
              className="flex justify-between border-b border-gray-800 py-1"
            >
              <code className="text-green-400">{ev}</code>
              <span className="text-gray-500">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}