import { auth } from "@/auth";
import { APP_TIMEZONE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { createPiece } from "./actions";

export const metadata = {
  title: "Box",
};

export default async function BoxPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/");
  }

  const pieces = await prisma.piece.findMany({
    where: {
      userId: session.user.id,
      dayId: null,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-3xl px-16 py-16">
        <h1 className="mb-8 text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Box
        </h1>

        <form action={createPiece} className="mb-12">
          <textarea
            name="text"
            placeholder="日々のカケラを記録しよう"
            required
            rows={3}
            className="w-full resize-y rounded-lg border border-zinc-200 bg-white px-4 py-3 text-base text-black placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
            >
              投稿する
            </button>
          </div>
        </form>

        {pieces.length === 0 ? (
          <p className="text-center text-zinc-400 dark:text-zinc-500">
            まだ投稿がありません
          </p>
        ) : (
          <ul className="space-y-4">
            {pieces.map((piece) => (
              <li
                key={piece.id}
                className="rounded-lg border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-700 dark:bg-zinc-900"
              >
                <p className="whitespace-pre-wrap text-black dark:text-zinc-50">
                  {piece.text}
                </p>
                <time
                  dateTime={piece.createdAt.toISOString()}
                  className="mt-2 block text-xs text-zinc-400 dark:text-zinc-500"
                >
                  {piece.createdAt.toLocaleString("ja-JP", {
                    timeZone: APP_TIMEZONE,
                  })}
                </time>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
