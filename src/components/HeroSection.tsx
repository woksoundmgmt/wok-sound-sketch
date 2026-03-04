import headCharacter from "@/assets/head-character.png";

interface HeroProps {
  onBookClick: () => void;
}

const HeroSection = ({ onBookClick }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Character */}
        <div className="flex justify-center mb-8">
          <img
            src={headCharacter}
            alt="WOK SOUND character"
            className="w-36 h-36 md:w-52 md:h-52 object-contain"
          />
        </div>

        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-6 tracking-tight">
          ДЕЛАЕМ ЗВУК,
          <br />
          КОТОРЫЙ КАЧАЕТ
        </h1>

        <p className="font-hand text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed text-muted-foreground">
          Профессиональная студия для музыкантов, которые не боятся экспериментировать. 
          Запись, сведение, мастеринг — все, что нужно для трека, который добавят в плейлист.
        </p>

        <button
          onClick={onBookClick}
          className="btn-drawn font-heading text-lg md:text-xl px-10 py-5 tracking-wider"
        >
          ЗАБРОНИРОВАТЬ ВРЕМЯ
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
