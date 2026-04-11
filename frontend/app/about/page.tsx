export const metadata = {
  title: "About Shadow Chat",
  description:
    "Learn about Shadow Chat, a real-time anonymous chat platform to talk with strangers worldwide.",
};

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 max-w-3xl mx-auto">
      
      <h1 className="text-3xl font-bold mb-4">About Shadow Chat</h1>

      <p className="text-gray-400 mb-6">
        Shadow Chat is a real-time anonymous chat platform that allows users
        to connect and communicate with strangers from around the world. Built
        with modern web technologies, it focuses on privacy, speed, and seamless
        user experience.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">🚀 Features</h2>
      <ul className="list-disc list-inside text-gray-400 space-y-2">
        <li>🌍 Global Chat Room for open conversations</li>
        <li>💬 Random 1-on-1 chat with strangers</li>
        <li>⚡ Real-time messaging using WebSockets</li>
        <li>🔒 Fully anonymous (no login required)</li>
        <li>⏱️ Messages auto-delete after 5 hours</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">🔐 Privacy First</h2>
      <p className="text-gray-400">
        Shadow Chat does not require any login or personal information.
        Conversations are temporary and automatically deleted to ensure
        complete privacy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">👨‍💻 Developer</h2>
      <p className="text-gray-400">
        Built by <span className="text-white font-semibold">Shanu Chhetri</span>
      </p>

    </div>
  );
}