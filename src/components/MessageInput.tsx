'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    placeholder?: string;
    id: string;
    type?: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    required?: boolean;
}
const MessageInput = ({ placeholder, id, type, register, errors, required }: MessageInputProps) => {
    return (
        <div className="relative w-full">
            <input
                id={id}
                type={type}
                autoComplete={id}
                placeholder={placeholder}
                {...register(id, { required })}
                className="text-black font-light py-1.5 px-4 bg-neutral-100 w-full rounded-lg focus:outline-none"
            />
        </div>
    )
}

export default MessageInput
