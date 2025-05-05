import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { prisma } from "@/lib/prisma";
import { User, Prisma } from "@prisma/client";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getAuthUser } from '@/lib/auth';
import UserForm from "@/components/forms/UserForm";
import FilterWrapper from "@/components/FilterWrapper";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import MessageTableRow from "@/components/MessageTableRow";


const columns = [
  { header: "Sender", accessor: "sender" },
  { header: "Receiver", accessor: "receiver" },
  { header: "Content", accessor: "content" },
  { header: "Date", accessor: "date" },
  { header: "Actions", accessor: "action" },
];

const renderRow = (item: any, role: string) => (
  <MessageTableRow item={item} role={role} />
);

const MessagesPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const { role, userId } = await getAuthUser();
  if (!userId) redirect("/sign-in");

  const { page, sort, ...queryParams } = searchParams || {};
  const p = page ? parseInt(page) : 1;

  // Build query for search
  const query: any = {};
  if (queryParams?.search) {
    query.content = { contains: queryParams.search, mode: "insensitive" };
  }

  // Sorting logic
  let orderBy: any = { createdAt: "desc" };
  if (sort === "content-asc") orderBy = { content: "asc" };
  else if (sort === "content-desc") orderBy = { content: "desc" };
  else if (sort === "newest") orderBy = { createdAt: "desc" };
  else if (sort === "oldest") orderBy = { createdAt: "asc" };

  // Fetch messages from API
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const apiUrl = `${baseUrl}/api/messages?query=${encodeURIComponent(JSON.stringify(query))}`;
  const response = await fetch(apiUrl, {
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });
  const { data: messagesData = [], count = 0 } = await response.json();

  // Map sender/receiver names for display
  const tableData = messagesData.slice(ITEM_PER_PAGE * (p - 1), ITEM_PER_PAGE * p).map((msg: any) => ({
    id: msg.id,
    senderName: msg.User_Message_senderIdToUser?.name || msg.senderId,
    receiverName: msg.User_Message_receiverIdToUser?.name || msg.receiverId,
    content: msg.content,
    createdAt: msg.createdAt,
  }));

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP BAR - match All Users layout exactly */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Messages</h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <FilterWrapper />
          <div className="flex items-center gap-4 self-end">
            {role === "admin" && <FormContainer table="message" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={(item: any) => renderRow(item, role)} data={tableData} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default MessagesPage;
