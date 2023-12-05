'use client'

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";
import { FiAlertTriangle } from 'react-icons/fi'
import { Dialog } from "@headlessui/react";
import Button from "../Button";
import { TailSpin } from "react-loader-spinner";

interface ConfirmModalProps {
    isOpen?: boolean;
    onClose: () => void
    variant: 'conversation' | 'message'
    messageId?: string
}
const ConfirmModal = ({ isOpen, onClose, variant, messageId }: ConfirmModalProps) => {
    const router = useRouter();
    const { conversationId } = useConversation();
    const [loading, setLoading] = useState(false);

    const onDelete = useCallback(async () => {
        try {
            setLoading(true)

            if (variant === 'conversation') {
                await axios.delete(`/api/conversations/${conversationId}`)
                onClose()
                toast.success('Conversation Deleted')
                router.push('/conversations')
                router.refresh()
            }

            await axios.delete(`/api/messages`, {
                data: {
                    messageId: messageId,
                    conversationId: conversationId

                }
            });
            onClose()
            toast.success('Message Deleted')

        } catch (error: any) {
            toast.error('Something went wrong')
            console.log(error?.message)
        } finally {
            setLoading(false)
        }
    }, [conversationId, messageId, router, onClose, variant])
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center rounded-full justify-center bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiAlertTriangle className={'h-6 w-6 text-red-600'} />
                </div>

                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                        as='h3'
                        className={'text-base font-semibold leading-6 text-gray-900'}
                    >
                        Delete {variant === 'conversation' ? 'Conversation' : 'Message'}
                    </Dialog.Title>
                    <div className="mt-2 ">
                        <p className="text-sm text-gray-500"> Are you sure you want to delete this {variant === 'conversation' ? 'conversation' : 'message'}? This action cannot be undone</p>
                    </div>
                </div>
            </div>

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <Button
                    disabled={loading}
                    danger
                    onClick={onDelete}>
                    {loading ? 'Deleting' : 'Yes, Delete'}
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

                <Button
                    disabled={loading}
                    secondary
                    onClick={onClose}>
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}

export default ConfirmModal
