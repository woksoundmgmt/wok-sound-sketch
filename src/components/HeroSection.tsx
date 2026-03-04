import headCharacter from "@/assets/head-character.png";

interface HeroProps {
  onBookClick: () => void;
}

const HeroSection = ({ onBookClick }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background texture lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(0deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 6px)`,
      }} />

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Floating character */}
        <div className="flex justify-center mb-8">
          <img
            src={headCharacter}
            alt="WOK SOUND character"
            className="w-32 h-32 md:w-48 md:h-48 animate-float object-contain"
          />
        </div>

        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-6 tracking-tight">
          ДЕЛАЕМ ЗВУК,
          <br />
          <span className="relative inline-block">
            КОТОРЫЙ КАЧАЕТ
            <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 400 8" preserveAspectRatio="none">
              <path d="M0,4 Q50,0 100,4 Q150,8 200,4 Q250,0 300,4 Q350,8 400,4" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </span>
        </h1>

        <p className="font-mono text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed text-muted-foreground">
          Профессиональная студия для музыкантов, которые не боятся экспериментировать. 
          Запись, сведение, мастеринг — все, что нужно для трека, который добавят в плейлист.
        </p>

        <button
          onClick={onBookClick}
          className="group relative inline-block"
        >
          <span className="relative z-10 block bg-foreground text-background font-heading text-lg md:text-xl px-10 py-5 tracking-wider transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
            ЗАБРОНИРОВАТЬ ВРЕМЯ
          </span>
          <span className="absolute inset-0 translate-x-2 translate-y-2 border-3 border-foreground" />
        </button>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg width="100%" height="20" preserveAspectRatio="none" viewBox="0 0 1200 20">
          <path d="M0,10 Q30,0 60,10 Q90,20 120,10 Q150,0 180,10 Q210,20 240,10 Q270,0 300,10 Q330,20 360,10 Q390,0 420,10 Q450,20 480,10 Q510,0 540,10 Q570,20 600,10 Q630,0 660,10 Q690,20 720,10 Q750,0 780,10 Q810,20 840,10 Q870,0 900,10 Q930,20 960,10 Q990,0 1020,10 Q1050,20 1080,10 Q1110,0 1140,10 Q1170,20 1200,10" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
