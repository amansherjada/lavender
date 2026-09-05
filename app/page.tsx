import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import BuyingSection from "@/components/sections/BuyingSection";
import LocationsSection from "@/components/sections/LocationsSection";
import WhyLavender from "@/components/sections/WhyLavender";
import RentingSection from "@/components/sections/RentingSection";
import HowItWorks from "@/components/sections/HowItWorks";
import InquiryForm from "@/components/sections/InquiryForm";
import Newsletter from "@/components/sections/Newsletter";
import { getSaleProperties, getRentProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [saleProperties, rentProperties] = await Promise.all([
    getSaleProperties(),
    getRentProperties(),
  ]);

  return (
    <main>
      <Navbar />
      <HeroSection />
      <BuyingSection properties={saleProperties.slice(0, 6)} />
      <LocationsSection />
      <WhyLavender />
      <RentingSection properties={rentProperties.slice(0, 6)} />
      <HowItWorks />
      <InquiryForm />
      <Newsletter />
      <Footer />
    </main>
  );
}
