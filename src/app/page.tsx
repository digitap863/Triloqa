import type { Metadata } from "next";
import AboutSolarSection from "@/components/home/AboutSolarSection";
import BrandShowcase from "@/components/home/BrandShowcase";
import FaqSection from "@/components/home/FaqSection";
import HeroSection from "@/components/home/HeroSection";
import LatestBlog from "@/components/home/LatestBlog";
import ServicesOffer from "@/components/home/ServicesOffer";
import TestimonialSection from "@/components/home/TestimonialSection";
import Footer from "@/components/nav/Footer";
import Navbar from "@/components/nav/Navbar";

export const metadata: Metadata = {
  title: "Triloqa Energy | Best Solar Company in Kochi,Kerala",
  description:
    "Triloqa Energy is the Best Solar Company in Kochi, Kerala. Tier 1 panels, expert installers &  30-year warranty.Best Solar panel installation company in Kochi",
  keywords: [
    "best solar company",
    "best solar panel companies near me",
    "best solar installers near me",
    "solar company kochi",
    "solar installation kerala",
  ],
  alternates: {
    canonical: "https://www.triloqaenergy.com/",
    languages: {
      "en-in": "https://www.triloqaenergy.com/",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "Triloqa Energy",
    url: "https://www.triloqaenergy.com/",
    locale: "en_IN",
    title: "Triloqa Energy | Best Solar Company in Kerala",
    description:
      "Cut your electricity bill with Tier 1 solar panels, expert installers and a 30-year warranty. Trusted by 150+ homes and businesses across Kochi, Kerala. Get your free quote today!",
    images: [
      {
        url: "https://res.cloudinary.com/diwzinh9h/image/upload/v173491101/Triloqa/Services/pgkadnew9jllufvl1hcr.jpg",
        width: 1200,
        height: 630,
        alt: "Triloqa Energy solar panel installation on a home rooftop in Kochi, Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Looking for a Solar Company in Kochi? Meet Triloqa Energy",
    description:
      "Tier 1 panels, expert installers and a 30-year warranty. Lower your power bill with the best solar panel installation in Kochi, Kerala. Free quote!",
    images: [
      "https://res.cloudinary.com/diwzinh9h/image/upload/v173491101/Triloqa/Services/pgkadnew9jllufvl1hcr.jpg",
    ],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Triloqa Energy",
  alternateName: "Triloqa Green Energy Solutions",
  url: "https://www.triloqaenergy.com/",
  logo: "https://www.triloqaenergy.com/logo1.png",
  email: "triloqasales@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Second Floor, Lotus City Centre, Statue Junction, FACT Nagar, Thrippunithura",
    addressLocality: "Kochi",
    addressRegion: "Kerala",
    postalCode: "682301",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-92078-56999",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Malayalam"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-73063-77934",
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English", "Malayalam"],
    },
  ],
  sameAs: [
    "https://www.facebook.com/people/Triloqa-Green-Energy-Solutions/61569413255958/",
    "https://www.instagram.com/triloqa.solar",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Triloqa Energy",
  image: "https://www.triloqaenergy.com/logo1.png",
  "@id": "https://www.triloqaenergy.com/#localbusiness",
  url: "https://www.triloqaenergy.com/",
  telephone: "+91 92078 56999",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Second Floor, Lotus City Centre, Statue Junction, FACT Nagar, Thrippunithura, Kochi, Ernakulam, Kerala",
    addressLocality: "Kochi",
    postalCode: "682301",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 9.9440384,
    longitude: 76.34450749999999,
  },
  sameAs: [
    "https://www.facebook.com/people/Triloqa-Green-Energy-Solutions/61569413255958/?mibextid=wwXIfr&rdid=8pldyn1Fk1AAxjUk&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DnK24p4cv%2F%3Fmibextid%3DwwXIfr",
    "https://www.instagram.com/triloqa.solar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Triloqa Energy",
  alternateName: "Triloqa Green Energy Solutions",
  url: "https://www.triloqaenergy.com/",
  inLanguage: "en-IN",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which is the best solar company in Kochi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best solar company for you is a local installer you can reach after the sale. Check that they use branded panels, show you past projects, handle KSEB paperwork, and provide warranty terms in writing. Triloqa Energy in Thrippunithura, Kochi, provides these services. Visit, call, or ask for references before making your decision.",
      },
    },
    {
      "@type": "Question",
      name: "Who are the best solar installers near me in Kochi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Look for a local solar installer that uses Tier 1 panels, handles KSEB paperwork, and provides after-installation support. Triloqa Energy, based in Thrippunithura, Kochi, provides these services. Call +91 92078 56999 to enquire about a site visit.",
      },
    },
    {
      "@type": "Question",
      name: "Do you install solar in Ernakulam and other parts of Kerala?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Triloqa Energy is based in Kochi and provides solar installation services for homes, businesses, and industries across Ernakulam and other parts of Kerala. Contact us with your location to confirm service availability.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a solar subsidy for homes in Kochi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eligible homes in Kerala can receive benefits under the central PM Surya Ghar scheme. The subsidy can be up to ₹30,000 for 1 kW, ₹60,000 for 2 kW, and ₹78,000 for 3 kW and above, subject to the current scheme rules. Check the official PM Surya Ghar portal for the latest eligibility requirements and subsidy amounts.",
      },
    },
    {
      "@type": "Question",
      name: "Which panels and inverters does Triloqa use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Triloqa Energy uses Tier 1 solar panels with a 30-year performance warranty and premium inverters carrying warranties of up to 10 years. Installations are carried out following applicable international standards.",
      },
    },
    {
      "@type": "Question",
      name: "Will Triloqa help me apply for the subsidy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Triloqa Energy guides customers through the registration process and required documentation for the solar subsidy. Customers should complete the required application process before installation, as eligibility can depend on the scheme's applicable rules.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a government subsidy for rooftop solar in Kerala?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eligible residential consumers in Kerala can receive financial assistance under the PM Surya Ghar scheme. The stated subsidy is up to ₹30,000 for 1 kW, ₹60,000 for 2 kW, and ₹78,000 for 3 kW and above, subject to current government rules. Check the official PM Surya Ghar portal for the latest information.",
      },
    },
    {
      "@type": "Question",
      name: "Which solar panel brand is best?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rather than choosing a solar panel based only on brand name, consider factors such as product quality, warranty coverage, performance warranty, efficiency, and manufacturer support. Triloqa Energy uses Tier 1 solar panels with a 30-year performance warranty. Customers should review the panel datasheet and warranty documentation before purchasing.",
      },
    },
    {
      "@type": "Question",
      name: "How many ACs can a 3 kW solar system run?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 3 kW solar system can typically support one 1.5-ton inverter AC during suitable daytime conditions and may support additional loads depending on overall electricity consumption. The actual capacity depends on AC efficiency, usage patterns, sunlight, and other appliances operating at the same time.",
      },
    },
    {
      "@type": "Question",
      name: "Can a 3 kW solar system run 2 ACs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 3 kW solar system may run two inverter ACs during the daytime under suitable conditions, but the available solar power also needs to support other appliances. A larger 4 kW or 5 kW system may be more suitable when two ACs are used for longer periods or when overall electricity consumption is higher.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <HeroSection />
      <AboutSolarSection />
      <ServicesOffer />
      <FaqSection />
      <LatestBlog />
      <BrandShowcase />
      <TestimonialSection />
      <Footer />
    </>
  );
}

