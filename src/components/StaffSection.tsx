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
    <section id="staff" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-4xl md:text-6xl text-center mb-4">
          НАШ СТАФФ
        </h2>
        <p className="font-hand text-xl text-center text-muted-foreground mb-14">
          оборудование, на котором делаем магию
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <div key={cat.title} className="drawn-card p-6">
              <div className="w-12 h-12 rounded-full drawn-border flex items-center justify-center mb-4">
                <cat.icon className="w-5 h-5" strokeWidth={2} />
              </div>
              <h3 className="font-heading text-sm mb-3 tracking-wider">{cat.title}</h3>
              <ul className="space-y-1.5">
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
