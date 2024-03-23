import { getUsers } from "@/actions/resources";
import LeadBoard from "@/components/leadboard";
import { getCurrentUser } from "@/lib/authProvider";

export default async function Component() {
  const users = await getUsers();
  const sessionUser = await getCurrentUser()
  // console.log(users);
  return (
    <LeadBoard users={users} sessionUser={sessionUser}/>
  );
}
