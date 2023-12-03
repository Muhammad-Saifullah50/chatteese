import getConversations from '@/actions/getConversations'
import getUsers from '@/actions/getUsers'
import ConversationList from '@/components/ConversationList'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const ConversationLayout = async ({ children }: { children: React.ReactNode }) => {
    const conversations = await getConversations();
    const users = await getUsers();
    return (
        <Sidebar>
            <div className='h-full'>
                <ConversationList
                    users={users}
                    title={'Messages'}
                    //@ts-expect-error  
                    initalItems={conversations}
                />
                {children}
            </div>

        </Sidebar>
    )
}

export default ConversationLayout
