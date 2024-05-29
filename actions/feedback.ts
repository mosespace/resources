"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createErrorResponse } from "@/utils/errorHandler";

export async function sendFeedback(data: any) {
  try {
    const feedback = await db.feedback.create({
      data,
    });
    // console.log("The following feedback was created:", feedback);
    revalidatePath("/dashboard");
    return { status: "success", data: feedback };
  } catch (error: any) {
    console.error(error);
    return createErrorResponse(500, "Internal Server Error", error.message);
  }
}
