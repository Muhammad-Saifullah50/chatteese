'use client'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import Avatar from './Avatar'


const UserBox = ({ data }: { data: User }) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = useCallback(() => {

        try {
            setIsLoading(true)

            axios.post('/api/coversations', {
                userId: data.id
            });

            router.push(`/conversations/${data.id}`)
        } catch (error) {

        } finally {
            setIsLoading(false)
        }

    }, [data, router])

    return (
        <div
            onClick={handleClick}
            className='w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer'
        >
            <Avatar user={data} />
            <div className='min-w-0 flex-1'>
                <div className='focus:outline-none'>

                </div>
            </div>
        </div>
    )
}

export default UserBox
