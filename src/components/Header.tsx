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
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel" style={{ borderRadius: "0 0 20px 20px" }}>
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <img
          src={woksoundLogo}
          alt="ВОК САУНД"
          className="h-12 w-auto cursor-pointer brightness-0 invert opacity-90"
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
              className="text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onCartClick}
            className="relative w-10 h-10 rounded-full btn-glass-ghost flex items-center justify-center"
          >
            <ShoppingCart className="w-4 h-4" strokeWidth={2} />
            {items.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-[0_0_10px_hsl(var(--primary)/0.5)]">
                {items.length}
              </span>
            )}
          </button>

          <button
            onClick={onBookClick}
            className="btn-glass px-5 py-2 font-heading text-sm tracking-wider"
          >
            ЗАПИСАТЬСЯ
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
