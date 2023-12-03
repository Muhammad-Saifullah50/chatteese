'use client'

import Image from "next/image"
import Modal from "./Modal"

interface ImageModalProps {
    src?: string | null
    isOpen?: boolean
    onClose: () => void
}
const ImageModal = ({ src, isOpen, onClose }: ImageModalProps) => {
    if (!src) return null

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="w-80 h-80">
                <Image
                    src={src}
                    fill
                    className="object-contain"
                    alt="Image"
                />
            </div>
        </Modal>
    )
}

export default ImageModal
