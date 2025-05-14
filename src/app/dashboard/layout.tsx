import Menu from "@/components/Menu";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 transition-all duration-300">
        <Header />
        {children}
      </main>
    </div>
  );
}
