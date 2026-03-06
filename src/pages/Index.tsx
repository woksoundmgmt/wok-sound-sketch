import { useState, useEffect } from "react";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StaffSection from "@/components/StaffSection";
import PricesSection from "@/components/PricesSection";
import FooterSection from "@/components/FooterSection";
import BookingDrawer from "@/components/BookingDrawer";

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
      <div className="min-h-screen bg-background text-foreground">
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
    </CartProvider>
  );
};

export default Index;
