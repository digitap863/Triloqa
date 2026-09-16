import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat_Alternates } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AosInit } from "@/components/AosInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const montserratAlternates = Montserrat_Alternates({
  variable: "--font-montserrat-alternates",
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.triloqaenergy.com"),
  title: "Triloqa",
  description: "Triloqa",
  verification: {
    google: "krEJUK030Rrgf3_xNMwi7oBMuXMUHEpI7NJs78uPI38",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M7GXLCCG');`,
          }}
        />
        <meta
          name="google-site-verification"
          content="krEJUK030Rrgf3_xNMwi7oBMuXMUHEpI7NJs78uPI38"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserratAlternates.variable} antialiased overflow-x-hidden`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M7GXLCCG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <AosInit />
        {children}
      </body>
    </html>
  );
}
