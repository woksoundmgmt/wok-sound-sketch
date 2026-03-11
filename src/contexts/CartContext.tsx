import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  name: string;
  price: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  total: number;
  urgent: boolean;
  setUrgent: (v: boolean) => void;
  nightSurcharge: boolean;
  setNightSurcharge: (v: boolean) => void;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};

const parsePrice = (price: string): number => {
  const num = parseInt(price.replace(/\s/g, ""), 10);
  return isNaN(num) ? 0 : num;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [urgent, setUrgent] = useState(false);
  const [nightSurcharge, setNightSurcharge] = useState(false);

  const addItem = (item: CartItem) => setItems((prev) => [...prev, item]);
  const removeItem = (index: number) =>
    setItems((prev) => prev.filter((_, i) => i !== index));
  const clearCart = () => {
    setItems([]);
    setUrgent(false);
    setNightSurcharge(false);
  };

  const total = items.reduce((sum, item) => sum + parsePrice(item.price), 0);
  
  let finalTotal = total;
  if (urgent) finalTotal = Math.round(finalTotal * 1.2);
  if (nightSurcharge) finalTotal = Math.round(finalTotal * 1.2);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total, urgent, setUrgent, nightSurcharge, setNightSurcharge, finalTotal }}>
      {children}
    </CartContext.Provider>
  );
};
