'use client'

import useConversation from "@/hooks/useConversation"
import { FullMessageType } from "@/types"
import { useEffect, useRef, useState } from "react"
import MessageBox from "./MessageBox"
import axios from "axios"
import { pusherClient } from "@/lib/pusher"
import { find } from "lodash"

interface ConversationBodyProps {
  initialMessages: FullMessageType[]
}

const ConversationBody = ({ initialMessages }: ConversationBodyProps) => {

  const [messages, setMesssages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`)

      setMesssages((current) => {
        if (find(current, { id: message.id })) {
          return current
        };

        return [...current, message]
      });

      bottomRef?.current?.scrollIntoView();

    }

    const UpdateMessageHandler = (newMessage: FullMessageType) => {
      setMesssages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage
        }
        return currentMessage
      }))
    }

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('messages:update', UpdateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('messages:update', UpdateMessageHandler);
    };
  }, [conversationId])
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <MessageBox
          isLast={index === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  )
}

export default ConversationBody
