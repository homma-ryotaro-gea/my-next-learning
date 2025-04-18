# コーディング規約

## アーキテクチャとデザインパターン

- 汎用的な Component は、`src/components`に配置する
- 特定の機能に依存する Component は、`src/components/[pageName]/[componentName]`に配置する
  - ファイル名は `index.tsx`とする
- データフェッチは Server Component で行い、Container/Presentation パターンを採用する
  - データ取得と表示の関心事を分離し、再利用性と保守性を高める
- レンダリング戦略
  - 基本的には Server Component を優先的に使用する
  - ユーザーインタラクション（フォーム操作、動的 UI 要素など）が必要な場合のみ Client Component を使用する
  - "use client" ディレクティブは必要最小限の範囲で使用する
- データ操作
  - データの作成・更新・削除処理には Next.js Server Actions を利用する
  - クライアント側でのデータ操作は必要最小限に抑え、可能な限り Server Actions に委譲する
- 状態管理
  - フォーム状態管理には React Hook Form を採用
- 日付関連
  - dayjsを使用する

## コード品質と標準化

- TypeScript 活用
  - すべてのプロパティに明示的な型定義を行う
  - `any`型の使用は禁止し、適切なジェネリックタイプを活用
  - 左辺が`null`、`undefined`となる場合は、`||`ではなく`??`を使用する
  - 条件分岐では真偽値を直接評価し、暗黙的な型変換（Truthy/Falsy）に頼らない
    - 例: if (array.length > 0) を使用し、if (array.length) は避ける
    - 例: if (value === undefined) を使用し、if (!value) は避ける
  - 関数はアロー関数で定義する
  - UI とロジックは極力分割する
  -

## スタイリング

- UI 構築には 指定がない限りは shadcn/ui を優先的に使用する
  - 新しい UI コンポーネントを作成する前に、shadcn/ui に同等のコンポーネントが存在するか確認する
  - shadcn/ui のコンポーネントは必要に応じて Tailwind CSS でカスタマイズする
  - プロジェクト内でのコンポーネントの一貫性を保つため、shadcn/ui のデザイン原則に従う
- CSS は Tailwind CSS を使用し、カスタム CSS の使用は最小限に抑える
- レスポンシブデザインを全画面で考慮する

## パフォーマンス最適化

- React コンポーネントでは`useCallback`と`useMemo`を適切に使用する
- 画像最適化には Next.js の`Image`コンポーネントを使用する

## ドキュメンテーション

- 新しい関数やコンポーネントには必ず JSDoc コメントを追加する
- 複雑なロジックには適切なインラインコメントを付ける

## エラー処理とログ記録

- すべての非同期処理には try-catch ブロックを使用し、エラーは専用のロガーでキャプチャする
- ユーザーに表示するエラーメッセージは統一されたフォーマットで提供する
