import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const POST = async (request: NextRequest) => {

    try {
        const body = await request.json()

        const { name, email, password } = body

        if (!name || !email || !password) {
            return NextResponse.json('Missing credentials', { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword
            }
        });

        return NextResponse.json('User registered successfully', { status: 200 })
    } catch (error: any) {
        return NextResponse.json(`Failed to register user ${error?.message}`, { status: 500 })

    }


} 