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

// Adjust UserList type if your User model has more fields
// type UserList = User & { ... }
type UserList = User & { role?: { name: string } | null };

const UserListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { role } = await getAuthUser();

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    ...(role === "admin"
      ? [{ header: "Actions", accessor: "action" }]
      : []),
  ];

  const renderRow = (item: UserList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="p-4">{item.name}</td>
      <td>{item.email}</td>
      <td>{item.role?.name ?? "N/A"}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="user" type="update" data={item} />
              <FormContainer table="user" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, sort, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.UserWhereInput = {};
  if (queryParams?.search) {
    query.name = { contains: queryParams.search, mode: "insensitive" };
  }

  // Sorting logic
  let orderBy: any = { createdAt: "desc" };
  if (sort === "name-asc") orderBy = { name: "asc" };
  else if (sort === "name-desc") orderBy = { name: "desc" };
  else if (sort === "newest") orderBy = { createdAt: "desc" };
  else if (sort === "oldest") orderBy = { createdAt: "asc" };

  const [data, count] = await prisma.$transaction([
    prisma.user.findMany({
      where: query,
      include: { role: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
      orderBy,
    }),
    prisma.user.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Users</h1>
        
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <FilterWrapper />
          <div className="flex items-center gap-4 self-end">
            {role === "admin" && <FormContainer table="user" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default UserListPage; 