export const metadata = {
  title: "Privacy Policy - Shadow Chat",
  description:
    "Read the privacy policy of Shadow Chat. Learn how your data is handled in our anonymous chat platform.",
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 max-w-3xl mx-auto">
      
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="text-gray-400 mb-6">
        Your privacy is important to us. Shadow Chat is designed as a completely
        anonymous platform with minimal data collection.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">🔍 Information We Collect</h2>
      <p className="text-gray-400">
        We do not require user registration. We do not collect personal
        information such as name, email, or phone number.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">💬 Chat Data</h2>
      <p className="text-gray-400">
        Messages sent in the global chat are temporarily stored in Redis and
        automatically deleted after 5 hours. One-to-one chats are not stored
        after disconnection.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">🍪 Cookies</h2>
      <p className="text-gray-400">
        We do not use cookies for tracking or advertising purposes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">🔐 Security</h2>
      <p className="text-gray-400">
        We use secure technologies to ensure real-time communication, but users
        should avoid sharing sensitive personal information while chatting.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">⚠️ Disclaimer</h2>
      <p className="text-gray-400">
        Shadow Chat is an open platform. We are not responsible for user-generated
        content. Users are advised to use the platform responsibly.
      </p>


    </div>
  );
}