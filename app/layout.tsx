import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildWebSiteSchema, buildOrganizationSchema } from "@/lib/schema/organization.schema";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Kalkulator Finansial Gratis untuk Indonesia`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={SITE.language} className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <JsonLd schema={[buildWebSiteSchema(), buildOrganizationSchema()]} />
        {children}
      </body>
    </html>
  );
}
