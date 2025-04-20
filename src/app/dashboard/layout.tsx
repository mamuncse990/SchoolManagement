import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-[200px]">
        <Menu />
      </aside>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
