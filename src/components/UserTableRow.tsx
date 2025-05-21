"use client";

import { useState } from "react";
import Image from "next/image";
import FormContainer from "@/components/FormContainer";
import UserLoginDialog from "@/components/UserLoginDialog";
import { User } from "@prisma/client";

type UserList = User & { 
  id: string;
  name: string;
  email: string;
  role?: { name: string } | null;
};

interface UserTableRowProps {
  item: UserList;
  role: string;
}

const UserTableRow: React.FC<UserTableRowProps> = ({ item, role }) => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  return (
    <>
      <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
        <td className="p-4">{item.name}</td>
        <td>{item.email}</td>
        <td>{item.role?.name ?? "N/A"}</td>
        {role === "admin" && (
          <>
            <td>
              <button
                className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurpleLight"
                onClick={() => setLoginDialogOpen(true)}
              >
                <Image src="/user_login.png" alt="Login" width={14} height={14} />
              </button>
            </td>
            <td>
              <div className="flex items-center gap-2">
                <FormContainer table="user" type="update" data={item} />
                <FormContainer table="user" type="delete" id={item.id} />
              </div>
            </td>
          </>
        )}
      </tr>
      <UserLoginDialog 
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        user={item}
      />
    </>
  );
};

export default UserTableRow;
