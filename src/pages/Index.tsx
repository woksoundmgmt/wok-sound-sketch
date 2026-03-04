import { useState, useEffect } from "react";
import { CartProvider } from "@/contexts/CartContext";
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
  const [drawerTab, setDrawerTab] = useState<"contact" | "cart">("contact");

  useEffect(() => {
    const handler = () => {
      setDrawerTab("cart");
      setDrawerOpen(true);
    };
    window.addEventListener("open-cart", handler);
    return () => window.removeEventListener("open-cart", handler);
  }, []);

  const openContact = () => {
    setDrawerTab("contact");
    setDrawerOpen(true);
  };

  const openCart = () => {
    setDrawerTab("cart");
    setDrawerOpen(true);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground relative">
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
          <Header onBookClick={openContact} onCartClick={openCart} />
          <HeroSection onBookClick={openContact} />
          <ServicesSection />
          <StaffSection />
          <PricesSection />
          <FooterSection />
          <BookingDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            initialTab={drawerTab}
          />
        </div>
      </div>
    </CartProvider>
  );
};

export default Index;
