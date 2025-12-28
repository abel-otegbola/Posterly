'use client'
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { ReactNode, InputHTMLAttributes, useState } from "react";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    disabled?: boolean;
    label?: string;
    name?: string;
    type?: string;
    value?: string | number;
    error?: string | undefined;
    placeholder?: string;
    leftIcon?: ReactNode;
}

export default function Input({ className, disabled, label, name, value, type, onChange, error, placeholder, leftIcon, ...props }: inputProps) {
    const [focus, setFocus] = useState(false)
    const [show, setShow] = useState(false)


    return (
        <div className="flex flex-col w-full gap-2 2xl:text-[16px] md:text-[14px]">
            { label ? <label htmlFor={name} className={`${focus ? "text-primary" : ""}`}>{label}</label> : "" }

            <div className={`flex items-center gap-1 relative rounded-[12px] bg-white w-full border p-1 px-1 duration-500 
                ${error && !focus ? "border-red-500 text-red-500 " : "border-gray-500/[0.2]"}
                ${focus ? "border-primary" : ""}
                ${className}
            `}>
                <span className={`${!focus ? "opacity-[0.4]": "text-primary"} ml-2 ${leftIcon ? "mr-2" : ""}`}>{ leftIcon }</span>
                <input 
                    className={`md:py-[12px] py-[10px] w-full outline-none bg-transparent rounded-[8px]
                        ${className} 
                        ${disabled ? "opacity-[0.25]" : ""}
                    `}
                    name={name}
                    id={name}
                    disabled={disabled}
                    type={type === "password" && show ? "text" : type}
                    value={value}
                    placeholder={placeholder}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={onChange}
                    { ...props }
                />

                { error && !focus ? <p className="absolute right-2 px-2 text-[12px] bg-white text-red-500 backdrop-blur-sm">{error}</p> : "" }
                { type === "password" ? 
                    <span tabIndex={1} className="p-2 cursor-pointer" title="toggle show password" aria-checked={show} onClick={() => setShow(!show)}>{ show ? <Eye /> : <EyeSlash /> }</span>
                : "" }
            </div>
        </div>
    )
}