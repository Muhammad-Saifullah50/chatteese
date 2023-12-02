'use client'

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";
import { FiAlertTriangle } from 'react-icons/fi'

interface ConfirmModalProps {
    isOpen?: boolean;
    onClose: () => void
}
const ConfirmModal = ({ isOpen, onClose }: ConfirmModalProps) => {
    const router = useRouter();
    const { conversationId } = useConversation();
    const [loading, setLoading] = useState(false);

    const onDelete = useCallback(async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/conversations/${conversationId}`)
            onClose()
            toast.success('Conversation Deleted')
            router.push('/conversations')
            router.refresh()
        } catch (error: any) {
            toast.error('Something went wrong')
            console.log(error?.message)
        } finally {
            setLoading(false)
        }
    }, [conversationId, router, onClose])
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center rounded-full justify-center bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiAlertTriangle className={'h-6 w-6 text-red-600'}/>
                </div>

                <div>
                    
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmModal
