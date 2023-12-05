'use client'

import { User } from "@prisma/client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "./Modal";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import { TailSpin } from "react-loader-spinner";

interface GroupChatModalProps {
    users: User[];
    isOpen?: boolean;
    onClose: () => void;
}
const GroupChatModal = ({ isOpen, onClose, users }: GroupChatModalProps) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: []
        }
    });

    const members = watch('members');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        try {
            setLoading(true);

            axios.post('/api/conversations', {
                ...data,
                isGroup: true
            });
            onClose();
            router.refresh();
            toast.success('Group created successfully');

        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        };

    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Create a group chat
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Create a chat with more than two people</p>
                        <div className="mt-10  flex flex-col gap-y-8">
                            <Input
                                register={register}
                                label="Group Name"
                                id="name"
                                disabled={loading}
                                required
                                errors={errors}
                            />
                            <Select
                                disabled={loading}
                                label="Members"
                                options={users.map((user) => ({
                                    value: user.id,
                                    label: user.name
                                }))}
                                onChange={(value: any) => {
                                    setValue('members', value, {
                                        shouldValidate: true
                                    })
                                }}
                                value={members}
                            />
                        </div>
                    </div>
                </div>

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
                        {loading ? 'Creating' : 'Create'}
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

export default GroupChatModal
