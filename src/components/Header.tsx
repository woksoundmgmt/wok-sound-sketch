import woksoundLogo from "@/assets/woksound-logo.png";

interface HeaderProps {
  onBookClick: () => void;
}

const Header = ({ onBookClick }: HeaderProps) => {
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

        <button
          onClick={onBookClick}
          className="btn-drawn px-5 py-2 font-heading text-sm tracking-wider"
        >
          ЗАПИСАТЬСЯ
        </button>
      </div>
    </header>
  );
};

export default Header;
