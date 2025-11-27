import "./styles/globals.css";
import Navbar from "../components/Navbar";
import React from "react";

export const metadata = {
  title: "Mon Portfolio",
  description: "Bienvenue sur mon portfolio personnel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-black text-white min-h-screen">
        <Navbar />
        <main className="flex flex-col items-center justify-center p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
