import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface SessionClaims {
  metadata: {
    role: string;
  };
}

const MessagesPage = async () => {
  const session = await auth();
  const role = (session?.sessionClaims as unknown as SessionClaims)?.metadata?.role;
  const currentUserId = session?.userId;

  if (!session || !currentUserId) {
    redirect("/sign-in");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <p>Messages content will be displayed here.</p>
      </div>
    </div>
  );
};

export default MessagesPage;
