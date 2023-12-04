import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { pusherServer } from "@/lib/pusher";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(requset: NextApiRequest, response: NextApiResponse) {

    const session = await getServerSession(requset, response, authOptions)

    if (!session?.user?.email) {
        return response.status(401).json({ error: "Unauthorized" })
    }

    const socketId = requset.body.socket_id;
    const channel = requset.body.channel_name;
    const data = {
        user_id: session.user.email
    };

    const authResposne = pusherServer.authorizeChannel(socketId, channel, data);
    return response.send(authResposne);
}