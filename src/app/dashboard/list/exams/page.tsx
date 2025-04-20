import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Exam, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

type ExamList = Exam & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};

type SessionClaims = {
  metadata?: {
    role?: string;
  };
};

const ExamsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await auth();
  const role = (session?.sessionClaims as unknown as SessionClaims)?.metadata?.role;
  const currentUserId = session?.userId;

  try {
    const { page, ...queryParams } = searchParams;
    const p = page ? parseInt(page) : 1;

    let query: Prisma.ExamWhereInput = {};

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value) {
          switch (key) {
            case "classId":
              query = {
                ...query,
                lesson: {
                  ...query.lesson,
                  classId: value
                }
              };
              break;
            case "teacherId":
              query = {
                ...query,
                lesson: {
                  ...query.lesson,
                  teacherId: value
                }
              };
              break;
            case "search":
              query = {
                ...query,
                lesson: {
                  ...query.lesson,
                  subject: {
                    name: { contains: value, mode: "insensitive" }
                  }
                }
              };
              break;
          }
        }
      });
    }

    if (currentUserId) {
      switch (role) {
        case "admin":
          break;
        case "teacher":
          query = {
            ...query,
            lesson: {
              ...query.lesson,
              teacherId: currentUserId
            }
          };
          break;
        case "student":
          query = {
            ...query,
            lesson: {
              ...query.lesson,
              class: {
                students: {
                  some: {
                    id: currentUserId,
                  },
                },
              },
            }
          };
          break;
        case "parent":
          query = {
            ...query,
            lesson: {
              ...query.lesson,
              class: {
                students: {
                  some: {
                    parentId: currentUserId,
                  },
                },
              },
            }
          };
          break;
        default:
          break;
      }
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/exams?${new URLSearchParams({
        query: JSON.stringify(query)
      })}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch exams');
    }

    const { data: examsData, count: examsCount } = await response.json();

    const columns = [
      {
        header: "Subject Name",
        accessor: "name",
      },
      {
        header: "Class",
        accessor: "class",
      },
      {
        header: "Teacher",
        accessor: "teacher",
        className: "hidden md:table-cell",
      },
      {
        header: "Date",
        accessor: "date",
        className: "hidden md:table-cell",
      },
      ...(role === "admin" || role === "teacher"
        ? [
            {
              header: "Actions",
              accessor: "action",
            },
          ]
        : []),
    ];

    const renderRow = (item: ExamList) => (
      <tr
        key={item.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
      >
        <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
        <td>{item.lesson.class.name}</td>
        <td className="hidden md:table-cell">
          {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
        </td>
        <td className="hidden md:table-cell">
          {new Intl.DateTimeFormat("en-US").format(item.date)}
        </td>
        <td>
          <div className="flex items-center gap-2">
            {(role === "admin" || role === "teacher") && (
              <>
                <FormContainer table="exam" type="update" data={item} />
                <FormContainer table="exam" type="delete" id={item.id} />
              </>
            )}
          </div>
        </td>
      </tr>
    );

    return (
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 self-end">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/filter.png" alt="" width={14} height={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/sort.png" alt="" width={14} height={14} />
              </button>
              {(role === "admin" || role === "teacher") && (
                <FormContainer table="exam" type="create" />
              )}
            </div>
          </div>
        </div>
        {/* LIST */}
        <Table columns={columns} renderRow={renderRow} data={examsData} />
        {/* PAGINATION */}
        <Pagination page={p} count={examsCount} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching exams:', error);
    return (
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TableSearch />
            <div className="flex items-center gap-4 self-end">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/filter.png" alt="" width={14} height={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                <Image src="/sort.png" alt="" width={14} height={14} />
              </button>
              {(role === "admin" || role === "teacher") && (
                <FormContainer table="exam" type="create" />
              )}
            </div>
          </div>
        </div>
        {/* LIST */}
        <p>Error fetching exams. Please try again later.</p>
      </div>
    );
  }
};

export default ExamsPage;
