import { useState } from "react";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookingDrawerProps {
  open: boolean;
  onClose: () => void;
}

const TELEGRAM_BOT_TOKEN = "8738225501:AAH_TliE5iP30bQo9kWDCD791cUJPN3l2dQ";
const TELEGRAM_CHAT_ID = "423749724";

const BookingDrawer = ({ open, onClose }: BookingDrawerProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", project: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact || !form.project) return;

    setLoading(true);

    const text = `🎤 Новая заявка — ВОК САУНД\n\n👤 Имя: ${form.name}\n📱 Контакт: ${form.contact}\n📝 Проект: ${form.project}`;

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      });

      console.log("Email stub: would send to woksoundmgmt@gmail.com", form);

      setForm({ name: "", contact: "", project: "" });
      onClose();
      toast({
        title: "Заявка улетела! 🚀",
        description: "Скоро наберем.",
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
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-background border-l-2 border-foreground/20 transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ borderRadius: "24px 0 0 24px" }}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl">ЗАПИСАТЬСЯ</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full drawn-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>

          <p className="font-hand text-lg text-muted-foreground mb-6">
            Заполни форму и мы свяжемся с тобой ✌️
          </p>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
            <div>
              <label className="font-heading text-xs mb-2 block tracking-wider">ТВОЕ ИМЯ</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full drawn-input"
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
                className="w-full drawn-input"
                placeholder="@username или +7..."
              />
            </div>

            <div className="flex-1">
              <label className="font-heading text-xs mb-2 block tracking-wider">РАССКАЖИ ПРО ПРОЕКТ</label>
              <textarea
                required
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })}
                className="w-full h-32 drawn-input resize-none"
                placeholder="Жанр, референсы, сроки..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-drawn font-heading text-base px-6 py-4 tracking-wider text-center w-full mt-auto"
            >
              {loading ? "ОТПРАВЛЯЕМ..." : "ОТПРАВИТЬ ЗАЯВКУ"}
            </button>
          </form>

          <p className="font-hand text-base text-muted-foreground mt-4 text-center">
            Ответим в течение пары часов ✌️
          </p>
        </div>
      </div>
    </>
  );
};

export default BookingDrawer;
