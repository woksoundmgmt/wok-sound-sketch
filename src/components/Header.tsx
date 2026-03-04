import { ShoppingCart } from "lucide-react";
import woksoundLogo from "@/assets/woksound-logo.png";
import { useCart } from "@/contexts/CartContext";

interface HeaderProps {
  onBookClick: () => void;
  onCartClick: () => void;
}

const Header = ({ onBookClick, onCartClick }: HeaderProps) => {
  const { items } = useCart();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <img
          src={woksoundLogo}
          alt="ВОК САУНД"
          className="h-12 w-auto cursor-pointer mix-blend-multiply dark:mix-blend-screen"
          style={{ background: "transparent" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />

        <nav className="hidden md:flex items-center gap-6 font-body text-sm font-bold uppercase tracking-wider">
          {[
            ["services", "УСЛУГИ"],
            ["staff", "СТАФФ"],
            ["prices", "ЦЕНЫ"],
            ["contacts", "КОНТАКТЫ"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="hover:opacity-60 transition-opacity"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onCartClick}
            className="relative w-10 h-10 rounded-full drawn-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
          >
            <ShoppingCart className="w-4 h-4" strokeWidth={2} />
            {items.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center border-2 border-background">
                {items.length}
              </span>
            )}
          </button>

          <button
            onClick={onBookClick}
            className="btn-drawn px-5 py-2 font-heading text-sm tracking-wider"
          >
            ЗАПИСАТЬСЯ
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
