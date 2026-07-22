import { MapPin, Phone, Mail, Share2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactForm from "@/components/sections/ContactForm";
import { contactInfo } from "@/lib/agents";

export const metadata = {
  title: "Contact Lavender Real Estate | Abu Dhabi Office",
  description:
    "Get in touch with Lavender Real Estate. Visit our office at Eldorado Tower, Electra Street, Abu Dhabi. Call +971 55 433 4369 or email Info@lavenderuae.com.",
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      <section className="bg-cream pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3">
              <SectionLabel text="Get In Touch" />
              <h1 className="mt-4 font-display text-[40px] font-light leading-[1.1] tracking-[-0.02em] text-plum md:text-[56px]">
                Talk to Our Experts.
              </h1>
              <p className="mt-5 max-w-[480px] font-body text-[15px] font-light leading-[1.7] text-text-body">
                Send us your requirements and we&apos;ll connect you with the
                right specialist within 24 hours.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  { icon: MapPin, text: contactInfo.address },
                  { icon: Phone, text: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, "")}` },
                  {
                    icon: Mail,
                    text: contactInfo.generalEmail,
                    href: `mailto:${contactInfo.generalEmail}`,
                  },
                ].map(({ icon: Icon, text, href }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream-border bg-gold-bg">
                      <Icon size={16} className="text-gold" />
                    </div>
                    {href ? (
                      <a
                        href={href}
                        className="pt-2 font-body text-[14px] text-text-body transition hover:text-plum"
                      >
                        {text}
                      </a>
                    ) : (
                      <p className="pt-2 font-body text-[14px] text-text-body">
                        {text}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <a
                href={contactInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-white transition hover:bg-green-700"
              >
                Chat on WhatsApp
              </a>

              <div className="mt-10 max-w-sm rounded-2xl border border-cream-border bg-white p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-plum to-plum-mid font-mono text-[14px] text-gold">
                    MA
                  </div>
                  <div>
                    <p className="font-display text-[18px] text-plum">
                      {contactInfo.name}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold">
                      {contactInfo.title}
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-text-muted">
                      License: {contactInfo.license}
                    </p>
                  </div>
                </div>
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted transition hover:text-gold"
                >
                  <Share2 size={14} />
                  LinkedIn Profile
                </a>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-cream-border bg-white p-8 md:p-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
