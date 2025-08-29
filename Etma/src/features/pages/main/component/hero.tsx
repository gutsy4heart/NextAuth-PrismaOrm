
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface HeroProps {
  title: string;
  description?: string;
  image: string | StaticImageData;
}

export default function Hero({ title, description, image }: HeroProps) {
  return (
    <div className="flex flex-col items-center justify-center relative w-full h-[100vh]">
      <Image
        src={image}
        alt="hero"
        className="absolute top-0 left-0 w-[100vw] h-[100vh] object-cover z-0"
      />
      <div className="flex flex-col items-center justify-center z-10 gap-[60px]">
        <div className="flex flex-col gap-[33px] justify-center items-center">
          <h1 className="text-7xl text-white">{title}</h1>
          <p className="text-lg text-white max-w-[500px] text-center">
            {description}
          </p>
        </div>
        <div className="flex gap-[20px]">
          <Link href="/supplement">
            <Button
              variant="outline"
              className="bg-transparent border-white text-white rounded-none min-w-[215px] tracking-[2px] cursor-poiner"
            >
              SUPPLEMENT
            </Button>
          </Link>
          <Link href="/laser">
            <Button
              variant="outline"
              className="bg-transparent border-white text-white rounded-none min-w-[215px] tracking-[2px] cursor-poiner"
            >
              LASER
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
