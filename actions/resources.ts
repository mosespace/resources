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

export async function postCategory(data: any) {
  try {
    const category = await db.category.create({
      data,
    });
    revalidatePath("/dashboard");
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
    revalidatePath("/dashboard");
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
    revalidatePath("/dashboard");

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
    revalidatePath("/dashboard");

    // console.log(deletedCategory);
    return deletedCategory;
  } catch (error: any) {
    console.error("Error deleting category:", error);
    throw error;
  }
}

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

// export async function updateCategory(id: any, data: any, userId: any) {
//   try {
//     // Retrieve the category from the database using both id and userId
//     const category = await db.category.findUnique({
//       where: { id },
//       select: { userId: true }, // Only select the userId field
//     });

//     // Check if the category exists
//     if (!category) {
//       throw new Error("Task not found");
//     }

//     // Check if the userId of the category matches the provided userId
//     if (category.userId !== userId) {
//       throw new Error("Unauthorized update attempt");
//     }

//     // If the userId matches, proceed with updating the category
//     const updateTask = await db.category.update({
//       where: { id },
//       data,
//     });

//     // Perform any necessary post-deletion actions
//     revalidatePath("/dashboard");

//     console.log(updateTask);
//     return updateTask;
//   } catch (error: any) {
//     console.error("Error updating category:", error);
//     throw error;
//   }
// }

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
