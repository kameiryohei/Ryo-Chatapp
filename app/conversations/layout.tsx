import getConversations from "../acitons/getConversations";
import getUsers from "../acitons/getUsers";
import Sidebar from "../(site)/components/sidebar/Sidebar";
import ConversationList from "./ConversationList";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    //ts-expect-error Sever Component
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} users={users} />
        {children}
      </div>
    </Sidebar>
  );
}
