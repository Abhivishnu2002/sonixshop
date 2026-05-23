import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "SonixShop | Smart Tech. Designed For Tomorrow.",
  description: "Explore premium consumer electronics, high-fidelity audio, pro gaming peripherals, and smart wearables. Engineered for elegance, performance, and simplicity.",
  keywords: ["premium gadgets", "electronics store", "Nothing style audio", "mechanical keyboards", "Apple tech accessories", "smart ring", "high-end store"],
  authors: [{ name: "SonixShop Group" }],
  icons: {
    icon: "/browser_logo.png",
    shortcut: "/browser_logo.png",
    apple: "/browser_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#020617] text-[#F8FAFC] selection:bg-indigo-600 selection:text-white antialiased overflow-x-hidden">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
