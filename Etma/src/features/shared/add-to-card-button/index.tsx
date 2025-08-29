"use client";

import { Button } from "@/components/ui/button";
import { Episode } from "@/features/interface/journal";
import { useCardStore } from "@/features/store/card-store";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toast } from "@/components/ui/toast";

export default function AddToCardButton({ data }: { data: Episode }) {
  const { addItem, card } = useCardStore();
  const [isAdded, setIsAdded] = useState(false);
  const { toast, showSuccess, hideToast } = useToast();
  
  const existingItem = card.find(item => item.id === data.id);
  const isInCart = !!existingItem;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (isInCart) {
      // Если элемент уже в корзине, увеличиваем количество
      addItem(data);
      showSuccess(`Quantity increased! Now you have ${(existingItem?.quantity || 1) + 1} of "${data.name}"`);
    } else {
      // Если элемент новый, добавляем в корзину
      addItem(data);
      showSuccess(`"${data.name}" added to cart!`);
    }
    
    // Показываем анимацию кнопки
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className={`absolute bottom-4 right-4 cursor-pointer transition-all duration-300 ${
          isInCart 
            ? 'bg-green-600 border-green-600 text-white hover:bg-green-700' 
            : 'hover:bg-blue-600 hover:border-blue-600 hover:text-white'
        }`}
        onClick={handleAddToCart}
        title={isInCart ? `Already in cart (${existingItem?.quantity || 1})` : 'Add to cart'}
      >
        {isAdded ? (
          <Check className="h-4 w-4" />
        ) : (
          <ShoppingCart className="h-4 w-4" />
        )}
        
        {/* Индикатор количества, если элемент уже в корзине */}
        {isInCart && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-white text-green-600 text-xs font-bold flex items-center justify-center">
            {existingItem?.quantity || 1}
          </span>
        )}
      </Button>
      
      {/* Уведомление */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
}
