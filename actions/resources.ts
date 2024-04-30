"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { parse } from "node-html-parser";

export async function postResource(data: any) {
  try {
    if (!data) {
      throw new Error("Data is undefined");
    }

    // Correctly structure the data for creating a new resource with a relation to a user
    const resource = await db.resource.create({
      data: {
        name: data.name,
        description: data.description,
        url: data.url,
        slug: data.slug,
        category: {
          connect: { id: data.category },
        },
        user: {
          connect: { id: data.userId },
        },
      },
    });

    revalidatePath("/dashboard");
    // console.log("The following resource was created:", resource);
    return resource;
  } catch (error: any) {
    console.log(error);
    throw error; // It's generally a good idea to re-throw the error or handle it appropriately
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

export async function updateResource(id: any, data: any) {
  try {
    // Retrieve the resource from the database using both id and userId
    const resource = await db.resource.findUnique({
      where: { id },
    });

    // Check if the resource exists
    if (!resource) {
      throw new Error("Resource not found");
    }

    // If the resource matches, proceed with updating the it
    const updatedResource = await db.resource.update({
      where: { id },
      data,
    });

    // Perform any necessary post-deletion actions
    revalidatePath("/dashboard");

    console.log(updatedResource);
    return updatedResource;
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
      throw new Error("Resource not found");
    }

    // Check if the userId of the resource matches the provided userId
    if (resource.userId !== userId) {
      throw new Error("Unauthorized deletion attempt");
    }

    // If the userId matches, proceed with deleting the resource
    const deleteResource = await db.resource.delete({
      where: { id },
    });

    // Perform any necessary post-deletion actions
    revalidatePath("/dashboard");

    // console.log(deleteResource);
    return deleteResource;
  } catch (error: any) {
    console.error("Error deleting resource:", error);
    throw error;
  }
}

export async function fetchOGImage(url: any) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const root = parse(html);
    // console.log(root);
    const ogImageElement = root.querySelector('meta[property="og:image"]');

    if (ogImageElement) {
      return ogImageElement.getAttribute("content");
    }
  } catch (error) {
    console.error("Error fetching OG image:", error);
  }
  return null;
}
