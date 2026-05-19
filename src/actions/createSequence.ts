"use server";

import { addSequence } from "@/lib/store";
import { revalidatePath } from "next/cache";

export async function createSequenceAction(formData: { name: string; subject: string }) {
  try {
    if (!formData.name || !formData.subject) {
      throw new Error("Name and Subject are required.");
    }
    
    addSequence({
      name: formData.name,
      subject: formData.subject,
      status: "draft",
      sentCount: 0
    });
    
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
