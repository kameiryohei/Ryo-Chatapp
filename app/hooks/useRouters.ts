import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { HiUser, HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "./useConvasation";

const UseRouters = () => {
  const pathname = usePathname();
  const { converstationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathname == "/conversations" || !!converstationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUser,
        active: pathname == "/users",
      },
      {
        label: "Logout",
        href: "#",
        icon: HiArrowLeftOnRectangle,
        onClick: () => signOut(),
      },
    ],
    [pathname, converstationId]
  );
  return routes;
};
export default UseRouters;
