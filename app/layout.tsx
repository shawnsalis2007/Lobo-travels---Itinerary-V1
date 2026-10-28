import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css'; // Global styles

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Lobo's Travel Wizard — Professional Itinerary Builder & Tour Operations",
  description: "Enterprise travel operations portal for Lobo's Travel Wizard: build high-converting client itineraries, manage hotels and fleet, and generate instant travel vouchers.",
  openGraph: {
    title: "Lobo's Travel Wizard — Professional Itinerary Builder",
    description: "Enterprise travel operations portal for Lobo's Travel Wizard.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lobo's Travel Wizard — Professional Itinerary Builder",
    description: "Enterprise travel operations portal for Lobo's Travel Wizard.",
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {/* Google Identity Services — required for Google Calendar OAuth */}
        <Script src="https://accounts.google.com/gsi/client" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
