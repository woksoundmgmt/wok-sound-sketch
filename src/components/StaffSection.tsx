import { useState } from "react";
import { Monitor, AudioLines, Speaker, Mic, Headphones, Guitar } from "lucide-react";
import staffMicrophone from "@/assets/staff-microphone.jpg";
import staffHeadphones from "@/assets/staff-headphones.jpg";
import staffGuitar from "@/assets/staff-guitar.jpg";
import staffMonitors from "@/assets/staff-monitors.jpg";
import staffSoundcard from "@/assets/staff-soundcard.jpg";

const categories = [
  {
    icon: Monitor,
    title: "РАБОЧАЯ СТАНЦИЯ",
    items: ["MacBook Pro M1 14-inch"],
    image: null as string | null,
  },
  {
    icon: AudioLines,
    title: "ЗВУКОВЫЕ КАРТЫ",
    items: ["Solid State Logic (SSL) 2+", "Focusrite Scarlett 2i2"],
    image: staffSoundcard,
  },
  {
    icon: Speaker,
    title: "СТУДИЙНЫЕ МОНИТОРЫ",
    items: ["ADAM T5V"],
    image: staffMonitors,
  },
  {
    icon: Mic,
    title: "МИКРОФОНЫ",
    items: ["Rode K2", "sE Electronics X1 S", "Audio-Technica AT2020"],
    image: staffMicrophone,
  },
  {
    icon: Headphones,
    title: "НАУШНИКИ",
    items: [
      "Beyerdynamic DT 990 Pro (250 Ohm)",
      "Audio-Technica ATH-M40x",
      "Audio-Technica ATH-M20x",
    ],
    image: staffHeadphones,
  },
  {
    icon: Guitar,
    title: "ИНСТРУМЕНТЫ",
    items: ["Электрогитара Jet JS400"],
    image: staffGuitar,
  },
];

const StaffSection = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="bg-background p-6 md:p-8 cursor-pointer group transition-colors duration-200 hover:bg-muted/30"
                onMouseEnter={() => cat.image && setActiveImage(cat.image)}
                onMouseLeave={() => setActiveImage(null)}
                onClick={() => cat.image && setActiveImage(prev => prev === cat.image ? null : cat.image)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <cat.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
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

          {/* Preview image */}
          <div className="hidden lg:block relative">
            <div className="sticky top-20 aspect-[3/4] bg-muted/20 border border-border overflow-hidden">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt="Оборудование студии"
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="label-text text-muted-foreground text-center px-4">
                    НАВЕДИ НА КАТЕГОРИЮ
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaffSection;
