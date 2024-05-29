"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createErrorResponse } from "@/utils/errorHandler";

export async function getUser(id: string) {
  if (!id) {
    return createErrorResponse(400, "Bad Request", "User ID is undefined");
  }
  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });
    return { status: "success", data: user };
  } catch (error: any) {
    console.error(error);
    return createErrorResponse(500, "Internal Server Error", error.message);
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
    return { status: "success", data: users };
  } catch (error: any) {
    console.log(error);
    return createErrorResponse(500, "Internal Server Error", error.message);
  }
}

export async function getAllAdmins() {
  try {
    const admins = await db.user.findMany({
      where: {
        role: "ADMIN",
      },
    });
    return { status: "success", data: admins };
  } catch (error: any) {
    console.log(error);
    return createErrorResponse(500, "Internal Server Error", error.message);
  }
}

export async function updateUser(id: string, data: any) {
  if (!id || !data) {
    return createErrorResponse(
      400,
      "Bad Request",
      "User ID  or Data is undefined"
    );
  }
  try {
    // Retrieve the user from the database using both id and userId
    const user = await db.user.findUnique({
      where: { id },
    });
    // console.log(`original user: ${user}`);
    // Check if the user exists
    if (!user) {
      return createErrorResponse(404, "Not Found", "Use Not Found");
    }

    // If the user matches, proceed with updating the it
    const updateUser = await db.user.update({
      where: { id },
      data,
    });

    // Perform any necessary post-deletion actions
    revalidatePath("/dashboard");

    console.log(updateUser);
    return { status: "success", data: updateUser };
  } catch (error: any) {
    console.error("Error updating user:", error);
    return createErrorResponse(500, "Internal Server Error", error.message);
  }
}
