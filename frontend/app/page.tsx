import HomeClient from "./homeClient/page";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-black text-white">
      <section className="text-center py-4 sm:py-6 px-4 border-b border-gray-800">
        <h1 className="text-sm px-5 md:px-0 sm:text-3xl font-bold leading-tight">
          ShadowChat – Anonymous 1-on-1 & Global Chat
        </h1>

        <p className="text-gray-400 text-xs sm:text-base mt-1">
          Chat instantly with strangers • No login required • Stay anonymous
        </p>
      </section>
      <div className="flex-1 overflow-hidden">
        <HomeClient />
      </div>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-8 text-gray-300 space-y-6 text-left border-t border-gray-800">
        <h2 className="text-lg sm:text-2xl font-semibold text-white">
          About ShadowChat
        </h2>

        <p className="text-sm sm:text-base leading-relaxed">
          ShadowChat is a powerful anonymous chat platform that allows users to
          connect and talk with strangers worldwide instantly. It provides fast,
          secure, and real-time messaging without requiring any login or
          personal information.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-white font-medium text-base sm:text-lg">
              🌍 Global Chat
            </h3>
            <p className="text-sm sm:text-base text-gray-400">
              Join a public chat room where anyone can send and receive messages
              in real-time. Perfect for open conversations with people from
              around the world.
            </p>
          </div>

          <div>
            <h3 className="text-white font-medium text-base sm:text-lg">
              💬 1-on-1 Random Chat
            </h3>
            <p className="text-sm sm:text-base text-gray-400">
              Get instantly matched with a random stranger for a private
              conversation. Stay anonymous and chat freely without sharing any
              personal details.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
