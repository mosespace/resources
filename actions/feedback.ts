"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function sendFeedback(data: any) {
  try {
    const feedback = await db.feedback.create({
      data,
    });
    revalidatePath("/dashboard");
    console.log("The following feedback was created:", feedback);
    return feedback;
  } catch (error: any) {
    console.log(error);
  }
}
