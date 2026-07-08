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

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <BuyingSection />
      <LocationsSection />
      <WhyLavender />
      <RentingSection />
      <HowItWorks />
      <InquiryForm />
      <Newsletter />
      <Footer />
    </main>
  );
}
