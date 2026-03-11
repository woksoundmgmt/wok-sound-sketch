import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const priceCategories = [
  {
    title: "ЗАПИСЬ",
    items: [
      { name: "Запись 1 час", price: "800", desc: "Одна часовая сессия в студии с инженером" },
      { name: "Запись 2 часа", price: "1 200", desc: "Расширенная сессия — хватит на пару дублей" },
      { name: "Запись 3 часа", price: "1 600", desc: "Полноценная запись — без спешки и суеты" },
    ],
  },
  {
    title: "ПАКЕТЫ «ПЕСНЯ ПОД КЛЮЧ»",
    items: [
      { name: "Single Basic", price: "2 300", desc: "Запись + сведение — минимум для релиза" },
      { name: "Single Standard", price: "3 500", desc: "Запись + сведение + мастеринг + обложка" },
      { name: "Single Premium", price: "5 000", desc: "Полный цикл: от записи до дистрибуции" },
    ],
  },
  {
    title: "СВЕДЕНИЕ И МАСТЕРИНГ",
    items: [
      { name: "Сведение", price: "1 200", desc: "Профессиональный микс вашего трека" },
      { name: "Мастеринг", price: "800", desc: "Финализация звучания под стриминг" },
      { name: "Сведение + мастеринг", price: "1 600", desc: "Комбо со скидкой — полный постпродакшн" },
    ],
  },
  {
    title: "АРАНЖИРОВКА И БИТЫ",
    items: [
      { name: "Бит на заказ", price: "2 000", desc: "Уникальный бит под ваш стиль" },
      { name: "Эксклюзив", price: "4 000", desc: "Бит только для вас — полные права" },
      { name: "Полная аранжировка", price: "5 000", desc: "Инструментал с нуля, все жанры" },
    ],
  },
  {
    title: "ТЕКСТ",
    items: [
      { name: "Написание текста", price: "500", desc: "Текст по вашему брифу или теме" },
    ],
  },
  {
    title: "ДОП. УСЛУГИ",
    items: [
      { name: "Тюнинг вокала", price: "600", desc: "Автотюн или ручная коррекция pitch" },
      { name: "Бэк-вокал / адлибы", price: "500", desc: "Запись и обработка бэков" },
      { name: "Подготовка к площадкам", price: "200", desc: "Форматирование под требования дистрибьюторов" },
      { name: "Дистрибуция", price: "500", desc: "Релиз на всех площадках мира" },
    ],
  },
  {
    title: "ПАКЕТЫ ДЛЯ ЧАСТЫХ КЛИЕНТОВ",
    items: [
      { name: "5 часов", price: "3 000", desc: "Абонемент — экономия 1 000" },
      { name: "10 часов", price: "5 500", desc: "Серьезный запас — экономия 2 500" },
      { name: "3 трека «под ключ»", price: "9 000", desc: "EP-пакет со скидкой" },
    ],
  },
];

const PricesSection = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const index = (e as CustomEvent).detail as number;
      const value = `cat-${index}`;
      setOpenAccordions((prev) => (prev.includes(value) ? prev : [...prev, value]));
    };
    window.addEventListener("open-price-accordion", handler);
    return () => window.removeEventListener("open-price-accordion", handler);
  }, []);

  const handleAdd = (name: string, price: string) => {
    addItem({ name, price });
    toast({
      title: "Добавлено в корзину",
      description: `${name} — нажми чтобы открыть`,
      action: undefined,
    });
    setTimeout(() => {
      const toastEl = document.querySelector('[data-state="open"][role="status"]');
      if (toastEl) {
        (toastEl as HTMLElement).style.cursor = "pointer";
        (toastEl as HTMLElement).onclick = () => {
          window.dispatchEvent(new CustomEvent("open-cart"));
        };
      }
    }, 50);
  };

  return (
    <section id="prices" className="py-20 md:py-32 border-t border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-baseline justify-between mb-16">
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl tracking-tight">
            ЦЕНЫ
          </h2>
          <p className="label-text hidden md:block">
            ЧЕСТНЫЙ ПРАЙС
          </p>
        </div>

        <div className="max-w-3xl">
          <Accordion
            type="multiple"
            className="space-y-0"
            value={openAccordions}
            onValueChange={setOpenAccordions}
          >
            {priceCategories.map((cat, i) => (
              <AccordionItem
                key={i}
                value={`cat-${i}`}
                className="border-b border-border px-0"
              >
                <AccordionTrigger className="font-heading text-sm md:text-base hover:no-underline py-5 text-foreground tracking-wider">
                  {cat.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-0 pb-4">
                    {cat.items.map((item, j) => (
                      <div
                        key={j}
                        className="flex items-center justify-between gap-4 py-3 border-b border-border/50 last:border-0 group"
                      >
                        <div className="flex-1 min-w-0">
                          <span className="font-body font-medium text-sm text-foreground">
                            {item.name}
                          </span>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                        <span className="font-heading text-sm text-foreground whitespace-nowrap">
                          {item.price}
                        </span>
                        <button
                          onClick={() => handleAdd(item.name, item.price)}
                          className="shrink-0 w-8 h-8 border border-border flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-200"
                          title={`Добавить ${item.name}`}
                        >
                          <ShoppingCart className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default PricesSection;
