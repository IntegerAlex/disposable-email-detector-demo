import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Disposable Email Detector",
  description: "Check if an email address is from a disposable email service",
  keywords: ["email checker", "disposable email", "temporary email", "email validator"],
  authors: [{ name: "IntegerAlex" }],
  openGraph: {
    title: "Email Checker - Disposable Email Detector",
    description: "Check if an email address is from a disposable email service",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
