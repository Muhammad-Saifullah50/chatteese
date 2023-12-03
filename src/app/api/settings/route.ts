import getCurrentUser from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const currentUser = await getCurrentUser();

        const body = await request.json();

        const { name, image } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return NextResponse.json('Unauthorized', { status: 401 })
        };

        const updatedUser = await prisma?.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                image,
                name
            }
        });

        return NextResponse.json(updatedUser, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json('Something went wrong', { status: 500 })
    }
}