import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // マイグレーション等のCLI操作用（poolerを経由しない直接接続）
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
  },
});
