"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function postCategory(data: any) {
  try {
    const category = await db.category.create({
      data,
    });
    revalidatePath("/start");
    console.log("The following category was created:", category);
    return category;
  } catch (error: any) {
    console.log(error);
  }
}

export async function getCategories() {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return categories;
  } catch (error: any) {
    console.log(error);
  }
}

export async function findCategory(id: any) {
  // console.log(id);
  if (!id) {
    throw new Error("User ID is undefined");
  }
  try {
    const category = await db.category.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
    revalidatePath("/");
    return category;
  } catch (error: any) {
    console.log(error);
  }
}

export async function updateCategory(id: any, data: any, userId: any) {
  try {
    // Retrieve the category from the database using both id and userId
    const category = await db.category.findUnique({
      where: { id },
      select: { userId: true }, // Only select the userId field
    });

    // Check if the category exists
    if (!category) {
      throw new Error("Task not found");
    }

    // Check if the userId of the category matches the provided userId
    if (category.userId !== userId) {
      throw new Error("Unauthorized update attempt");
    }

    // If the userId matches, proceed with updating the category
    const updatedCategory = await db.category.update({
      where: { id },
      data,
    });

    // Perform any necessary post-deletion actions
    revalidatePath("/");

    // console.log(updatedCategory);
    return updatedCategory;
  } catch (error: any) {
    console.error("Error updating category:", error);
    throw error;
  }
}

export async function deleteCategory(id: any) {
  // console.log(id, role);
  try {
    // Retrieve the category from the database using both id and role
    const category = await db.category.findUnique({
      where: { id },
    });

    // Check if the category exists
    if (!category) {
      throw new Error("Category not found");
    }

    // If the category matches any in the database, proceed with deleting it
    const deletedCategory = await db.category.delete({
      where: { id },
    });

    // Perform any necessary category-deletion actions
    revalidatePath("/");

    // console.log(deletedCategory);
    return deletedCategory;
  } catch (error: any) {
    console.error("Error deleting category:", error);
    throw error;
  }
}
