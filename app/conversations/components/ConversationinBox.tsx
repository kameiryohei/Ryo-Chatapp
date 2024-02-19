import { useSession } from "next-auth/react";
import { FullConversationType } from "@/app/types";
import { User, Conversation, Message } from "@prisma/client";
import { format } from "date-fns";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/(site)/components/Avatar";
import AvatarGroup from "@/app/(site)/components/AvatarGroup";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);
  const lastMesssage = useMemo(() => {
    const message = data.messages || [];
    return message[message.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMesssage) {
      return false;
    }

    const seenArray = lastMesssage.seen || [];

    if (!userEmail) {
      return false;
    }
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMesssage]);

  const lasMessageText = useMemo(() => {
    if (lastMesssage?.image) {
      return "画像が送信されました";
    }
    if (lastMesssage?.body) {
      return lastMesssage.body;
    }
    return "チャットを開始";
  }, [lastMesssage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `w-full relative flex items-center space-x-3 hover:bg-neutral-200 rounded-lg transition cursor-pointer p-3`,
        selected ? `bg-neutral-100` : `bg-white`
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex justify-between items-center mb-1">
          <p className="text-md font-medium text-gray-950">
            {data.name || otherUser.name}
          </p>
          {lastMesssage?.createdAt && (
            <p className="text-xs text-gray-500">
              {format(new Date(lastMesssage.createdAt), "p")}
            </p>
          )}
        </div>
        <p
          className={clsx(
            `truncate text-sm`,
            hasSeen ? `text-gray-500` : `text-blue-700 font-medium`
          )}
        >
          {lasMessageText}
        </p>
      </div>
    </div>
  );
};
export default ConversationBox;
