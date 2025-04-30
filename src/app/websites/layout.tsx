import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./website.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "School Website",
  description: "School Management System Website",
};

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      {children}
    </div>
  );
} 