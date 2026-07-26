import { Phone, Mail, Share2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import CTAStrip from "@/components/ui/CTAStrip";
import { agents, contactInfo } from "@/lib/agents";

export const metadata = {
  title: "Our Property Agents | Lavender Real Estate Abu Dhabi",
  description:
    "Meet the experienced real estate agents at Lavender Real Estate Abu Dhabi. Specialist in sales, leasing, property management and investment advisory.",
};

export default function AgentsPage() {
  return (
    <main>
      <Navbar />

      <section className="bg-cream pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-[800px] px-6 text-center md:px-12">
          <SectionLabel text="Our Team" centered />
          <h1 className="mt-4 font-display text-[40px] font-light leading-[1.1] tracking-[-0.02em] text-plum md:text-[56px]">
            Meet Our Property Experts
          </h1>
          <p className="mx-auto mt-5 max-w-[520px] font-body text-[15px] font-light leading-[1.7] text-text-body">
            Our experienced agents are specialists in Abu Dhabi real estate —
            ready to guide you through every step of buying, selling, or
            renting.
          </p>
        </div>
      </section>

      <section className="bg-cream pb-20 md:pb-32">
        <div className="mx-auto max-w-[560px] px-6 md:px-12">
          {agents.map((agent) => (
            <div
              key={agent.slug}
              className="overflow-hidden rounded-2xl border border-cream-border bg-white"
            >
              <div className="flex h-56 items-center justify-center bg-gradient-to-br from-plum via-plum-mid to-plum-light">
                <span className="font-display text-[64px] font-light text-gold/80">
                  {agent.initials}
                </span>
              </div>

              <div className="p-8">
                <h2 className="font-display text-[22px] text-plum">
                  {agent.name}
                </h2>
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-gold">
                  {agent.title}
                </p>
                <p className="font-mono text-[10px] text-text-muted">
                  License: {agent.license}
                </p>

                <div className="my-5 h-px bg-cream-border" />

                <p className="line-clamp-4 font-body text-[14px] leading-[1.7] text-text-muted">
                  {agent.bio}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { label: "Experience", value: agent.experience },
                    { label: "Languages", value: agent.languages },
                    { label: "Service Area", value: agent.serviceArea },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted">
                        {stat.label}
                      </p>
                      <p className="mt-1 font-body text-[13px] text-plum">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="my-5 h-px bg-cream-border" />

                <div className="flex flex-col gap-3">
                  <a
                    href={`tel:${agent.mobile.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 font-body text-[14px] text-plum transition hover:text-gold"
                  >
                    <Phone size={16} className="text-gold" />
                    {agent.mobile}
                  </a>
                  <a
                    href={contactInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white transition hover:bg-green-700"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={agent.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-body text-[14px] text-plum transition hover:text-gold"
                  >
                    <Share2 size={16} className="text-gold" />
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="inline-flex items-center gap-2 font-body text-[14px] text-plum transition hover:text-gold"
                  >
                    <Mail size={16} className="text-gold" />
                    {agent.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTAStrip
        title="Are you a real estate agent? Join our team."
        buttons={[
          { label: "Get in Touch", href: "/contact", variant: "outline" },
        ]}
      />

      <Footer />
    </main>
  );
}
