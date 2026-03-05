import { useState } from "react";
import { X, Trash2, CalendarIcon, Clock } from "lucide-react";
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

const WORK_HOURS = Array.from({ length: 13 }, (_, i) => {
  const h = i + 10;
  return `${h}:00`;
});

const BookingDrawer = ({ open, onClose, initialTab = "contact" }: BookingDrawerProps) => {
  const { toast } = useToast();
  const { items, removeItem, clearCart, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", interest: "" });
  const [tab, setTab] = useState<"contact" | "cart">(initialTab);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");

  const activeTab = open ? (initialTab === "cart" ? "cart" : tab) : tab;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact) return;

    setLoading(true);

    let text = "";
    if (activeTab === "cart" && items.length > 0) {
      const servicesList = items.map((i) => `  - ${i.name}: ${i.price}`).join("\n");
      const dateStr = selectedDate ? format(selectedDate, "d MMMM yyyy", { locale: ru }) : "не указана";
      const timeStr = selectedTime || "не указано";
      text = `Заказ услуг — ВОК САУНД\n\nИмя: ${form.name}\nКонтакт: ${form.contact}\n\nДата: ${dateStr}\nВремя: ${timeStr}\n\nУслуги:\n${servicesList}\n\nИтого: ${total.toLocaleString("ru-RU")}`;
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
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md glass-panel-strong transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ borderRadius: "24px 0 0 24px" }}
      >
        <div className="flex flex-col h-full p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl">
              {activeTab === "cart" ? "КОРЗИНА" : "СВЯЗАТЬСЯ"}
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full btn-glass-ghost flex items-center justify-center"
            >
              <X className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setTab("contact")}
              className={`flex-1 py-2.5 rounded-xl font-heading text-xs tracking-wider transition-all duration-300 ${
                activeTab === "contact"
                  ? "btn-glass"
                  : "btn-glass-ghost"
              }`}
            >
              СВЯЗАТЬСЯ
            </button>
            <button
              onClick={() => setTab("cart")}
              className={`flex-1 py-2.5 rounded-xl font-heading text-xs tracking-wider transition-all duration-300 relative ${
                activeTab === "cart"
                  ? "btn-glass"
                  : "btn-glass-ghost"
              }`}
            >
              ЗАКАЗ
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-[0_0_10px_hsl(var(--primary)/0.5)]">
                  {items.length}
                </span>
              )}
            </button>
          </div>

          {/* Cart items */}
          {activeTab === "cart" && (
            <div className="mb-4">
              {items.length === 0 ? (
                <p className="font-hand text-lg text-muted-foreground text-center py-8">
                  Корзина пуста — добавь услуги из прайса
                </p>
              ) : (
                <div className="space-y-2 mb-4">
                  {items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-3 glass-card px-3 py-2 rounded-xl"
                    >
                      <span className="font-body text-sm flex-1">{item.name}</span>
                      <span className="font-heading text-sm whitespace-nowrap">{item.price}</span>
                      <button
                        onClick={() => removeItem(i)}
                        className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center hover:bg-destructive/20 hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
                      </button>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 border-t border-foreground/10">
                    <span className="font-heading text-sm">ИТОГО</span>
                    <span className="font-heading text-xl">{total.toLocaleString("ru-RU")}</span>
                  </div>
                </div>
              )}

              {/* Date & Time pickers */}
              {items.length > 0 && (
                <div className="space-y-4 mb-4">
                  <div>
                    <label className="font-heading text-xs mb-2 block tracking-wider">ДАТА ЗАПИСИ</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className={cn(
                            "w-full glass-input flex items-center gap-2 text-left",
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
                    <label className="font-heading text-xs mb-2 block tracking-wider">ВРЕМЯ</label>
                    <div className="relative flex items-center">
                      <Clock className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none shrink-0" />
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full glass-input pl-9 appearance-none cursor-pointer"
                      >
                        <option value="">Выбери время</option>
                        {WORK_HOURS.map((t) => (
                          <option key={t} value={t}>{t}</option>
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
            <p className="font-hand text-lg text-muted-foreground mb-4">
              Заполни форму и мы свяжемся с тобой
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
            <div>
              <label className="font-heading text-xs mb-2 block tracking-wider">ТВОЕ ИМЯ</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full glass-input"
                placeholder="Как тебя зовут?"
              />
            </div>

            <div>
              <label className="font-heading text-xs mb-2 block tracking-wider">TELEGRAM ИЛИ ТЕЛЕФОН</label>
              <input
                type="text"
                required
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="w-full glass-input"
                placeholder="@username или +7..."
              />
            </div>

            {activeTab === "contact" && (
              <div>
                <label className="font-heading text-xs mb-2 block tracking-wider">ЧТО ВАС ИНТЕРЕСУЕТ</label>
                <textarea
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  className="w-full glass-input min-h-[80px] resize-none"
                  placeholder="Запись, сведение, мастеринг..."
                  rows={3}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading || (activeTab === "cart" && items.length === 0)}
              className="btn-glass font-heading text-base px-6 py-4 tracking-wider text-center w-full mt-auto disabled:opacity-40"
            >
              {loading
                ? "ОТПРАВЛЯЕМ..."
                : activeTab === "cart"
                ? "ОФОРМИТЬ ЗАКАЗ"
                : "ОТПРАВИТЬ ЗАЯВКУ"}
            </button>
          </form>

          <p className="font-hand text-base text-muted-foreground mt-4 text-center">
            Ответим в течение пары часов
          </p>
        </div>
      </div>
    </>
  );
};

export default BookingDrawer;
