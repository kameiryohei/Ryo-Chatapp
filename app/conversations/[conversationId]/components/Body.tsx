"use client";

import useConversation from "@/app/hooks/useConvasation";
import { FullMessageType } from "@/app/types";
import { useRef, useState } from "react";

interface BodyProps {
  initialMessage: FullMessageType[];
}
const Body: React.FC<BodyProps> = ({ initialMessage }) => {
  const [messages, setMessages] = useState(initialMessage);
  const buttonRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="pt-24" ref={buttonRef} />
    </div>
  );
};

export default Body;
