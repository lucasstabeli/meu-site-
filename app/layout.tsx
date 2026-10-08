import type { Metadata } from "next";
import { Inter } from "next/font/google";
import FrameGuard from "@/components/FrameGuard";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

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

const SITE = "https://lucasstabeli.github.io";
const TITULO = "Stabeli Studio | Sites, apps e sistemas para pequenos negócios";
const DESCRICAO =
  "Sites, apps, sistemas e bancos de dados para barbearias, clínicas, restaurantes, lojas e academias. Preço inicial à vista e orçamento sem compromisso.";

// O basePath nao entra sozinho nas URLs de metadata: "/meu-site-" escrito a mao.
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: "/meu-site-/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Stabeli Studio",
    url: "/meu-site-/",
    title: TITULO,
    description: DESCRICAO,
    images: [
      {
        url: "/meu-site-/og.png",
        width: 1200,
        height: 630,
        alt: "Stabeli Studio: sites, apps e sistemas que fazem seu negócio funcionar sozinho",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  referrer: "strict-origin-when-cross-origin",
};

// Dados estruturados (JSON-LD nao executa; conteudo fixo, sem entrada do usuario).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Stabeli Studio",
  description: DESCRICAO,
  url: `${SITE}/meu-site-/`,
  email: "stabeli.studio@gmail.com",
  sameAs: ["https://www.instagram.com/stabelistudio/"],
  areaServed: "BR",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <FrameGuard />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
