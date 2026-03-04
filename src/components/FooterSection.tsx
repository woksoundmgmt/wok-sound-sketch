import { MapPin, Phone, Mail, Send } from "lucide-react";
import woksoundLogo from "@/assets/woksound-logo.png";

const FooterSection = () => {
  return (
    <footer id="contacts" className="py-16 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <img src={woksoundLogo} alt="ВОК САУНД" className="h-20 w-auto mb-6 invert" />
            <p className="font-hand text-xl text-background/60 max-w-sm leading-relaxed">
              Андеграунд-студия для тех, кто делает музыку всерьез. Никакой попсы в подходе — только результат.
            </p>
          </div>

          <div className="space-y-4 font-body text-sm">
            <a
              href="https://yandex.ru/maps/?text=улица+Героя+Владислава+Посадского+42"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 hover:opacity-60 transition-opacity"
            >
              <MapPin className="w-5 h-5 mt-0.5 shrink-0" strokeWidth={2} />
              ул. Героя Владислава Посадского, 42
            </a>

            <a href="tel:+79964394808" className="flex items-center gap-3 hover:opacity-60 transition-opacity">
              <Phone className="w-5 h-5 shrink-0" strokeWidth={2} />
              +7 996 439-48-08
            </a>

            <a href="mailto:woksoundmgmt@gmail.com" className="flex items-center gap-3 hover:opacity-60 transition-opacity">
              <Mail className="w-5 h-5 shrink-0" strokeWidth={2} />
              woksoundmgmt@gmail.com
            </a>

            <a
              href="https://t.me/woksound"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-60 transition-opacity"
            >
              <Send className="w-5 h-5 shrink-0" strokeWidth={2} />
              Telegram
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-background/20 text-center">
          <p className="font-hand text-lg text-background/40">
            © {new Date().getFullYear()} ВОК САУНД. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
