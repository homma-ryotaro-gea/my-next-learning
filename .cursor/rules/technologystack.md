# 技術スタック

## コア技術

- TypeScript: ^5.0.4
- Node.js: 18.16.1
- npm: 9.5.1

## フロントエンド

- Next.js: ^12.3.4
- React: ^18.2.0
- React DOM: ^18.2.0
- Tailwind CSS: ^3.4.1
- shadcn/ui 関連:
  - @radix-ui/react-dialog: ^1.1.6
  - @radix-ui/react-popover: ^1.1.6
  - @radix-ui/react-select: ^2.1.6
  - class-variance-authority: ^0.7.1
  - clsx: ^2.1.1
  - tailwind-merge: ^3.0.2
  - tailwindcss-animate: ^1.0.7

## バックエンド

- Prisma: ^5.16.1
- @prisma/client: ^5.16.1

## 開発ツール

- ESLint: 7.32.0
- Prettier: ^2.8.4
- Jest: ^29.7.0
- Storybook: ^7.1.0
- husky: ^8.0.0

## その他主要パッケージ

- axios: ^1.7.3
- dayjs: ^1.11.11
- date-fns: ^2.30.0
- zod: ^3.23.8
- swr: ^2.2.5
- recoil: ^0.7.7

---

# API バージョン管理

## 重要な制約事項

- これらのファイルは変更禁止（変更が必要な場合は承認が必要）：ƒ
  - client.ts - API 設定の中核
  - types.ts - 型定義の一元管理
  - config.ts - 環境設定の一元管理

## 実装規則

- 型定義は必ず types.ts を参照
- 環境変数の利用は config.ts 経由のみ許可
