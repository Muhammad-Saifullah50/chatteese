import getConversations from '@/actions/getConversations'
import ConversationList from '@/components/ConversationList'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const ConversationLayout = async ({ children }: { children: React.ReactNode }) => {
    const conversations = await getConversations();
    return (
        <Sidebar>
            <div className='h-full'>
                <ConversationList
                    //@ts-expect-error  
                    initalItems={conversations}
                />
                {children}
            </div>

        </Sidebar>
    )
}

export default ConversationLayout
