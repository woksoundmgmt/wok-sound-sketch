import studioPhoto from "@/assets/studio-photo.jpg";

interface HeroProps {
  onBookClick: () => void;
}

const HeroSection = ({ onBookClick }: HeroProps) => {
  return (
    <section className="min-h-screen pt-14">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-56px)]">
        {/* Left — Photo */}
        <div className="relative bg-foreground overflow-hidden min-h-[50vh] md:min-h-full">
          <img
            src={studioPhoto}
            alt="WOK SOUND Studio"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          {/* Small labels on top of image */}
          <div className="absolute top-6 left-6 md:top-10 md:left-10">
            <p className="text-[9px] font-heading font-bold tracking-[0.2em] text-white/60 uppercase">
              СТУДИЯ:
              <br />
              <span className="text-white/90">ВОК САУНД</span>
            </p>
          </div>
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 max-w-[200px]">
            <p className="text-[9px] font-heading font-bold tracking-[0.15em] text-white/70 uppercase leading-relaxed">
              ЗАПИСЬ. СВЕДЕНИЕ.
              <br />
              МАСТЕРИНГ. ДИСТРИБУЦИЯ.
            </p>
          </div>
        </div>

        {/* Right — Text content */}
        <div className="flex flex-col justify-between p-8 md:p-12 lg:p-16 bg-background">
          {/* Top labels */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <p className="label-text mb-1">ЛОКАЦИЯ:</p>
              <p className="font-heading text-[10px] tracking-wider">
                САРАТОВ, РОССИЯ
              </p>
            </div>
            <div className="text-right">
              <p className="label-text mb-1">ГРАФИК:</p>
              <p className="font-heading text-[10px] tracking-wider">
                10:00 — 22:00
                <br />
                ЕЖД.
              </p>
            </div>
          </div>

          {/* Main headline */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tight mb-8">
              ДЕЛАЕМ
              <br />
              ЗВУК,
              <br />
              КОТОРЫЙ
              <br />
              КАЧАЕТ.
            </h1>

            <p className="font-body text-sm md:text-base text-muted-foreground max-w-md leading-relaxed mb-10">
              Профессиональная студия для музыкантов, которые не боятся
              экспериментировать. Запись, сведение, мастеринг — все, что нужно
              для трека, который добавят в плейлист.
            </p>

            <div>
              <button
                onClick={onBookClick}
                className="btn-primary text-xs px-8 py-4 tracking-widest"
              >
                ЗАБРОНИРОВАТЬ ВРЕМЯ
              </button>
            </div>
          </div>

          {/* Bottom attribution */}
          <div className="mt-12 pt-6 border-t border-border">
            <p className="label-text">
              © {new Date().getFullYear()} ВОК САУНД
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
