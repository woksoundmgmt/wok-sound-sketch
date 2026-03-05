import { MapPin, Phone, Mail, Send, Clock } from "lucide-react";
import woksoundLogo from "@/assets/woksound-logo.png";

const FooterSection = () => {
  return (
    <footer id="contacts" className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(230,20%,4%)] to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="glass-panel-strong p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <img src={woksoundLogo} alt="ВОК САУНД" className="h-20 w-auto mb-6 brightness-0 invert opacity-80" />
              <p className="font-hand text-xl text-muted-foreground max-w-sm leading-relaxed">
                Андеграунд-студия для тех, кто делает музыку всерьез. Никакой попсы в подходе — только результат.
              </p>
            </div>

            <div className="space-y-4 font-body text-sm">
              <a
                href="https://yandex.ru/maps/?text=улица+Героя+Владислава+Посадского+42"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-foreground/70 hover:text-foreground transition-colors duration-300"
              >
                <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-accent" strokeWidth={2} />
                ул. Героя Владислава Посадского, 42
              </a>

              <a href="tel:+79964394808" className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors duration-300">
                <Phone className="w-5 h-5 shrink-0 text-accent" strokeWidth={2} />
                +7 996 439-48-08
              </a>

              <a href="mailto:woksoundmgmt@gmail.com" className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors duration-300">
                <Mail className="w-5 h-5 shrink-0 text-accent" strokeWidth={2} />
                woksoundmgmt@gmail.com
              </a>

              <a
                href="https://t.me/woksoundmgmt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors duration-300"
              >
                <Send className="w-5 h-5 shrink-0 text-accent" strokeWidth={2} />
                @woksoundmgmt
              </a>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-foreground/10">
                <Clock className="w-5 h-5 shrink-0 text-primary" strokeWidth={2} />
                <div>
                  <p className="font-heading text-xs tracking-wider mb-1">ГРАФИК РАБОТЫ</p>
                  <p className="text-foreground/70">Пн — Вс: 10:00 — 22:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-foreground/10 text-center">
            <p className="font-hand text-lg text-muted-foreground">
              © {new Date().getFullYear()} ВОК САУНД. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
