import { getUsers } from "@/actions/users";
import LeadBoard from "@/components/leadboard";
import { getCurrentUser } from "@/lib/authProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead board",
  description:
    "Daily Front-end Development short resources and tricks for React, TypeScript HTML, CSS, and Vanilla JavaScript, alongside essential libraries and tools. Build 10X faster with the best resources",
};

export default async function Component() {
  const users = await getUsers();
  const sessionUser = await getCurrentUser();
  // console.log(sessionUser);
  return <LeadBoard users={users} sessionUser={sessionUser} />;
}
