'use client'
import Button from "@/components/button/Button";
import { GearIcon, HouseIcon, PaletteIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname()

  return (
    <main className="bg-[url('/bg.svg')] bg-cover bg-top min-h-screen flex flex-col">
      <header className="flex justify-between 2xl:p-8 md:p-6 p-4 items-center max-w-4xl mx-auto w-full">
        <h1 className="font-semibold text-[16px] w-[200px]">Posterly</h1>
        <div className="md:static fixed md:w-auto w-full bg-white bottom-0 left-0 md:border-none border-t border-gray-500/[0.2] flex items-center md:justify-center justify-between gap-10 p-4">
        {
          [
            { id: 0, name: "Home", icon: <HouseIcon className="md:text-lg text-2xl" /> }, 
            { id: 1, name: "Create", icon: <PaletteIcon className="md:text-lg text-2xl" /> }, 
            { id: 2, name: "Settings", icon: <GearIcon className="md:text-lg text-2xl" /> }, 
          ].map((item) => (
            <Link
              key={item.name}
              href={item.name === "Home" ? "/" : `/${item.name.toLowerCase()}`}
              className={`flex md:flex-row flex-col items-center gap-1 text-[14px] font-medium hover:underline underline-offset-4 duration-500 transition-all ${pathname === (item.name === "Home" ? "/" : `/${item.name.toLowerCase()}`) ? " underline" : ""}`}
            >
              {item.icon}
              <p className="md:text-sm text-[10px]">{item.name}</p>

            </Link>
          ))
        }
        </div>
        <div className="w-[200px] flex justify-end items-center">
          <Button variant="secondary" href="/create">Create</Button>
        </div>
      </header>

      <section className="flex flex-col items-center 2xl:gap-8 md:gap-6 gap-4 2xl:p-12 md:p-10 p-6">
        <h2 className="2xl:text-[48px] md:text-[40px] text-[32px] max-w-2xl md:leading-[40px] leading-[40px] font-semibold text-center">
          AI-Powered Poster Generator for Your Business
        </h2>

        <p className="text-center max-w-2xl leading-[24px] mb-4">
          Transform your ideas into professional, eye-catching posters instantly with the power of AI. No design skills required—just input your text and watch as our intelligent platform creates stunning visuals tailored to your brand and message.
        </p>

        <div className="relative">
          <div className="absolute dark:top-[5%] top-[5%] left-[1%] w-[98%] dark:h-[90%] h-[90%] z-[-1] btn-bg p-2 backdrop-blur-[15px] rounded-[12px] bg-opacity-80 ">
          </div>
          <Button className="z-2" href="/create">Get Started for free</Button>
        </div>
      </section>

      <div className="p-4">
        <Image src="/hero-bg-2.png" alt="Posterly app mockup" width={1920} height={1080} className="md:w-[75%] w-full h-auto mt-auto mx-auto" />
      </div>
    </main>
  );
}
