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
      // Send to Telegram
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      });

      // Email stub
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
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-foreground/50"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-background border-l-4 border-foreground transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl">ЗАПИСАТЬСЯ</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 sketch-border-thin flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={3} />
            </button>
          </div>

          {/* Decorative wavy line */}
          <svg width="100%" height="8" className="mb-8">
            <path d="M0,4 Q25,0 50,4 Q75,8 100,4 Q125,0 150,4 Q175,8 200,4 Q225,0 250,4 Q275,8 300,4 Q325,0 350,4" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
            <div>
              <label className="font-heading text-sm mb-2 block">ТВОЕ ИМЯ *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border-3 border-foreground bg-transparent px-4 py-3 font-mono text-sm focus:outline-none focus:shadow-[3px_3px_0_hsl(var(--foreground))] transition-shadow"
                placeholder="Как тебя зовут?"
              />
            </div>

            <div>
              <label className="font-heading text-sm mb-2 block">TELEGRAM ИЛИ ТЕЛЕФОН *</label>
              <input
                type="text"
                required
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="w-full border-3 border-foreground bg-transparent px-4 py-3 font-mono text-sm focus:outline-none focus:shadow-[3px_3px_0_hsl(var(--foreground))] transition-shadow"
                placeholder="@username или +7..."
              />
            </div>

            <div className="flex-1">
              <label className="font-heading text-sm mb-2 block">РАССКАЖИ ПРО ПРОЕКТ *</label>
              <textarea
                required
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })}
                className="w-full h-32 border-3 border-foreground bg-transparent px-4 py-3 font-mono text-sm resize-none focus:outline-none focus:shadow-[3px_3px_0_hsl(var(--foreground))] transition-shadow"
                placeholder="Жанр, референсы, сроки..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative group mt-auto"
            >
              <span className="relative z-10 block btn-invert sketch-border font-heading text-base px-6 py-4 tracking-wider text-center w-full">
                {loading ? "ОТПРАВЛЯЕМ..." : "ОТПРАВИТЬ ЗАЯВКУ"}
              </span>
            </button>
          </form>

          {/* Bottom deco */}
          <p className="font-mono text-[10px] text-muted-foreground mt-4 text-center">
            Ответим в течение пары часов ✕
          </p>
        </div>
      </div>
    </>
  );
};

export default BookingDrawer;
