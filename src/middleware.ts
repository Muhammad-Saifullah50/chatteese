import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {

    let pathname = request.nextUrl.pathname
    
    let token = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token')

    const publicPath = pathname === '/';

    if (!publicPath && !token) {
        const response = NextResponse.redirect(new URL('/', request.nextUrl))
        return response

    }
    if (token && pathname === '/') {
        const response = NextResponse.redirect(new URL('/users', request.nextUrl))
        return response
    }
    if (token) {
        const response = NextResponse.next()
        return response
    }
}



export const config =
{
    matcher: [
        '/',
        '/users/:path*',
        '/conversations/:path*',
    ]
}