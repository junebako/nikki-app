import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  events: {
    async createUser({ user }) {
      // 初回ログイン時にuserNameを自動生成
      if (user.id) {
        await prisma.user.update({
          where: { id: user.id },
          data: { userName: user.id },
        });
      }
    },
  },
});
