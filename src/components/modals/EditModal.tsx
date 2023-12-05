'use client'

import Modal from "./Modal";

interface MenuModalProps {
    isOpen?: boolean;
    onClose: () => void
}
const EditModal = ({ isOpen, onClose }: MenuModalProps) => {
    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
        >

        </Modal>
    )
}

export default EditModal
