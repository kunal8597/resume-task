
import { Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <div className="w-full border-t border-white bg-white dark:bg-black dark:border-black">
      <div className="container mx-auto px-4 py-6 flex justify-center items-center flex-col"> 
      

        <p>
              Made with ❤️ by{" "}
              <Link
                href="https://kunalm.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-s hover:text-primary transition-colors"
              >
                Kunal Mathur 
              </Link>
            </p>
      </div>
    </div>
  );
}