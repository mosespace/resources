import { getUser } from "@/actions/resources";
import OnBoarding from "@/components/on-boarding";
import { getCurrentUser } from "@/lib/authProvider";
import React from "react";

export default async function page() {
  const user: any = await getCurrentUser();
  const userId = user?.id;
  const dbUser = await getUser(userId);
  

  return <OnBoarding/>;
}
