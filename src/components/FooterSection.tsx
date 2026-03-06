import { MapPin, Phone, Mail, Send, Clock } from "lucide-react";
import woksoundLogo from "@/assets/woksound-logo.png";

const FooterSection = () => {
  return (
    <footer id="contacts" className="py-20 md:py-32 border-t border-border bg-foreground text-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <img src={woksoundLogo} alt="ВОК САУНД" className="h-16 w-auto mb-8 brightness-0 invert" />
            <p className="font-body text-sm text-background/60 max-w-sm leading-relaxed">
              Андеграунд-студия для тех, кто делает музыку всерьез. Никакой попсы в подходе — только результат.
            </p>
          </div>

          <div className="space-y-4 font-body text-sm">
            <a
              href="https://yandex.ru/maps/?text=улица+Героя+Владислава+Посадского+42"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-background/60 hover:text-background transition-colors duration-200"
            >
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={1.5} />
              ул. Героя Владислава Посадского, 42
            </a>

            <a href="tel:+79964394808" className="flex items-center gap-3 text-background/60 hover:text-background transition-colors duration-200">
              <Phone className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              +7 996 439-48-08
            </a>

            <a href="mailto:woksoundmgmt@gmail.com" className="flex items-center gap-3 text-background/60 hover:text-background transition-colors duration-200">
              <Mail className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              woksoundmgmt@gmail.com
            </a>

            <a
              href="https://t.me/woksoundmgmt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-background/60 hover:text-background transition-colors duration-200"
            >
              <Send className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              @woksoundmgmt
            </a>

            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-background/20">
              <Clock className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-heading text-[10px] tracking-widest mb-1 text-background/40">ГРАФИК РАБОТЫ</p>
                <p className="text-background/70">Пн — Вс: 10:00 — 22:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-background/20">
          <p className="label-text text-background/40">
            © {new Date().getFullYear()} ВОК САУНД. ВСЕ ПРАВА ЗАЩИЩЕНЫ.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
