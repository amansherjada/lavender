import { Eye, Target, Building2, LineChart, Home, FileSearch } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import CTAStrip from "@/components/ui/CTAStrip";

export const metadata = {
  title: "About Lavender Real Estate | Property Experts in Abu Dhabi",
  description:
    "Lavender Real Estate is a distinguished property firm in Abu Dhabi, delivering comprehensive real estate solutions with integrity, efficiency, and professionalism since 2016.",
};

const stats = [
  { value: "25+", label: "Years Experience" },
  { value: "500+", label: "Properties" },
  { value: "1,200+", label: "Happy Clients" },
  { value: "4", label: "UAE Locations" },
];

const services = [
  {
    icon: Building2,
    title: "Sales / Leasing and Brokerage",
    description:
      "End-to-end brokerage for buying, selling, and leasing across Abu Dhabi.",
  },
  {
    icon: LineChart,
    title: "Investment Advisory",
    description:
      "Market insight and guidance to help you make confident investment decisions.",
  },
  {
    icon: FileSearch,
    title: "Mortgage Consultancy",
    description:
      "Expert support navigating financing options with trusted banking partners.",
  },
  {
    icon: Target,
    title: "Client Complaints Handling System",
    description:
      "A structured process to resolve concerns quickly and professionally.",
  },
  {
    icon: Home,
    title: "Property Management & Maintenance",
    description:
      "Full management and maintenance services that protect your asset value.",
  },
  {
    icon: Eye,
    title: "Valuation & Research / Renewal",
    description:
      "Accurate valuations, market research, and seamless lease renewals.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      <section className="bg-cream pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <SectionLabel text="Who We Are" />
              <h1 className="mt-4 font-display text-[40px] font-light leading-[1.1] tracking-[-0.02em] text-plum md:text-[56px]">
                A Premier Real Estate Firm in Abu Dhabi
              </h1>
              <p className="mt-6 font-body text-[15px] font-light leading-[1.8] text-text-body">
                Lavender Real Estate is a distinguished real estate firm based
                in Abu Dhabi, committed to delivering comprehensive property
                solutions with integrity, efficiency, and professionalism. We
                specialize in property management, brokerage, investment
                advisory, and consultancy services, tailored to meet the
                evolving needs of our clients. Our team of experienced
                professionals is dedicated to setting new benchmarks in service
                excellence. We combine in-depth market knowledge with a
                client-centric approach to ensure seamless and rewarding real
                estate experiences.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 self-center">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-cream-border bg-white p-6 md:p-8"
                >
                  <p className="font-mono text-[32px] text-plum md:text-[40px]">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-plum py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                <Eye size={20} className="text-gold" />
              </div>
              <h2 className="font-display text-[28px] font-light text-cream md:text-[32px]">
                Our Vision
              </h2>
              <p className="mt-4 font-body text-[15px] font-light leading-[1.8] text-[#B8A9C8]">
                To be the recognized leader in the property management industry
                in Abu Dhabi, known for maintaining the highest standards of
                service and professionalism.
              </p>
            </div>
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                <Target size={20} className="text-gold" />
              </div>
              <h2 className="font-display text-[28px] font-light text-cream md:text-[32px]">
                Our Mission
              </h2>
              <p className="mt-4 font-body text-[15px] font-light leading-[1.8] text-[#B8A9C8]">
                To establish Lavender Real Estate as a trusted name in the real
                estate sector and the first choice for property seekers. We aim
                to apply our expertise in property management to deliver
                outstanding service, ensure tenant satisfaction, and uphold
                excellence in property maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <SectionLabel text="What We Do" />
          <h2 className="mt-4 max-w-[640px] font-display text-[36px] font-light tracking-[-0.02em] text-plum md:text-[48px]">
            Delivering Excellence Across Real Estate Services
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="rounded-2xl border border-cream-border bg-white p-8"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream-border bg-gold-bg">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <h3 className="font-display text-[20px] text-plum">
                    {service.title}
                  </h3>
                  <p className="mt-3 font-body text-[14px] font-light leading-[1.7] text-text-body">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTAStrip
        title="Ready to find your perfect property?"
        buttons={[
          { label: "Browse Properties", href: "/buy", variant: "solid" },
          { label: "Contact Us", href: "/contact", variant: "outline" },
        ]}
      />

      <Footer />
    </main>
  );
}
