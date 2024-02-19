"use client";

import useConversation from "@/app/hooks/useConvasation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";

interface BodyProps {
  initialMessage: FullMessageType[];
}
const Body: React.FC<BodyProps> = ({ initialMessage }) => {
  const [messages, setMessages] = useState(initialMessage);
  const buttonRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    buttonRef?.current?.scrollIntoView();

    const messagesHandler = (message: FullMessageType) => {};

    pusherClient.bind("message:new", messagesHandler);
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("message:new", messagesHandler);
    };
  }, [conversationId]);
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i == messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-24" ref={buttonRef} />
    </div>
  );
};

export default Body;
