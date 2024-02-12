"use client";
import { useState } from "react";
import { FullConversationType } from "../types";
import { useRouter } from "next/navigation";
import useConversation from "../hooks/useConvasation";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationinBox from "./components/ConversationinBox";
import ConversationBox from "./components/ConversationinBox";

interface ConversationListProps {
  initialItems: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
}) => {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();
  const { conversationId, isOpen } = useConversation();

  return (
    <div>
      <aside
        className={clsx(
          `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-gray-200`,
          isOpen ? `hidden` : `block w-full left-0`
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div>メッセージ</div>
            <div className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition">
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId == item.id}
            />
          ))}
        </div>
      </aside>
    </div>
  );
};

export default ConversationList;
