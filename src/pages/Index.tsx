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
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        {/* Background gradient */}
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(230,20%,6%)] via-[hsl(240,15%,10%)] to-[hsl(220,18%,8%)]" />

          {/* Blobs */}
          <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-[hsl(250,80%,50%/0.12)] blur-[120px] blob-animate" />
          <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[hsl(170,70%,45%/0.1)] blur-[100px] blob-animate-reverse" />
          <div className="absolute bottom-[-5%] left-[20%] w-[400px] h-[400px] rounded-full bg-[hsl(250,60%,55%/0.08)] blur-[100px] blob-pulse" />
          <div className="absolute top-[60%] left-[50%] w-[300px] h-[300px] rounded-full bg-[hsl(40,80%,50%/0.06)] blur-[80px] blob-animate" />
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
