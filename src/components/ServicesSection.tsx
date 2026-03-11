import { Mic, SlidersHorizontal, Disc3, Globe } from "lucide-react";

const services = [
  {
    icon: Mic,
    title: "ЗАПИСЬ",
    description: "Чистый сигнал, ламповый преамп, уютная атмосфера. Пишем вокал, инструменты, подкасты — что угодно.",
    num: "01",
    priceAccordion: 0, // index in priceCategories
  },
  {
    icon: SlidersHorizontal,
    title: "СВЕДЕНИЕ",
    description: "Собираем хаос в трек. Баланс, панорама, эффекты — каждый звук на своем месте.",
    num: "02",
    priceAccordion: 2,
  },
  {
    icon: Disc3,
    title: "МАСТЕРИНГ",
    description: "Финальная полировка. Громко, чисто, мощно — готово для стриминга и винила.",
    num: "03",
    priceAccordion: 2,
  },
  {
    icon: Globe,
    title: "ДИСТРИБУЦИЯ",
    description: "Выкладываем на все площадки: Spotify, Apple Music, Яндекс Музыка. Один клик — весь мир.",
    num: "04",
    priceAccordion: 5,
  },
];

const ServicesSection = () => {
  const handleServiceClick = (accordionIndex: number) => {
    const pricesSection = document.getElementById("prices");
    if (pricesSection) {
      pricesSection.scrollIntoView({ behavior: "smooth" });
      // Wait for scroll, then open accordion
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("open-price-accordion", { detail: accordionIndex }));
      }, 600);
    }
  };

  return (
    <section id="services" className="py-20 md:py-32 border-t border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-baseline justify-between mb-16">
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl tracking-tight">
            УСЛУГИ
          </h2>
          <p className="label-text hidden md:block">
            ВСЁ, ЧТО НУЖНО ДЛЯ ТВОЕГО ТРЕКА
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {services.map((service) => (
            <div
              key={service.title}
              onClick={() => handleServiceClick(service.priceAccordion)}
              className="bg-background p-6 md:p-8 group hover:bg-foreground hover:text-background transition-colors duration-300 cursor-pointer"
            >
              <div className="flex items-baseline justify-between mb-8">
                <span className="label-text group-hover:text-background/50 transition-colors">{service.num}</span>
                <service.icon className="w-5 h-5 text-muted-foreground group-hover:text-background/70 transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-xl md:text-2xl mb-4 tracking-tight">{service.title}</h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground group-hover:text-background/60 transition-colors">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
