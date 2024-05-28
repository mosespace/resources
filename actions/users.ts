"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getUser(id: any) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error: any) {
    // console.log(error);
    throw error;
  }
}

export async function getUsers() {
  try {
    const users = await db.user.findMany({
      include: {
        resources: true,
        categories: true,
      },
    });
    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllAdmins() {
  try {
    const admins = await db.user.findMany({
      where: {
        role: "ADMIN",
      },
    });
    return admins;
  } catch (error: any) {
    console.log(error);
    throw error; // Ensure errors are propagated for proper error handling
  }
}

export async function updateUser(id: any, data: any) {
  try {
    // Retrieve the user from the database using both id and userId
    const user = await db.user.findUnique({
      where: { id },
    });
    // console.log(`original user: ${user}`);
    // Check if the user exists
    if (!user) {
      throw new Error("User not found");
    }

    // If the user matches, proceed with updating the it
    const updateUser = await db.user.update({
      where: { id },
      data,
    });

    // Perform any necessary post-deletion actions
    revalidatePath("/dashboard");

    console.log(updateUser);
    return updateUser;
  } catch (error: any) {
    console.error("Error updating user:", error);
    throw error;
  }
}
