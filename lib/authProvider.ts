"use server";
import authOptions from "./authOptions";
import { getServerSession } from "next-auth/next";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}
