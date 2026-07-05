"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* On "/" the JP-OS desktop provides its own chrome (menu bar + dock),
 * so the classic Navbar/Footer only render on the other routes. */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <main>{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </>
  );
}
