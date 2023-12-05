'use client'

import { FullMessageType } from "@/types"
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./modals/ImageModal";
import { BsThreeDotsVertical } from "react-icons/bs";
import ConfirmModal from "./modals/ConfirmModal";
import EditModal from "./modals/EditModal";


interface MessageBoxProps {
    data: FullMessageType;
    isLast?: boolean
}
const MessageBox = ({ data, isLast }: MessageBoxProps) => {

    const session = useSession();
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectOpen, setSelectOpen] = useState(false);


    const isOwn = session?.data?.user?.email === data?.sender?.email

    const seenList = (data.seen || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.name)
        .join(', ');

    const container = clsx('flex gap-3 p-4',
        isOwn && 'justify-end')

    const avatar = clsx(isOwn && 'order-2')

    const body = clsx('flex flex-col gap-2',
        isOwn && 'items-end')

    const message = clsx('text-sm w-fit overflow-hidden ',
        isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100', data?.image ? 'rounded-lg p-0' : 'rounded-lg py-2 px-3');

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>
            <div className={`${body}`}>
                <div className="flex items-center gap-1 ">
                    <div className="text-sm text-gray-500">
                        {data?.sender?.name}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(data.createdAt), 'p')}
                    </div>
                </div>

                <div className="flex  items-center">
                    {selectOpen && (
                        <div className="absolute mt-24 text-sm rounded-md right-12 ">
                            <option
                                className="bg-gray-200 px-4 py-1 hover:bg-sky-500 rounded-t-md"
                                value="edit"
                                onClick={() => {
                                    setEditModalOpen(true);
                                    setSelectOpen(false)
                                }}>
                                Edit
                            </option>
                            <option
                                className="bg-gray-200 px-4 py-1  hover:bg-sky-500 rounded-b-md"
                                value="delete"
                                onClick={() => {
                                    setConfirmModalOpen(true);
                                    setSelectOpen(false)
                                }}>
                                Delete
                            </option>
                        </div>
                    )}

                    <div className={message}>
                        <EditModal
                            isOpen={editModalOpen}
                            onClose={() => setEditModalOpen(false)}
                            message={data.body}
                            messageId={data.id}
                        />
                        <ConfirmModal
                            variant="message"
                            isOpen={confirmModalOpen}
                            onClose={() => setConfirmModalOpen(false)}
                            messageId={data.id}
                        />

                        <ImageModal
                            src={data.image}
                            isOpen={imageModalOpen}
                            onClose={() => setImageModalOpen(false)}
                        />
                        {data?.image ? (
                            <Image
                                onClick={() => setImageModalOpen(true)}
                                src={data.image}
                                alt="image"
                                height={250}
                                width={250}
                                className="object-cover hover:scale-110 transition translate cursor-pointer"
                            />
                        ) : (
                            <div >
                                {data?.body}
                            </div>
                        )}
                    </div>
                    {isOwn && <BsThreeDotsVertical
                        size={20}
                        className='text-sky-500 hover:text-sky-600'
                        onClick={() => setSelectOpen((prev) => !prev)}
                    />}
                </div>


                {isLast && isOwn && seenList.length > 0 && (
                    <div className="text-xs font-light text-gray-500">
                        {`Seen by ${seenList}`}
                    </div>
                )}


            </div>
        </div>
    )
}

export default MessageBox
