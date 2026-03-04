import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StaffSection from "@/components/StaffSection";
import PricesSection from "@/components/PricesSection";
import FooterSection from "@/components/FooterSection";
import BookingDrawer from "@/components/BookingDrawer";
import woksoundLogo from "@/assets/woksound-logo.png";

const Index = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background watermark logo */}
      <div
        className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center"
        aria-hidden="true"
      >
        <img
          src={woksoundLogo}
          alt=""
          className="w-[60vw] max-w-[700px] opacity-[0.04]"
        />
      </div>

      <div className="relative z-10">
        <Header onBookClick={() => setDrawerOpen(true)} />
        <HeroSection onBookClick={() => setDrawerOpen(true)} />
        <ServicesSection />
        <StaffSection />
        <PricesSection />
        <FooterSection />
        <BookingDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
    </div>
  );
};

export default Index;
