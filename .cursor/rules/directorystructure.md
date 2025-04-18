# ディレクトリ構成

以下のディレクトリ構造に従って実装を行ってください：

```
/
├── src/                      # ソースコード
│   ├── app/                  # Next.js App Router
│   ├── components/           # アプリケーションコンポーネント
│   │   ├── ui/              # shadcn/uiのコンポーネント
│   │   └── elements/        # 最小コンポーネント
│   │   └── layout/          # レイアウト関連
│   │   └── icon/            # icon関連
│   │   └── [pagename]/      # 各ページに関連するコンポーネント
│   ├── constants/           # 定数定義
│   ├── hooks/               # カスタムフック
│   ├── lib/                 # ユーティリティ
│   ├── pages/               # Next.js Pages Router
│   ├── types/               # 型定義
│   ├── utils/               # 共通関数
│   └── error/               # エラーページ
├── prisma/                  # Prismaスキーマとマイグレーション
├── public/                  # 静的ファイル
├── .github/                 # GitHub設定
├── .husky/                  # Husky設定
├── .vscode/                # VSCode設定
├── .cursor/                # Cursor設定
├── .next/                  # Next.jsビルド出力
├── node_modules/           # 依存パッケージ
├── coverage/               # テストカバレッジ
├── package.json            # プロジェクト設定
├── package-lock.json       # 依存関係ロックファイル
├── bun.lockb               # Bunロックファイル
├── tsconfig.json           # TypeScript設定
├── next-env.d.ts           # Next.js型定義
├── next.config.js          # Next.js設定
├── postcss.config.mjs      # PostCSS設定
├── tailwind.config.ts      # Tailwind設定
├── biome.json              # Biome設定
├── jest.config.ts          # Jest設定
├── Makefile                # Makeコマンド定義
├── middleware.ts           # Next.jsミドルウェア
├── .env                    # 環境変数
├── .env.example            # 環境変数サンプル
├── .gitignore              # Git除外設定
└── README.md               # プロジェクト説明
```

### 配置ルール

- UI コンポーネント → `src/components/ui/`
- レイアウトコンポーネント → `src/components/layout/`
- ページコンポーネント → `src/pages/` または `src/app/`
- 共通処理 → `src/utils/`
- 型定義 → `src/types/`
- 定数定義 → `src/constants/`
- カスタムフック → `src/hooks/`
- データベース関連 → `prisma/`
- エラーページ → `src/error/`

### 注意事項

- 新しいコンポーネントや機能を追加する際は、上記の配置ルールに従ってください
- 共通で使用するコンポーネントは `src/components/ui/` に配置してください
- ページ固有のコンポーネントは、該当するページディレクトリ内に配置してください
- 型定義は `src/types/` に集約し、必要に応じてサブディレクトリを作成してください
- 環境変数は `.env` ファイルに定義し、`.env.example` にサンプルを記載してください
