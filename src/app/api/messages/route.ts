import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma'
import { pusherServer } from "@/lib/pusher";

export const POST = async (request: NextRequest) => {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();

        const { message, image, conversationId } = body;
        console.log(message)

        if (!currentUser?.id || !currentUser?.email) {
            return NextResponse.json('Unauthorized', { status: 401 })
        };

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId
                    },
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                seen: true,
                sender: true
            }
        });

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        });

        await pusherServer.trigger(conversationId, 'messages:new', newMessage);

        const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

        updatedConversation.users.map((user) => {
            pusherServer.trigger(user.email!, 'conversation:update', {
                id: conversationId,
                messages: [lastMessage],
            });
        });

        return NextResponse.json(newMessage, { status: 200 })
    } catch (error: any) {
        console.log(error, 'error')
        return NextResponse.json('Failed to post message', { status: 500 })
    }
}

export const DELETE = async (request: NextRequest) => {
    const body = await request.json();
    const currentUser = await getCurrentUser();

    const { messageId, conversationId } = body

    if (!currentUser?.id || !currentUser?.email) {
        return NextResponse.json('Unauthorized', { status: 401 })
    };

    try {
        const deletedMessage = await prisma.message.delete({
            where: {
                id: messageId
            }
        });

        await pusherServer.trigger(conversationId, 'messages:remove', deletedMessage);


        return NextResponse.json(deletedMessage, { status: 200 })
    } catch (error: any) {
        console.error(error, 'error')
        return NextResponse.json('Failed to delete message', { status: 500 })

    }
}

export const PATCH = async (request: NextRequest) => {
    const body = await request.json();
    const currentUser = await getCurrentUser();
}