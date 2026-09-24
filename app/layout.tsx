// @ts-expect-error Next.js processes global CSS imports at build time.
import "./globals.css";
import { LanguageProvider } from "../lib/LanguageContext";

function ConditionalChrome({ children }: { children: React.ReactNode }) {
  return children;
}

export const metadata = { title:"Krishiq", description:"Smart crop selling and pooling platform" };

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
  </head><body><LanguageProvider>
    <ConditionalChrome>{children}</ConditionalChrome>
  </LanguageProvider></body></html>;
}