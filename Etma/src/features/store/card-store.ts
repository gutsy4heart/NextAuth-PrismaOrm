import { create } from "zustand";
import { Episode } from "../interface/journal";

interface CardStore {
    card: Episode[];
    addItem: (item: Episode) => void;
    removeItem: (id: number) => void;
    clearItems: () => void;
    updateQuantity: (id: number, quantity: number) => void;
    getTotalItems: () => number;
}

export const useCardStore = create<CardStore>((set, get) => ({
  card: [],
  
  // Добавление элемента с проверкой дублирования
  addItem: (item: Episode) => set((state) => {
    const existingItemIndex = state.card.findIndex((cartItem) => cartItem.id === item.id);
    
    if (existingItemIndex !== -1) {
      // Если элемент уже существует, увеличиваем количество
      const updatedCard = [...state.card];
      updatedCard[existingItemIndex] = {
        ...updatedCard[existingItemIndex],
        quantity: (updatedCard[existingItemIndex].quantity || 1) + 1
      };
      
      return { card: updatedCard };
    } else {
      // Если элемент новый, добавляем с количеством 1
      const newItem = { ...item, quantity: 1 };
      return { card: [...state.card, newItem] };
    }
  }),
  
  // Удаление элемента
  removeItem: (id: number) => set((state) => ({ 
    card: state.card.filter((item) => item.id !== id) 
  })),
  
  // Очистка корзины
  clearItems: () => set({ card: [] }),
  
  // Обновление количества конкретного элемента
  updateQuantity: (id: number, quantity: number) => set((state) => {
    if (quantity <= 0) {
      // Если количество 0 или меньше, удаляем элемент
      return { 
        card: state.card.filter((item) => item.id !== id) 
      };
    }
    
    const updatedCard = state.card.map((item) => 
      item.id === id ? { ...item, quantity } : item
    );
    
    return { card: updatedCard };
  }),
  
  // Получение общего количества элементов в корзине
  getTotalItems: () => {
    const state = get();
    return state.card.reduce((total, item) => total + (item.quantity || 1), 0);
  }
}));

