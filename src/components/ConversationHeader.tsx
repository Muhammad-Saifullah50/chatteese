'use client'
import useOtherUser from "@/hooks/useOtherUser"
import { Conversation, User } from "@prisma/client"
import Link from "next/link"
import { useMemo, useState } from "react"
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2"
import Avatar from "./Avatar"
import ProfileDrawer from "./ProfileDrawer"
import AvatarGroup from "./AvatarGroup"

interface ConversationHeaderProps {
  conversation: Conversation & {
    users: User[]
  }
};

const ConversationHeader = ({ conversation }: ConversationHeaderProps) => {

  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);


  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return ` ${conversation.users.length} members`
    }

    return ''
  }, [conversation]);


  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">

        <div className="flex gap-3 items-center">
          <Link href={'/conversations'} className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer">
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div className="capitalize">
              {conversation.name || otherUser.name}
            </div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal size={32} onClick={() => setDrawerOpen(true)} className='text-sky-500 hover:text-sky-600 cursor-pointer transition' />
      </div>
    </>)
}

export default ConversationHeader
