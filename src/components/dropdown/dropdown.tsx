'use client'
import { ReactNode, useState } from "react";
import { useOutsideClick } from "../../hooks/useClickOutside";

type option = {
  id: string | number;
  icon?: ReactNode;
  title: string;
  onClick?: () => void;
}

interface dropdownProps {
    className?: string;
    disabled?: boolean;
    label?: string;
    name?: string;
    value: string | number;
    onChange: (value: string) => void;
    error?: string | undefined;
    options?: option[];
    placeholder?: string
}

export default function Dropdown({ className, disabled, label, name, options = [], value, onChange, error, placeholder = "Select option" }: dropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const dropdownRef = useOutsideClick(setIsOpen, false)

    const filteredOptions = options.filter(option => 
        option.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const selectedOption = options.find(opt => opt.title === value)

    const handleSelect = (optionTitle: string) => {
        onChange(optionTitle)
        setIsOpen(false)
        setSearchQuery("")
    }

    return (
        <div className={`relative flex flex-col gap-1 ${className}`} ref={dropdownRef}>
                { label ? <label htmlFor={name} className={`text-[12px] ${isOpen ? "text-primary" : ""}`}>{label}</label> : "" }

            <div className={`flex items-center relative rounded-[12px] bg-white w-full py-1 pl-1 border duration-500 z-[1] 
                ${error && !isOpen ?  "border-red-500 text-red-500 " : "border-[#E2E5EC]"}
                ${isOpen ? "border-primary dark:border-primary shadow-input-active" : ""}
                ${disabled ? "opacity-[0.25] cursor-not-allowed" : "cursor-pointer"}
            `}>
                <button
                    type="button"
                    className={`p-1 w-full outline-none bg-transparent text-left flex items-center justify-between
                        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
                    `}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                >
                    <span className={`flex items-center gap-2 ${!selectedOption ? "text-gray-400" : ""}`}>
                        {selectedOption?.icon}
                        {selectedOption?.title || placeholder}
                    </span>
                    <span
                        className={` transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                    >
                      <i className="la la-angle-down"></i>
                    </span>
                </button>

                { error && !isOpen ? <p className="absolute right-2 px-2 text-[12px] bg-white text-red-500 backdrop-blur-sm">{error}</p> : "" }
            </div>

            {/* Custom Dropdown Menu */}
            {isOpen && (
                <div className="absolute bottom-full left-0 right-0 mt-1 bg-white border border-gray-500/[0.2] rounded shadow-lg z-50 max-h-[300px] overflow-hidden">
                    {/* Search Input */}
                    <div className="p-1 border-b border-gray-500/[0.2]">
                        <input
                            type="text"
                            className="w-full p-2 outline-none bg-transparent border border-gray-500/[0.2] rounded focus:border-primary placeholder:text-gray-400"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    {/* Options List */}
                    <div className="overflow-y-auto max-h-[250px]">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map(option => (
                                <button
                                    key={option.id}
                                    type="button"
                                    className={`w-full px-4 py-3 text-left flex items-center gap-2 hover:bg-primary/[0.1] transition-colors
                                        ${option.title === value ? 'bg-primary text-white' : ''}
                                    `}
                                    onClick={() => {handleSelect(option.title); option.onClick?.()}}
                                >
                                    {option.icon}
                                    {option.title}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-gray-500 text-center">
                                No options found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}