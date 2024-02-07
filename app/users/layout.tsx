import Sidebar from "../(site)/components/sidebar/Sidebar";
import getUsers from "../acitons/getUsers";
import UserList from "./components/UserList";
export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    //ts-expect-error Sever Component
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
