import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToBag: (product: Product, size: number, quantity?: number) => void;
  removeFromBag: (productId: string, size: number) => void;
  updateQuantity: (productId: string, size: number, quantity: number) => void;
  clearBag: () => void;
  subtotal: number;
  totalCount: number;
  isBagOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'obsidia_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isBagOpen, setIsBagOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save bag to localStorage', e);
    }
  }, [items]);

  const addToBag = (product: Product, size: number, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prevItems, { product, size, quantity }];
    });

    setIsBagOpen(true);
  };

  const removeFromBag = (productId: string, size: number) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  };

  const updateQuantity = (productId: string, size: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromBag(productId, size);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product.id === productId && item.size === size) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearBag = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToBag,
        removeFromBag,
        updateQuantity,
        clearBag,
        subtotal,
        totalCount,
        isBagOpen,
        openBag: () => setIsBagOpen(true),
        closeBag: () => setIsBagOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
