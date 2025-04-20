import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from '../components/ClientLayout';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "School Management System",
  description: "School Management System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
