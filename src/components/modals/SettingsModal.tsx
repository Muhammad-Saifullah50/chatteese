"use client"

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "./Modal";
import Input from "../Input";

interface SettingsModalProps {
    isOpen?: boolean;
    onClose: () => void
    currentUser: User
}
const SettingsModal = ({ isOpen, onClose, currentUser }: SettingsModalProps) => {

    const router = useRouter();
    const [loading, setloading] = useState(false);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image
        }
    });

    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setloading(true)
            await axios.post('/api/setings', data)
            router.refresh();
            onClose();
            toast.success('Updated Profile Successfully')
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong')
        } finally {
            setloading(false)
        }
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Edit your public information.</p>

                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input 
                            
                            />
                        </div>
                    </div>
                </div>

            </form>
        </Modal>
    )
}

export default SettingsModal
