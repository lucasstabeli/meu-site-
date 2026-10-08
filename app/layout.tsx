import type { Metadata } from "next";
import { Inter } from "next/font/google";
import FrameGuard from "@/components/FrameGuard";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const isDev = process.env.NODE_ENV === "development";

// CSP por <meta>, porque o GitHub Pages nao permite cabecalhos HTTP customizados.
// - script-src 'unsafe-inline': o export estatico do Next usa scripts inline sem nonce
//   (nonce exige renderizacao no servidor). Em dev o Next tambem precisa de eval e websocket (HMR).
// - style-src 'unsafe-inline': framer-motion e componentes usam style inline.
// - fontes: next/font hospeda a Inter no proprio site ('self').
// - connect-src/form-action: so o proprio site e a API do Web3Forms.
// frame-ancestors nao funciona via <meta>; ver components/FrameGuard.tsx.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' https://api.web3forms.com${isDev ? " ws: wss:" : ""}`,
  "worker-src 'self' blob:",
  "media-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.web3forms.com",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

export const metadata: Metadata = {
  title: "Stabeli Studio — Sites & Apps Profissionais",
  description:
    "Transformamos suas ideias em sites e aplicativos que impressionam, convertem e escalam com seu negócio.",
  referrer: "strict-origin-when-cross-origin",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
      </head>
      <body>
        <FrameGuard />
        {children}
      </body>
    </html>
  );
}
