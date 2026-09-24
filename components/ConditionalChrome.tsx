"use client";

import { usePathname } from "next/navigation";
import Nav from "./Nav";
import LanguageSelector from "./LanguageSelector";

export default function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <>
      {!isLanding && (
        <div className="fixed right-4 top-4 z-50">
          <LanguageSelector />
        </div>
      )}
      {children}
      {!isLanding && <Nav />}
    </>
  );
}