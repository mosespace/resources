"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getUser(id: any) {
  try {
    if (!id) {
      throw new Error("User ID is undefined");
    }
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function postResource(data: any) {
  try {
    if (!data) {
      throw new Error("User ID is undefined");
    }
    const resource = await db.resource.create({
      data,
    });
    revalidatePath("/dashboard");
    console.log("The following resource was created:", resource);
    return resource;
  } catch (error: any) {
    console.log(error);
  }
}

export async function getResources() {
  try {
    const resources = await db.resource.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return resources;
  } catch (error: any) {
    console.log(error);
  }
}

export async function findResource(id: any) {
  // console.log(id);
  if (!id) {
    throw new Error("User ID is undefined");
  }
  try {
    const resource = await db.resource.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });
    revalidatePath("/dashboard");
    return resource;
  } catch (error: any) {
    console.log(error);
  }
}

export async function updateResource(id: any, data: any, userId: any) {
  try {
    // Retrieve the resource from the database using both id and userId
    const resource = await db.resource.findUnique({
      where: { id },
      select: { userId: true }, // Only select the userId field
    });

    // Check if the resource exists
    if (!resource) {
      throw new Error("Task not found");
    }

    // Check if the userId of the resource matches the provided userId
    if (resource.userId !== userId) {
      throw new Error("Unauthorized update attempt");
    }

    // If the userId matches, proceed with updating the resource
    const updateTask = await db.resource.update({
      where: { id },
      data,
    });

    // Perform any necessary post-deletion actions
    revalidatePath("/dashboard");

    console.log(updateTask);
    return updateTask;
  } catch (error: any) {
    console.error("Error updating resource:", error);
    throw error;
  }
}

export async function deleteResource(id: any, userId: any) {
  // console.log(id, userId);
  try {
    // Retrieve the resource from the database using both id and userId
    const resource = await db.resource.findUnique({
      where: { id },
      select: { userId: true }, // Only select the userId field
    });

    // Check if the resource exists
    if (!resource) {
      throw new Error("Task not found");
    }

    // Check if the userId of the resource matches the provided userId
    if (resource.userId !== userId) {
      throw new Error("Unauthorized deletion attempt");
    }

    // If the userId matches, proceed with deleting the resource
    const deletedTask = await db.resource.delete({
      where: { id },
    });

    // Perform any necessary post-deletion actions
    revalidatePath("/dashboard");

    // console.log(deletedTask);
    return deletedTask;
  } catch (error: any) {
    console.error("Error deleting resource:", error);
    throw error;
  }
}

