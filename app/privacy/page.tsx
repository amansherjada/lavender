import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata = {
  title: "Privacy Policy | Lavender Real Estate",
  description:
    "How Lavender Real Estate collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "1. Information We Collect",
    body: "When you submit an inquiry, contact form, or property enquiry on this website, we collect the information you provide directly — such as your name, email address, phone number, and details about the property or service you're interested in. We also automatically collect limited technical information (such as pages visited and general location) through analytics tools to help us understand how our website is used.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use the information you provide to respond to your inquiry, connect you with the right agent, follow up regarding properties or services you've shown interest in, and improve our website and services. We do not sell your personal information to third parties.",
  },
  {
    title: "3. How We Share Your Information",
    body: "Information submitted through our forms is routed to our internal lead-management systems (including secure workflow and spreadsheet tools) so our team can respond to you. We may share your information with trusted service providers who help us operate our website and manage leads, and only to the extent necessary for them to perform those services on our behalf.",
  },
  {
    title: "4. Cookies and Analytics",
    body: "We may use cookies and analytics tools (such as Google Analytics) to understand how visitors use our website and to improve the experience. You can control or disable cookies through your browser settings, though this may affect some website functionality.",
  },
  {
    title: "5. Data Retention",
    body: "We retain personal information for as long as necessary to respond to your inquiry, maintain our business records, and comply with legal obligations under UAE law.",
  },
  {
    title: "6. Data Security",
    body: "We take reasonable technical and organizational measures to protect your personal information from unauthorized access, disclosure, or misuse. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "7. Your Rights",
    body: "You may request access to, correction of, or deletion of the personal information we hold about you by contacting us using the details below. We will respond to reasonable requests in accordance with applicable UAE data protection law.",
  },
  {
    title: "8. Third-Party Links",
    body: "Our website may contain links to third-party websites, including property portals and social media. We are not responsible for the privacy practices of those third parties and encourage you to review their privacy policies separately.",
  },
  {
    title: "9. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Continued use of our website after changes are posted constitutes acceptance of the revised policy.",
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <Navbar />

      <section className="bg-cream pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-[800px] px-6 text-center md:px-12">
          <SectionLabel text="Legal" centered />
          <h1 className="mt-4 font-display text-[40px] font-light leading-[1.1] tracking-[-0.02em] text-plum md:text-[56px]">
            Privacy Policy
          </h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
            Effective Date: 26 July 2026
          </p>
        </div>
      </section>

      <section className="bg-cream pb-20 md:pb-32">
        <div className="mx-auto max-w-[760px] px-6 md:px-12">
          <p className="font-body text-[15px] font-light leading-[1.8] text-text-body">
            Lavender Real Estate (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;our&rdquo;) respects your privacy.
            This Privacy Policy explains how we collect, use, and protect
            personal information when you visit lavenderuae.com or use our
            services.
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
              If you have any questions about this Privacy Policy or wish to
              exercise your rights over your data, please contact us at:
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
