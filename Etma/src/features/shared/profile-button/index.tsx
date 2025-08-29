import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "../sidebar";

export default function ProfileButton() {
  const { user, isAuthenticated, status } = useAuth();
  
  if (status === "loading") {
    return (
      <div className="w-[44px] h-[23px] bg-gray-200 animate-pulse rounded-none"></div>
    );
  }
  
  return (
    <>
      {isAuthenticated ? (
        <>
          <Link href="/profile">
            {user?.image ? (
              <Image
                src={user.image || ""}
                alt="avatar"
                width={44}
                height={44}
                className="rounded-full border border-black/10"
              />
            ) : (
              <span className="rounded-full border w-[44px] h-[44px] border-black/10 flex items-center justify-center text-2xl">
                {user?.name?.charAt(0) || user?.fullName?.charAt(0) || "U"}
              </span>
            )}
          </Link>
          <Sidebar />
        </>
      ) : (
        <Link href="/signin">
          <Button className="bg-black text-white min-w-[64px] h-[23px] rounded-none cursor-pointer">
            <span className="text-[10px] tracking-[1.68px]">LOGIN</span>
          </Button>
        </Link>
      )}
    </>
  );
}
