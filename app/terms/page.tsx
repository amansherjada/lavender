import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata = {
  title: "Terms and Conditions | Lavender Real Estate",
  description:
    "Terms and conditions for using the Lavender Real Estate website and services in Abu Dhabi, UAE.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By visiting our website or using any of our services, you accept these Terms and Conditions and agree to comply with all applicable laws and regulations.",
  },
  {
    title: "2. Services Offered",
    body: "Lavender Real Estate provides property management, leasing, brokerage, investment advisory, mortgage consultancy, and other real estate services. All services are subject to availability and may be modified or discontinued at our discretion.",
  },
  {
    title: "3. Use of the Website",
    body: "You agree to use our website for lawful purposes only. You may not use it to post or transmit any unlawful, threatening, or defamatory material; violate any local, national, or international law or regulation; or attempt to gain unauthorized access to any portion of the website or its systems.",
  },
  {
    title: "4. Intellectual Property Rights",
    body: "All content on the website, including text, images, logos, and design, is the property of Lavender Real Estate and is protected by copyright and trademark laws. You may not copy, reproduce, or distribute any content without our written permission.",
  },
  {
    title: "5. Property Listings",
    body: "While we strive to ensure the accuracy of property listings and related information, Lavender Real Estate does not warrant the completeness or accuracy of any listings and is not liable for any discrepancies. All listings are subject to availability and may change without notice.",
  },
  {
    title: "6. Limitation of Liability",
    body: "Lavender Real Estate shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use of our website or services.",
  },
  {
    title: "7. Third-Party Links",
    body: "Our website may contain links to third-party websites. We are not responsible for the content or practices of these websites and recommend reviewing their own terms and privacy policies.",
  },
  {
    title: "8. Privacy Policy",
    body: "Please refer to our Privacy Policy to understand how we collect, use, and protect your personal information.",
  },
  {
    title: "9. Changes to the Terms",
    body: "We reserve the right to update or modify these Terms and Conditions at any time. Changes will be posted on this page with the updated effective date. Continued use of the website constitutes your acceptance of the revised terms.",
  },
  {
    title: "10. Governing Law",
    body: "These Terms and Conditions are governed by the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the courts in Abu Dhabi.",
  },
];

export default function TermsPage() {
  return (
    <main>
      <Navbar />

      <section className="bg-cream pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-[800px] px-6 text-center md:px-12">
          <SectionLabel text="Legal" centered />
          <h1 className="mt-4 font-display text-[40px] font-light leading-[1.1] tracking-[-0.02em] text-plum md:text-[56px]">
            Terms and Conditions
          </h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
            Effective Date: 11 May 2025
          </p>
        </div>
      </section>

      <section className="bg-cream pb-20 md:pb-32">
        <div className="mx-auto max-w-[760px] px-6 md:px-12">
          <p className="font-body text-[15px] font-light leading-[1.8] text-text-body">
            Welcome to Lavender Real Estate. By accessing or using our website
            and services, you agree to be bound by the following terms and
            conditions. Please read them carefully.
          </p>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <div key={section.title} className="border-t border-cream-border pt-8">
                <h2 className="font-display text-[22px] text-plum">
                  {section.title}
                </h2>
                <p className="mt-3 font-body text-[15px] font-light leading-[1.8] text-text-body">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-cream-border pt-8">
            <p className="font-body text-[15px] font-light leading-[1.8] text-text-body">
              If you have any questions regarding these terms, please contact
              us at:
            </p>
            <p className="mt-4 font-body text-[15px] leading-[1.8] text-plum">
              Lavender Real Estate
              <br />
              Office No. 222, Eldorado Tower Block A, Electra Street, Abu
              Dhabi – UAE
              <br />
              Info@lavenderuae.com
              <br />
              +971 55 433 4369
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
