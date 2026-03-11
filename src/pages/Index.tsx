import { useState, useEffect, useRef, useCallback } from "react";
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

  // Scroll reveal observer
  const observerRef = useRef<IntersectionObserver | null>(null);
  const setupObserver = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    node.querySelectorAll(".scroll-reveal").forEach((el) => {
      observerRef.current!.observe(el);
    });
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
      <div className="min-h-screen bg-background text-foreground" ref={setupObserver}>
        <Header onBookClick={openContact} onCartClick={openCart} />
        <HeroSection onBookClick={openContact} />
        <div className="scroll-reveal"><ServicesSection /></div>
        <div className="scroll-reveal"><StaffSection /></div>
        <div className="scroll-reveal"><PricesSection /></div>
        <div className="scroll-reveal"><FooterSection /></div>
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
