"use server";

import { db } from "@/lib/db";
import { parse } from "node-html-parser";
import { revalidatePath } from "next/cache";
import { createErrorResponse } from "@/utils/errorHandler";

export async function postResource(data: any) {
  try {
    if (!data) {
      return createErrorResponse(400, "Bad Request", "Data is undefined");
    }

    const resource = await db.resource.create({
      data: {
        name: data.name,
        description: data.description,
        url: data.url,
        slug: data.slug,
        isApproved: data.isApproved,
        category: {
          connect: { id: data.category },
        },
        user: {
          connect: { id: data.userId },
        },
      },
    });

    revalidatePath("/");
    return { status: "success", data: resource };
  } catch (error: any) {
    console.error(error);
    return createErrorResponse(500, "Internal Server Error", error.message);
  }
}

export async function getResources() {
  try {
    const resources = await db.resource.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return { status: "success", data: resources };
  } catch (error: any) {
    console.error(error);
    return createErrorResponse(500, "Internal Server Error", error.message);
  }
}

export async function findResource(id: any) {
  if (!id) {
    return createErrorResponse(400, "Bad Request", "Resource ID is undefined");
  }
  try {
    const resource = await db.resource.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!resource) {
      return createErrorResponse(404, "Not Found", "Resource not found");
    }

    revalidatePath("/");
    return { status: "success", data: resource };
  } catch (error: any) {
    console.error(error);
    return createErrorResponse(500, "Internal Server Error", error.message);
  }
}

export async function updateResource(id: any, data: any) {
  try {
    const resource = await db.resource.findUnique({
      where: { id },
    });

    if (!resource) {
      return createErrorResponse(404, "Not Found", "Resource not found");
    }

    const updatedResource = await db.resource.update({
      where: { id },
      data,
    });

    revalidatePath("/");
    return { status: "success", data: updatedResource };
  } catch (error: any) {
    console.error("Error updating resource:", error);
    return createErrorResponse(500, "Internal Server Error", error.message);
  }
}

export async function deleteResource(id: any, userId: any) {
  try {
    const resource = await db.resource.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!resource) {
      return createErrorResponse(404, "Not Found", "Resource not found");
    }

    if (resource.userId !== userId) {
      return createErrorResponse(
        403,
        "Forbidden",
        "Unauthorized deletion attempt"
      );
    }

    const deletedResource = await db.resource.delete({
      where: { id },
    });

    revalidatePath("/");
    return { status: "success", data: deletedResource };
  } catch (error: any) {
    console.error("Error deleting resource:", error);
    return createErrorResponse(500, "Internal Server Error", error.message);
  }
}

export async function fetchOGImage(url: any) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const root = parse(html);
    const ogImageElement = root.querySelector('meta[property="og:image"]');

    if (ogImageElement) {
      return {
        status: "success",
        data: ogImageElement.getAttribute("content"),
      };
    } else {
      return createErrorResponse(404, "Not Found", "OG image not found");
    }
  } catch (error: any) {
    console.error("Error fetching OG image:", error);
    return createErrorResponse(500, "Internal Server Error", error.message);
  }
}
