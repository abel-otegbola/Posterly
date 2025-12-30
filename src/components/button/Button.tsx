'use client'
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tertiary";
    className?: string;
    href?: string;
    size?: "small" | "medium" | "large" | "xs";
    disabled?: boolean,
    onClick?: () => void,
    children?: ReactNode
}

export default function Button({ variant, className, href, size, disabled, onClick, children, ...props }: buttonProps) {
    const variants = {
        primary: "hover:bg-black/[0.8] bg-black text-white shadow-sm",
        secondary: "shadow-sm border border-gray-500/[0.2] hover:bg-black/[0.05]",
        tertiary: "rounded-[4px]"
    }

    return (
       <>
            { 
            href ? 
                <Link 
                    role="button" 
                    href={href} 
                    className={`rounded-[12px] flex items-center justify-center md:gap-2 gap-1 w-fit 
                        ${variants[variant || "primary"]} 
                        ${disabled ? "opacity-[0.25]" : ""} 
                        ${size === "xs" ? "rounded-[2px] text-[8px] py-[2px] md:px-[8px] px-[4px]" : size === "small" ? "rounded text-[12px] py-[4px] md:px-[12px] px-[8px]" : size === "large" ? "rounded-[12px] md:py-[16px] py-[10px] md:px-[32px] px-[28px]" : "rounded-[8px] md:py-[16px] py-[14px] md:px-[24px] px-[18px]"} 
                        ${className} 
                    `}
                > 
                    { children }
                </Link>
                : 
                <button 
                    className={`rounded-[12px] duration-500 flex items-center justify-center md:gap-2 gap-1 w-fit cursor-pointer
                        ${variants[variant || "primary"]} 
                        ${disabled ? "opacity-[0.25]" : ""} 
                        ${size === "xs" ? "rounded-[2px] text-[8px] py-[2px] md:px-[8px] px-[4px]" : size === "small" ? "rounded text-[12px] py-[4px] md:px-[12px] px-[8px]" : size === "large" ? "rounded-[12px] md:py-[16px] py-[10px] md:px-[32px] px-[28px]" : "rounded-[8px] md:py-[16px] py-[14px] md:px-[24px] px-[18px]"} 
                        ${className} 
                    `}
                    {...props}
                    name="Button"
                    role="button"
                    disabled={disabled}
                    onClick={onClick}
                >
                { children }
                </button>
        }
    </>
    )
}