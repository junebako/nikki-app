"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPiece(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("ログインが必要です");
  }

  const text = formData.get("text");
  if (typeof text !== "string" || text.trim() === "") {
    throw new Error("テキストを入力してください");
  }

  await prisma.piece.create({
    data: {
      userId: session.user.id,
      text: text.trim(),
    },
  });

  revalidatePath("/my/box");
}
