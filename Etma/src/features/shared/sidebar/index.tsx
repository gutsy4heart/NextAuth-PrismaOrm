"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCardStore } from "@/features/store/card-store";
import { ShoppingCart } from "lucide-react";
import EpisodeItem from "./episode-item";

export function Sidebar() {
  const { card, getTotalItems } = useCardStore();
  const totalItems = getTotalItems();
  const uniqueItems = card.length;
  
  console.log("Cart items:", card);
  console.log("Total quantity:", totalItems);
  console.log("Unique items:", uniqueItems);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col bg-black text-white">
        <SheetHeader>
          <SheetTitle className="text-white">
            Cart ({uniqueItems} items, {totalItems} total)
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4 px-4">
          {card.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center space-y-4">
              <div className="rounded-full border border-white/20 p-6">
                <ShoppingCart className="h-8 w-8 text-white/50" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-white">
                  Your cart is empty
                </p>
                <p className="text-sm text-white/60">
                  Add items to your cart to checkout
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {card.map((item) => (
                <EpisodeItem key={item.id} data={item} />
              ))}
              
              {/* Итоговая информация */}
              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <div className="flex justify-between items-center text-white">
                  <span className="font-medium">Total Items:</span>
                  <span className="font-bold">{totalItems}</span>
                </div>
                <div className="flex justify-between items-center text-white/70 text-sm mt-1">
                  <span>Unique Episodes:</span>
                  <span>{uniqueItems}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
