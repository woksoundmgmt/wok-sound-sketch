import { useState } from "react";
import { X, Trash2, CalendarIcon, Clock, Zap } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface BookingDrawerProps {
  open: boolean;
  onClose: () => void;
  initialTab?: "contact" | "cart";
}

const TELEGRAM_BOT_TOKEN = "8738225501:AAH_TliE5iP30bQo9kWDCD791cUJPN3l2dQ";
const TELEGRAM_CHAT_ID = "423749724";

// All 24 hours
const ALL_HOURS = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

// Night hours (22:00 - 09:00) = 22,23,0,1,2,3,4,5,6,7,8,9
const isNightHour = (time: string): boolean => {
  const h = parseInt(time.split(":")[0], 10);
  return h >= 22 || h <= 9;
};

const BookingDrawer = ({ open, onClose, initialTab = "contact" }: BookingDrawerProps) => {
  const { toast } = useToast();
  const { items, removeItem, clearCart, finalTotal, urgent, setUrgent, nightSurcharge, setNightSurcharge } = useCart();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", interest: "" });
  const [tab, setTab] = useState<"contact" | "cart">(initialTab);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");

  const activeTab = open ? (initialTab === "cart" ? "cart" : tab) : tab;

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    setNightSurcharge(isNightHour(time));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact) return;

    setLoading(true);

    let text = "";
    if (activeTab === "cart" && items.length > 0) {
      const servicesList = items.map((i) => `  - ${i.name}: ${i.price}`).join("\n");
      const dateStr = selectedDate ? format(selectedDate, "d MMMM yyyy", { locale: ru }) : "не указана";
      const timeStr = selectedTime || "не указано";
      const extras: string[] = [];
      if (urgent) extras.push("Срочный проект (+20%)");
      if (nightSurcharge) extras.push("Ночное время (+20%)");
      text = `Заказ услуг — ВОК САУНД\n\nИмя: ${form.name}\nКонтакт: ${form.contact}\n\nДата: ${dateStr}\nВремя: ${timeStr}\n${extras.length > 0 ? `Доп.: ${extras.join(", ")}\n` : ""}\nУслуги:\n${servicesList}\n\nИтого: ${finalTotal.toLocaleString("ru-RU")}`;
    } else {
      text = `Новая заявка — ВОК САУНД\n\nИмя: ${form.name}\nКонтакт: ${form.contact}\nИнтересует: ${form.interest || "не указано"}`;
    }

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
      });

      setForm({ name: "", contact: "", interest: "" });
      setSelectedDate(undefined);
      setSelectedTime("");
      if (activeTab === "cart") clearCart();
      onClose();
      toast({
        title: activeTab === "cart" ? "Заказ отправлен!" : "Заявка отправлена!",
        description: "Скоро свяжемся.",
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Попробуйте еще раз или напишите в Telegram.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-background border-l border-border transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 md:p-8 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-lg tracking-wider">
              {activeTab === "cart" ? "КОРЗИНА" : "СВЯЗАТЬСЯ"}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center hover:opacity-50 transition-opacity"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 mb-8 border border-border">
            <button
              onClick={() => setTab("contact")}
              className={`flex-1 py-2.5 font-heading text-[10px] tracking-widest transition-all duration-200 ${
                activeTab === "contact"
                  ? "bg-foreground text-background"
                  : "bg-background text-foreground hover:bg-muted"
              }`}
            >
              СВЯЗАТЬСЯ
            </button>
            <button
              onClick={() => setTab("cart")}
              className={`flex-1 py-2.5 font-heading text-[10px] tracking-widest transition-all duration-200 relative ${
                activeTab === "cart"
                  ? "bg-foreground text-background"
                  : "bg-background text-foreground hover:bg-muted"
              }`}
            >
              ЗАКАЗ
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-foreground text-background text-[9px] font-bold flex items-center justify-center border border-background">
                  {items.length}
                </span>
              )}
            </button>
          </div>

          {/* Cart items */}
          {activeTab === "cart" && (
            <div className="mb-6">
              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Корзина пуста — добавь услуги из прайса
                </p>
              ) : (
                <div className="space-y-0 mb-6">
                  {items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-3 py-3 border-b border-border"
                    >
                      <span className="font-body text-sm flex-1">{item.name}</span>
                      <span className="font-heading text-sm whitespace-nowrap">{item.price}</span>
                      <button
                        onClick={() => removeItem(i)}
                        className="shrink-0 w-7 h-7 flex items-center justify-center hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                    </div>
                  ))}

                  {/* Urgent toggle */}
                  <button
                    onClick={() => setUrgent(!urgent)}
                    className={cn(
                      "w-full flex items-center justify-between gap-3 py-3 border-b border-border transition-colors duration-200",
                      urgent ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    <span className="flex items-center gap-2 font-body text-sm">
                      <Zap className="w-3.5 h-3.5" strokeWidth={1.5} />
                      Срочный проект
                    </span>
                    <span className="font-heading text-sm">
                      {urgent ? "ВКЛ +20%" : "+20%"}
                    </span>
                  </button>

                  {/* Night surcharge info */}
                  {nightSurcharge && (
                    <div className="flex items-center justify-between gap-3 py-3 border-b border-border text-muted-foreground">
                      <span className="font-body text-sm">Ночное время (22:00–09:00)</span>
                      <span className="font-heading text-sm">+20%</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4">
                    <span className="font-heading text-xs tracking-widest">ИТОГО</span>
                    <span className="font-heading text-xl">{finalTotal.toLocaleString("ru-RU")}</span>
                  </div>
                </div>
              )}

              {/* Date & Time pickers */}
              {items.length > 0 && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="label-text mb-2 block">ДАТА ЗАПИСИ</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className={cn(
                            "w-full editorial-input flex items-center gap-2 text-left",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="w-4 h-4 shrink-0" />
                          {selectedDate
                            ? format(selectedDate, "d MMMM yyyy", { locale: ru })
                            : "Выбери дату"}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 z-[80]" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="label-text mb-2 block">ВРЕМЯ</label>
                    <div className="relative">
                      <Clock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      <select
                        value={selectedTime}
                        onChange={(e) => handleTimeChange(e.target.value)}
                        className="w-full editorial-input pl-6 appearance-none cursor-pointer bg-transparent"
                      >
                        <option value="">Выбери время</option>
                        {ALL_HOURS.map((t) => (
                          <option key={t} value={t}>
                            {t}{isNightHour(t) ? " (+20%)" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Contact info */}
          {activeTab === "contact" && (
            <p className="text-sm text-muted-foreground mb-6">
              Заполни форму и мы свяжемся с тобой
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
            <div>
              <label className="label-text mb-2 block">ТВОЕ ИМЯ</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full editorial-input"
                placeholder="Как тебя зовут?"
              />
            </div>

            <div>
              <label className="label-text mb-2 block">TELEGRAM ИЛИ ТЕЛЕФОН</label>
              <input
                type="text"
                required
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="w-full editorial-input"
                placeholder="@username или +7..."
              />
            </div>

            {activeTab === "contact" && (
              <div>
                <label className="label-text mb-2 block">ЧТО ВАС ИНТЕРЕСУЕТ</label>
                <textarea
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  className="w-full editorial-input min-h-[80px] resize-none"
                  placeholder="Запись, сведение, мастеринг..."
                  rows={3}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading || (activeTab === "cart" && items.length === 0)}
              className="btn-primary text-xs px-6 py-4 tracking-widest text-center w-full mt-auto disabled:opacity-30"
            >
              {loading
                ? "ОТПРАВЛЯЕМ..."
                : activeTab === "cart"
                ? "ОФОРМИТЬ ЗАКАЗ"
                : "ОТПРАВИТЬ ЗАЯВКУ"}
            </button>
          </form>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Ответим в течение пары часов
          </p>
        </div>
      </div>
    </>
  );
};

export default BookingDrawer;
