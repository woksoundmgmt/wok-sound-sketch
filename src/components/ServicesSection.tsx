import { Mic, SlidersHorizontal, Disc3, Globe } from "lucide-react";

const services = [
  {
    icon: Mic,
    title: "ЗАПИСЬ",
    description: "Чистый сигнал, ламповый преамп, уютная атмосфера. Пишем вокал, инструменты, подкасты — что угодно.",
  },
  {
    icon: SlidersHorizontal,
    title: "СВЕДЕНИЕ",
    description: "Собираем хаос в трек. Баланс, панорама, эффекты — каждый звук на своем месте.",
  },
  {
    icon: Disc3,
    title: "МАСТЕРИНГ",
    description: "Финальная полировка. Громко, чисто, мощно — готово для стриминга и винила.",
  },
  {
    icon: Globe,
    title: "ДИСТРИБУЦИЯ",
    description: "Выкладываем на все площадки: Spotify, Apple Music, Яндекс Музыка. Один клик — весь мир.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-4xl md:text-6xl text-center mb-16 relative inline-block w-full">
          <span className="relative">
            УСЛУГИ
            <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32" height="6" viewBox="0 0 120 6">
              <path d="M0,3 Q20,0 40,3 Q60,6 80,3 Q100,0 120,3" fill="none" stroke="currentColor" strokeWidth="2.5" />
            </svg>
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="sketch-card p-6 group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Icon in sketchy circle */}
              <div className="w-16 h-16 rounded-full sketch-border-thin flex items-center justify-center mb-4 group-hover:bg-foreground group-hover:text-background transition-colors">
                <service.icon className="w-7 h-7" strokeWidth={2.5} />
              </div>

              <h3 className="font-heading text-xl mb-3">{service.title}</h3>
              <p className="font-mono text-xs leading-relaxed text-muted-foreground">
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
