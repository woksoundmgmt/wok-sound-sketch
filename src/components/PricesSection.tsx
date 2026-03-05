import { useState } from "react";
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
    title: "БАЗОВЫЕ УСЛУГИ",
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
    title: "ТЕКСТ И ТОПЛАЙН",
    items: [
      { name: "Написание текста", price: "500", desc: "Текст по вашему брифу или теме" },
      { name: "Топлайн", price: "1 200", desc: "Мелодия и подача под готовый бит" },
      { name: "Песня с нуля", price: "3 000", desc: "Текст + топлайн + структура трека" },
    ],
  },
  {
    title: "ДОП. УСЛУГИ",
    items: [
      { name: "Тюнинг вокала", price: "600", desc: "Автотюн или ручная коррекция pitch" },
      { name: "Бэк-вокал / адлибы", price: "500", desc: "Запись и обработка бэков" },
      { name: "Срочный проект", price: "+20%", desc: "Ускоренные сроки — приоритет в очереди" },
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
    <section id="prices" className="py-20 relative">
      {/* Glass section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(250,60%,50%/0.04)] to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="font-heading text-4xl md:text-6xl text-center mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          ЦЕНЫ
        </h2>
        <p className="font-hand text-xl text-center text-muted-foreground mb-14">
          честный прайс без скрытых платежей
        </p>

        <div className="max-w-3xl mx-auto">
          <Accordion type="multiple" className="space-y-3">
            {priceCategories.map((cat, i) => (
              <AccordionItem
                key={i}
                value={`cat-${i}`}
                className="glass-card px-5 overflow-hidden border-0"
              >
                <AccordionTrigger className="font-heading text-lg md:text-xl hover:no-underline py-5 text-foreground">
                  {cat.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pb-3">
                    {cat.items.map((item, j) => (
                      <div
                        key={j}
                        className="flex items-center justify-between gap-4 border-b border-foreground/5 pb-3 last:border-0"
                      >
                        <div className="flex-1 min-w-0">
                          <span className="font-body font-bold text-sm text-foreground">
                            {item.name}
                          </span>
                          <p className="font-hand text-base text-muted-foreground mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                        <span className="font-heading text-lg text-foreground whitespace-nowrap">
                          {item.price}
                        </span>
                        <button
                          onClick={() => handleAdd(item.name, item.price)}
                          className="shrink-0 w-9 h-9 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 hover:shadow-[0_0_12px_hsl(var(--primary)/0.2)] transition-all duration-300"
                          title={`Добавить ${item.name}`}
                        >
                          <ShoppingCart className="w-3.5 h-3.5" strokeWidth={2} />
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
