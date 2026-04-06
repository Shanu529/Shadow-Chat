"use client";

export default function Avatar({ name, size = 32 }) {
  const colors = [
    "bg-red-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-purple-400",
    "bg-orange-400",
    "bg-cyan-400",
    "bg-pink-400",
  ];

  const color = colors[name.charCodeAt(0) % colors.length];

  return (
    <div
      className={`${color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}