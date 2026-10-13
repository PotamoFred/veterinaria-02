import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import UrgentButton from "@/components/UrgentButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Canonical URL. Override it with NEXT_PUBLIC_SITE_URL once there is a real
// domain; the literal below is the placeholder. It is not cosmetic:
// metadataBase drives the canonical link, og:url and every relative URL that
// Next resolves, so a wrong value here is wrong everywhere.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bienestaranimal.vercel.app";

// GitHub Pages serves from a subdirectory, so every asset URL has to carry the
// repository name. Empty on a normal host; the Pages workflow sets it.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const TITLE = "Bienestar Animal | Clínica Veterinaria";
const DESCRIPTION =
  "Clínica veterinaria en Ibagué, Tolima. Brindamos cuidado y salud integral a tus mascotas con un equipo profesional y un trato lleno de amor.";

// Inline SVG mark so the tab icon matches the brand instead of the Next default.
const ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%231B004B'/%3E%3Cpath d='M16 26s-8-5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0124 15c0 6-8 11-8 11z' fill='%23FFDDC1'/%3E%3C/svg%3E";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Bienestar Animal",
  },
  description: DESCRIPTION,
  applicationName: "Bienestar Animal",
  // Without this there is no <link rel="canonical"> at all, and the og:url has
  // nowhere to agree with.
  alternates: { canonical: `${SITE_URL}${BASE_PATH}/` },
  keywords: [
    "clínica veterinaria",
    "veterinario Ibagué",
    "veterinaria Tolima",
    "consulta veterinaria",
    "cirugía veterinaria",
    "vacunación mascotas",
    "hospitalización veterinaria",
  ],
  icons: {
    icon: [{ url: ICON, type: "image/svg+xml" }],
    apple: [{ url: ICON }],
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    // The bare domain on Pages, where the site lives under /<repo>/. The
    // canonical link carries the subdirectory; og:url has to agree with it or
    // the two contradict each other.
    url: `${SITE_URL}${BASE_PATH}/`,
    siteName: "Bienestar Animal",
    title: TITLE,
    description: DESCRIPTION,
    // Without this the card is a "large image" with no image: WhatsApp and
    // LinkedIn render an empty grey rectangle.
    images: [
      {
        url: `${SITE_URL}${BASE_PATH}/og.png`,
        width: 1200,
        height: 630,
        alt: "Bienestar Animal, clínica veterinaria en Ibagué, Tolima",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}${BASE_PATH}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#inicio"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-[#1B004B] focus:text-white focus:px-4 focus:py-2 focus:rounded-full"
        >
          Saltar al contenido
        </a>
        <Header />
        {children}
        <UrgentButton />
      </body>
    </html>
  );
}