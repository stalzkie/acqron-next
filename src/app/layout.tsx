import type { Metadata } from "next";
import "./globals.css";
import CursorTrail from "@/components/CursorTrail";

export const metadata: Metadata = {
  title: "Acqron — Build What Matters",
  description: "We help businesses systemize, automate, and scale through custom software built to last.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
