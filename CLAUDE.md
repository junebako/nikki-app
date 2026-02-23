# Nikki App

オリジナルの日記ウェブアプリケーション。「小さく書き溜めて、1日分をまとめて公開する」がコンセプト。

## 開発コマンド

```bash
pnpm dev              # 開発サーバー起動（ポート30303）
pnpm build            # プロダクションビルド
pnpm lint             # ESLint実行
npx prisma validate   # スキーマ検証
npx prisma generate   # Prisma Client 生成
npx prisma migrate dev --name <name>  # マイグレーション作成＆適用
npx prisma studio     # DB管理GUI
```

## ローカル開発環境

- https://nikki.lvh.me でアクセス（Caddy リバースプロキシ経由、`~/ghq/src/github.com/junebako/caddy-boss/Caddyfile`）
- ポート30303（他プロジェクトとの競合回避）

## 本番環境

- Vercel: https://nikki-app-nine.vercel.app
- GitHub: https://github.com/junebako/nikki-app (public)
- main ブランチに push すると自動デプロイ

## Tech Stack

- **フレームワーク**: Next.js 16 (App Router, Turbopack)
- **言語**: TypeScript
- **CSS**: Tailwind CSS v4
- **パッケージマネージャー**: pnpm
- **ORM**: Prisma 7 (`prisma-client` generator, 出力先: `src/generated/prisma`)
- **DB**: Neon (PostgreSQL 17, ap-southeast-1)
- **認証**: Auth.js v5 (next-auth beta) + Google OAuth
- **画像ストレージ**: Cloudflare R2（未実装）

## DB設計のポイント

- **Piece**: 投稿の最小単位。1モデル + `text` カラム（Markdown）にシンプル一本化
  - 以前の Block（ポリモーフィック関連方式）を廃止し Piece に統一
- **Piece → Day**: `dayId` nullable。作成直後は Day に属さず、後で束ねる
- **Day**: `@@unique([userId, date])` で 1ユーザー・1日・1Day を強制
- **Piece の自己参照**: `originalPieceId` で引用元を辿れる
- **userName**: optional。初回ログイン時に cuid で自動生成

## Prisma の注意点

- Prisma 7 の `prisma-client` generator は index ファイルを生成しないため、import は `@/generated/prisma/client` を使う
- Vercel デプロイ時は `postinstall` スクリプトで `prisma generate` を実行
- マイグレーションは `DIRECT_URL`（pooler 経由でない直接接続）を使用

## 環境変数（.env）

```
DATABASE_URL    # Neon pooler 経由（アプリケーション用）
DIRECT_URL      # Neon 直接接続（マイグレーション用）
AUTH_URL        # Auth.js ベースURL（ローカル: https://nikki.lvh.me）
AUTH_SECRET     # Auth.js セッション暗号化キー
AUTH_GOOGLE_ID  # Google OAuth クライアントID
AUTH_GOOGLE_SECRET  # Google OAuth シークレット
```
