'use client'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../Input";
import Modal from "./Modal";
import Button from "../Button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useConversation from "@/hooks/useConversation";
import { TailSpin } from "react-loader-spinner";

interface MenuModalProps {
    isOpen?: boolean;
    onClose: () => void;
    messageId: string;
    message: string | null;
}
const EditModal = ({ isOpen, onClose, messageId, message }: MenuModalProps) => {
    const [loading, setLoading] = useState(false);
    const { conversationId } = useConversation();
    const {
        register,
        handleSubmit,
        formState: { errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setLoading(true)
            await axios.patch('/api/messages', {
                messageId,
                message: data.message,
                conversationId
            });
            toast.success('Message updated')
            onClose();
        } catch (error: any) {
            console.log(error?.message)
            toast.error('Something went wrong')
        } finally {
            setLoading(false);
            onClose();
        }
    }
    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Edit Message"
                    id="message"
                    disabled={loading}
                    register={register}
                    errors={errors}
                    required
                    type="text"
                />

                <div className="mt-6 flex items-center justify-end gap-x-6">

                    <Button
                        secondary
                        disabled={loading}
                        onClick={onClose}
                    >Cancel</Button>
                    <Button
                        disabled={loading}
                        type="submit"
                    >
                        {loading ? 'Editing' : 'Edit'}
                        {loading && (<TailSpin
                            height="18"
                            width="18"
                            color="#fff"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}

                        />)}
                    </Button>
                </div>
            </form>

        </Modal>
    )
}

export default EditModal
