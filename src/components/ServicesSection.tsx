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
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-4xl md:text-6xl text-center mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          УСЛУГИ
        </h2>
        <p className="font-hand text-xl text-center text-muted-foreground mb-14 lowercase">
          всё, что нужно для твоего трека
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.title} className="glass-card p-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-primary/10 border border-primary/20">
                <service.icon className="w-6 h-6 text-primary" strokeWidth={2} />
              </div>
              <h3 className="font-heading text-xl mb-3">{service.title}</h3>
              <p className="font-hand text-lg leading-relaxed text-muted-foreground">
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
