"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "@/components/global/Sidebar";
import Topbar from "@/components/global/Topbar";
import { ThemeProvider } from "@/components/theme-provider";
import { SeasonProvider } from "@/components/SeasonContext";
import { DriverProvider } from "@/components/DriverContext";
import Header from "@/components/global/Header";
import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "F1 Dashboard",
//   description: "A dashboard for Formula 1 fans",
// };

export default function RootLayout({ children }) {
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 1200 || window.innerHeight < 600) {
        setIsScreenSmall(true);
      } else {
        setIsScreenSmall(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>F1 Dashboard</title>
        <meta name="description" content="A dashboard for Formula 1 fans" />
      </head>
      <body className="h-screen overflow-hidden">
        {isScreenSmall ? (
          <AlertDialog defaultOpen={true}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Sorry but your screen is too small
                </AlertDialogTitle>
                <AlertDialogDescription>
                  F1 Dashboard is not optimized for small screens yet. Please
                  use a device with a larger screen (min 1200px).
                </AlertDialogDescription>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
            <SeasonProvider>
              <DriverProvider>
                <div className="flex h-full app">
                  <Sidebar />
                  <div className="flex-1 bg-primary-foreground">
                    <Topbar />
                    {children}
                  </div>
                </div>
              </DriverProvider>
            </SeasonProvider>
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
