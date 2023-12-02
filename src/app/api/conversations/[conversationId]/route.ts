import getCurrentUser from "@/actions/getCurrentUser";
import useConversation from "@/hooks/useConversation"
import { NextRequest, NextResponse } from "next/server"
import prisma from '@/lib/prisma'

interface IParams {
    conversationId?: string
}

export const DELETE = async (request: NextRequest, { params }: { params: IParams }) => {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if (!currentUser?.id || !currentUser?.email) {
            return NextResponse.json('Unauthorized', { status: 401 })
        };

        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        });

        if (!existingConversation) {
            return NextResponse.json('Invalid ID', { status: 400 })
        };

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        });

        return NextResponse.json(deletedConversation, { status: 200 })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json('Failed to delete conversation', { status: 500 })
    }
}