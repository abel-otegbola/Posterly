'use client'
import { GearIcon, HouseIcon, PaletteIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../button/Button";

function Topbar() {
  const pathname = usePathname()
  return (
    <header className="flex justify-between p-4 items-center max-w-4xl mx-auto w-full">
        <h1 className="font-semibold text-[16px] w-[200px]">Posterly</h1>
        <div className="md:static fixed md:w-auto w-full bg-white bottom-0 left-0 md:border-none border-t border-gray-500/[0.2] flex items-center md:justify-center justify-between gap-10 p-4  z-[100]">
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
  )
}

export default Topbar