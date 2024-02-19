import { User } from "@prisma/client";

interface AvatarGroupProps {
  users?: User[];
}
const AvatarGroup: React.FC<AvatarGroupProps> = ({ users }) => {
  const slicedUsers = users?.slice(0, 3);

  const positionMap = {
    0: "top-0 left-[12px]",
    1: "button-0",
    2: "button-0 right-0",
  };
  return (
    <div className="relative h-11 w-11">
      {slicedUsers?.map((user, index) => (
        <div
          key={user.id}
          className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] ${
            positionMap[index as keyof typeof positionMap]
          }`}
        >
          <img alt="avatar" src={user?.image || "/images/placeholder.jpg"} />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
