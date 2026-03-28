// For adding custom fonts with other frameworks, see:
// https://tailwindcss.com/docs/font-family
import type { Metadata } from "next";
import { Antic } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { GoogleTagManager } from "@next/third-parties/google";
import info from "@/data/info.json";
import { CANONICAL_SITE } from "@/lib/site";

const fontSans = Antic({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

const metaTitleDefault = `${info.name} | Software Engineer`;
const metaTitleTemplate = `%s | ${info.name}`;

const metaDescription =
  info.summary.length > 158
    ? `${info.summary.slice(0, 155).trim()}…`
    : info.summary;

const ogTitle = `${info.name} — ${info.designation} @ ${info.company}`;

const keywords = [
  "Supratik Chakraborty",
  "software engineer",
  "full-stack developer",
  "TypeScript",
  "React",
  "Next.js",
  "enterprise SaaS",
  "multi-tenant",
  "RBAC",
  "Trumio",
  "AI",
  "MongoDB",
  "PostgreSQL",
  "GCP",
  "Azure",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: info.name,
  jobTitle: `${info.designation} @ ${info.company}`,
  url: CANONICAL_SITE,
  image: `${CANONICAL_SITE}/profile.png`,
  email: info.email,
  sameAs: [info.linkedin, info.github].filter(Boolean),
  description: info.summary,
  worksFor: {
    "@type": "Organization",
    name: info.company,
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_SITE),
  title: {
    default: metaTitleDefault,
    template: metaTitleTemplate,
  },
  description: metaDescription,
  keywords,
  authors: [{ name: info.name, url: CANONICAL_SITE }],
  creator: info.name,
  publisher: info.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: ogTitle,
    description: info.summary,
    url: CANONICAL_SITE,
    siteName: info.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: metaDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: CANONICAL_SITE,
  },
  icons: {
    icon: [{ url: "/profile.png", type: "image/png" }],
    apple: [{ url: "/profile.png", type: "image/png" }],
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG ?? ""} />
      <body className={`${fontSans.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
