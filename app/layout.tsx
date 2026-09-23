import "./globals.css";
import Nav from "../components/Nav";
import LanguageSelector from "../components/LanguageSelector";
import { LanguageProvider } from "../lib/LanguageContext";

export const metadata = { title:"Krishiq", description:"Smart crop selling and pooling platform" };

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
  </head><body><LanguageProvider>
    <div className="fixed right-4 top-4 z-50"><LanguageSelector /></div>
    {children}<Nav/>
  </LanguageProvider></body></html>;
}
