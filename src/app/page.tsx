import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Nikki App
        </h1>

        {session?.user ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              ログイン中: {session.user.name} ({session.user.email})
            </p>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="rounded-full border border-black/[.08] px-5 py-2 transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
              >
                ログアウト
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              ログインしていません
            </p>
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button
                type="submit"
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
              >
                Googleでログイン
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
