import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoldButton from "@/components/ui/GoldButton";

export const metadata = {
  title: "Page Not Found | Lavender Real Estate",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main>
      <Navbar />
      <section className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-6 pt-32 text-center md:pt-40">
        <span className="font-mono text-[13px] uppercase tracking-[0.3em] text-gold">
          404
        </span>
        <h1 className="mt-4 font-display text-[40px] font-light leading-[1.1] tracking-[-0.02em] text-plum md:text-[56px]">
          Page Not Found
        </h1>
        <p className="mx-auto mt-5 max-w-[440px] font-body text-[15px] font-light leading-[1.7] text-text-body">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-10">
          <GoldButton label="Back to Homepage" href="/" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
