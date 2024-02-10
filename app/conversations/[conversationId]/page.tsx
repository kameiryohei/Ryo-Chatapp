import EmptyState from "@/app/(site)/components/EmptyState";
import getConversationByID from "@/app/acitons/getConversationByID";
import getMessages from "@/app/acitons/getMessages";
import Header from "./Header";

interface IParams {
  conversationId: string;
}
const ConversationID = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationByID(params.conversationId);
  const message = await getMessages(params.conversationId);

  if (!conversation) {
    //ここを否定にすると会話文が出ないようになってるので他の箇所を見直す
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        {/*上のconversationを否定にするとエラー消える*/}
      </div>
    </div>
  );
};

export default ConversationID;
