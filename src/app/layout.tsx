import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#E30613",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Ethixweb India | AI Automation, Next.js Web Apps & Digital Operations",
    template: "%s | Ethixweb India",
  },
  description:
    "We run the tech. You run the business. AI automation, websites, web applications, CRM integrations, SEO, ads, maintenance, and digital operations &mdash; built for Indian businesses.",
  keywords: [
    "Ethixweb India",
    "AI automation India",
    "WhatsApp AI agent",
    "Next.js web development Bengaluru",
    "full stack development Mumbai",
    "ONDC integration",
    "Razorpay UPI checkout",
    "digital marketing India",
  ],
  authors: [{ name: "Ethixweb India Technical Team" }],
  openGraph: {
    title: "Ethixweb India | AI Automation, Next.js Web Apps & Digital Operations",
    description: "Bridging Silicon Valley engineering rigor with India's relentless innovation speed.",
    url: "https://india.ethixweb.com",
    siteName: "Ethixweb India",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
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
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Theme initializer: runs before React hydrates to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('ethix_theme');
                  var theme = saved === 'light' ? 'light' : 'dark';
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                } catch(e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#08090C] text-[#F3F4F6] selection:bg-[#E30613] selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
