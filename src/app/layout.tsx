import type { Metadata } from "next";
import "./globals.css";
import CursorTrail from "@/components/CursorTrail";

export const metadata: Metadata = {
  title: "Acqron — Purpose-Built Software for Real Estate, Law, and Accounting Firms",
  description: "Acqron builds custom internal tools, client portals, and workflow automation for real estate brokerages, law firms, and accounting practices. Based in Bacolod City, Philippines. Serving US and PH clients.",
  keywords: [
    "custom software development Philippines",
    "real estate software Philippines",
    "law firm software Philippines",
    "accounting software Philippines",
    "property management software",
    "custom internal tools",
    "workflow automation",
    "software for professional services firms",
    "Bacolod software developer",
    "Acqron",
  ],
  authors: [{ name: "Acqron", url: "https://acqron.com" }],
  openGraph: {
    title: "Acqron — Purpose-Built Software for Real Estate, Law, and Accounting Firms",
    description: "We build custom tools for real estate brokerages, law firms, and accounting practices. Working MVPs in 8 weeks. Based in Bacolod City, Philippines.",
    url: "https://acqron.com",
    siteName: "Acqron",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acqron — Purpose-Built Software for Real Estate, Law & Accounting Firms",
    description: "Custom internal tools and workflow automation for professional services firms. Based in Bacolod City, Philippines.",
  },
  metadataBase: new URL("https://acqron.com"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://acqron.com/#organization",
      "name": "Acqron",
      "url": "https://acqron.com",
      "email": "info@acqron.com",
      "description": "Acqron is a software development company based in Bacolod City, Philippines, specializing in custom internal tools, client portals, and workflow automation for real estate brokerages, law firms, and accounting practices.",
      "foundingLocation": {
        "@type": "Place",
        "name": "Bacolod City, Negros Occidental, Philippines",
      },
      "areaServed": ["Philippines", "United States"],
      "knowsAbout": [
        "Real estate software",
        "Law firm practice management",
        "Accounting software",
        "Workflow automation",
        "Custom internal tools",
        "Property management systems",
        "Client portal development",
      ],
      "founder": [
        {
          "@type": "Person",
          "name": "Ron Paragoso",
          "jobTitle": "Founder & CEO",
        },
        {
          "@type": "Person",
          "name": "Stalingrad Dollosa",
          "jobTitle": "Co-Founder & Software Engineer",
        },
      ],
      "sameAs": ["https://acqron.com"],
    },
    {
      "@type": "WebSite",
      "@id": "https://acqron.com/#website",
      "url": "https://acqron.com",
      "name": "Acqron",
      "publisher": { "@id": "https://acqron.com/#organization" },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What does Acqron build?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Acqron builds custom software for real estate brokerages, law firms, and accounting practices — including property management systems, practice management tools, client portals, workflow automation, dashboards, and marketing websites.",
          },
        },
        {
          "@type": "Question",
          "name": "How long does it take Acqron to build software?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Acqron delivers working MVPs in an average of 8 weeks from project kickoff. This is a fully functional product your team can use, not a prototype.",
          },
        },
        {
          "@type": "Question",
          "name": "Where is Acqron based?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Acqron is based in Bacolod City, Negros Occidental, Philippines. We serve both US and Philippine clients.",
          },
        },
        {
          "@type": "Question",
          "name": "Does Acqron work with US clients?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Acqron has built software for real estate, vacation rental, and property management companies across the United States, and is expanding to serve Philippine businesses in real estate, law, and accounting.",
          },
        },
        {
          "@type": "Question",
          "name": "What industries does Acqron serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Acqron primarily serves real estate brokerages, rental management firms, law firms, and accounting practices. We also work with general SMEs needing custom internal tools or marketing websites.",
          },
        },
      ],
    },
    {
      "@type": "ItemList",
      "name": "Acqron Services",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Service",
            "name": "Property & Rental Management Tools",
            "description": "Custom software for real estate brokerages and rental management firms — listing systems, tenant portals, lead tracking, and booking platforms.",
            "provider": { "@id": "https://acqron.com/#organization" },
          },
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Service",
            "name": "Law Firm Practice Software",
            "description": "Practice management systems, case tracking, client intake portals, document management, and billing tools built for law firms.",
            "provider": { "@id": "https://acqron.com/#organization" },
          },
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Service",
            "name": "Accounting & Finance Operations Software",
            "description": "Financial operations tools, reconciliation systems, client dashboards, and reporting software for accounting practices.",
            "provider": { "@id": "https://acqron.com/#organization" },
          },
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "Service",
            "name": "Workflow & Process Automation",
            "description": "Custom automation systems that eliminate manual work and connect your firm's tools, data, and team.",
            "provider": { "@id": "https://acqron.com/#organization" },
          },
        },
        {
          "@type": "ListItem",
          "position": 5,
          "item": {
            "@type": "Service",
            "name": "Dashboards, Reporting & Analytics",
            "description": "Real-time dashboards and reporting tools that give professional services firms visibility into their operations and performance.",
            "provider": { "@id": "https://acqron.com/#organization" },
          },
        },
        {
          "@type": "ListItem",
          "position": 6,
          "item": {
            "@type": "Service",
            "name": "Website & Landing Page Development",
            "description": "Marketing websites and landing pages for real estate, law, and accounting firms — built to convert and designed to last.",
            "provider": { "@id": "https://acqron.com/#organization" },
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
