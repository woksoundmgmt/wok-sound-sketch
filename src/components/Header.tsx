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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-14">
          <img
            src={woksoundLogo}
            alt="ВОК САУНД"
            className="h-7 w-auto cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />

          <nav className="hidden md:flex items-center gap-8">
            {[
              ["services", "УСЛУГИ"],
              ["staff", "СТАФФ"],
              ["prices", "ЦЕНЫ"],
              ["contacts", "КОНТАКТЫ"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="label-text hover:text-foreground transition-colors duration-200"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={onCartClick}
              className="relative w-8 h-8 flex items-center justify-center hover:opacity-60 transition-opacity"
            >
              <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-foreground text-background text-[9px] font-bold flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>

            <button
              onClick={onBookClick}
              className="btn-primary px-4 py-1.5 text-[10px] tracking-widest"
            >
              ЗАПИСАТЬСЯ
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
