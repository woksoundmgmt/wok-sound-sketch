import { Monitor, AudioLines, Speaker, Mic, Headphones, Guitar } from "lucide-react";

const categories = [
  {
    icon: Monitor,
    title: "РАБОЧАЯ СТАНЦИЯ",
    items: ["MacBook Pro M1 14-inch"],
  },
  {
    icon: AudioLines,
    title: "ЗВУКОВЫЕ КАРТЫ",
    items: ["Solid State Logic (SSL) 2+", "Focusrite Scarlett 2i2"],
  },
  {
    icon: Speaker,
    title: "СТУДИЙНЫЕ МОНИТОРЫ",
    items: ["ADAM T5V"],
  },
  {
    icon: Mic,
    title: "МИКРОФОНЫ",
    items: ["Rode K2", "sE Electronics X1 S", "Audio-Technica AT2020"],
  },
  {
    icon: Headphones,
    title: "НАУШНИКИ",
    items: [
      "Beyerdynamic DT 990 Pro (250 Ohm)",
      "Audio-Technica ATH-M40x",
      "Audio-Technica ATH-M20x",
    ],
  },
  {
    icon: Guitar,
    title: "ИНСТРУМЕНТЫ",
    items: ["Электрогитара Jet JS400"],
  },
];

const StaffSection = () => {
  return (
    <section id="staff" className="py-20 md:py-32 border-t border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-baseline justify-between mb-16">
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl tracking-tight">
            НАШ СТАФФ
          </h2>
          <p className="label-text hidden md:block">
            ОБОРУДОВАНИЕ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border max-w-5xl">
          {categories.map((cat) => (
            <div key={cat.title} className="bg-background p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <cat.icon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <h3 className="label-text text-foreground">{cat.title}</h3>
              </div>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground font-body">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaffSection;
