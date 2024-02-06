import Sidebar from "../(site)/components/sidebar/Sidebar";
export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    //ts-expect-error Sever Component
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
