import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PricesSection from "@/components/PricesSection";
import FooterSection from "@/components/FooterSection";
import BookingDrawer from "@/components/BookingDrawer";

const Index = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onBookClick={() => setDrawerOpen(true)} />
      <HeroSection onBookClick={() => setDrawerOpen(true)} />
      <ServicesSection />
      <PricesSection />
      <FooterSection />
      <BookingDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Index;
