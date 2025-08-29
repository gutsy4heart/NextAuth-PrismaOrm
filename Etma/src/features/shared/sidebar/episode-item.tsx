"use client";

import { Episode } from "@/features/interface/journal";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Play, Hash, Trash, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCardStore } from "@/features/store/card-store";

export default function EpisodeItem({ data }: { data: Episode }) {
  const { removeItem, updateQuantity } = useCardStore();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatEpisode = (episodeCode: string) => {
    // Converts "S01E01" to "Season 1, Episode 1"
    const match = episodeCode.match(/S(\d+)E(\d+)/);
    if (match) {
      const season = parseInt(match[1], 10);
      const episode = parseInt(match[2], 10);
      return `S${season}E${episode}`;
    }
    return episodeCode;
  };

  const handleIncreaseQuantity = () => {
    const currentQuantity = data.quantity || 1;
    updateQuantity(data.id, currentQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    const currentQuantity = data.quantity || 1;
    if (currentQuantity > 1) {
      updateQuantity(data.id, currentQuantity - 1);
    } else {
      removeItem(data.id);
    }
  };

  return (
    <Card className="mb-3 bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer group relative">
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-sm font-medium line-clamp-2 group-hover:text-blue-300 transition-colors">
          {data.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-white/70">
          <Hash className="h-3 w-3" />
          <span>{formatEpisode(data.episode)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/70">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(data.air_date)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="h-3 w-3" />
          <Link href={`/journal/${data.id}`}>
            <span>View Episode</span>
          </Link>
        </div>
        
        {/* Счетчик количества */}
        <div className="flex items-center justify-between bg-white/10 rounded-lg p-2 mt-3">
          <span className="text-xs text-white/70">Quantity:</span>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleDecreaseQuantity}
              size="sm"
              variant="outline"
              className="h-6 w-6 p-0 border-white/20 text-white hover:bg-white/20"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-white font-medium min-w-[20px] text-center">
              {data.quantity || 1}
            </span>
            <Button
              onClick={handleIncreaseQuantity}
              size="sm"
              variant="outline"
              className="h-6 w-6 p-0 border-white/20 text-white hover:bg-white/20"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="absolute bottom-12 right-0">
        <Button 
          onClick={() => removeItem(data.id)} 
          size="icon" 
          className="border border-red-600 transition-all duration-300 cursor-pointer hover:bg-red-200"
        >
          <Trash className="text-red-600"/>
        </Button>
      </CardFooter>
    </Card>
  );
}
