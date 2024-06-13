'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Your head content here */}
      </head>
      <body>
    <div className={inter.className}>
      <AuthContextProvider>
        <Navbar />
        {children}
      </AuthContextProvider>
    </div>
    </body>
    </html>
  );
}
