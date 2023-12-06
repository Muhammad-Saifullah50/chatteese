
import getCurrentUser from "./getCurrentUser";
import prisma from '@/lib/prisma';
const getConversations = async () => {
    const currentUser = await getCurrentUser();
    console.log(currentUser)

    if (!currentUser) {
        return []
    }

    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc'
            },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    }
                }
            }
        });

        return conversations
    } catch (error: any) {
        console.log(error?.message)
        return []
    }
}

export default getConversations