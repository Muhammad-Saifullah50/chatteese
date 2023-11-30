import { withAuth } from "next-auth/middleware";
import { redirect, usePathname } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

// export const middleware = (request: NextRequest) => {

   
    // const pathname = request.nextUrl.pathname
    // console.log(pathname, 'pathname')
    // const token = request.cookies.get('next-auth.session-token')
    // console.log(token, 'token')



    // if (token && pathname !== '/users') {
    //     redirect('/users')
    // }
// }

export default withAuth({
    pages: {
        signIn: '/'
    }
})

export const config = {
    matcher: [
        '/users/:path*'
    ]
};