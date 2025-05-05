"use client";
import React, { useState } from "react";
import Image from "next/image";
import FormContainer from "@/components/FormContainer";
import MessageDetailsDialog from "@/components/MessageDetailsDialog";

const MessageTableRow = ({ item, role }: { item: any; role: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
        <td className="p-4">{item.senderName}</td>
        <td>{item.receiverName}</td>
        <td>{item.content}</td>
        <td>{new Date(item.createdAt).toLocaleString()}</td>
        <td>
          <div className="flex items-center gap-2">
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky"
              onClick={() => setOpen(true)}
            >
              <Image src="/message.png" alt="View" width={14} height={14} />
            </button>
            {role === "admin" && (
              <>
                <FormContainer table="message" type="update" data={item} />
                <FormContainer table="message" type="delete" id={item.id} />
              </>
            )}
          </div>
        </td>
      </tr>
      <MessageDetailsDialog open={open} onClose={() => setOpen(false)} message={item} />
    </>
  );
};

export default MessageTableRow; 