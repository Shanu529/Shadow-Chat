import "./globals.css";
import Navbar from "./components/Navbar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { UserProvider } from "./context/UsersContext"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  metadataBase: new URL("https://shadowchat.in"),

  title: {
    default: "Shadow Chat - Anonymous Chat App",
    template: "%s | Shadow Chat",
  },

  alternates: {
    canonical: "https://shadowchat.in",
  },
  description:
    "Shadow Chat is a real-time anonymous chat platform where you can talk with strangers worldwide. No login required. Enjoy private, fast, and secure chatting.",

  keywords: [
    "shadow chat",
    "anonymous chat",
    "random chat",
    "chat with strangers",
    "online chat app",
    "free chat platform",
    "real-time chat",
  ],

  authors: [{ name: "Shanu Chhetri" }],
  creator: "Shanu Chhetri",
  publisher: "Shadow Chat",

  openGraph: {
    title: "Shadow Chat - Anonymous Global Chat App",
    description:
      "Talk with strangers worldwide using Shadow Chat. Real-time anonymous chatting platform.",
    url: "https://shadowchat.in",
    
    siteName: "Shadow Chat",
    images: [
      {
        url: "/logo.ico",
        width: 1200,
        height: 630,
        alt: "Shadow Chat",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shadow Chat",
    description: "Talk with strangers worldwide",
    images: ["/shadow.png"],
  },

  icons: {
    icon: "/logo.ico",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-black text-white">
        <UserProvider>
          <Navbar />

          {/* SEO structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: "Shadow Chat",
                url: "https://shadowchat.in",
                image: "https://shadowchat.in/logo.ico",
                description:
                  "Anonymous real-time chat platform to talk with strangers worldwide.",
              }),
            }}
          />

          <main className="">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
