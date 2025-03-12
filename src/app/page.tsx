import Link from "next/link";

export default function Home() {
  return (
    <div className="pt-2">
      <ul className="flex gap-2 w-full flex-wrap">
        <li className="border rounded-md">
          <Link
            href="/input-combobox"
            className="flex justify-center items-center p-2"
          >
            InputとCombobox
          </Link>
        </li>
        <li className="border rounded-md">
          <Link href="/dialog" className="flex justify-center items-center p-2">
            Dialogについて
          </Link>
        </li>
        <li className="border rounded-md">
          <Link
            href="/formwithcombobox"
            className="flex justify-center items-center p-2"
          >
            Comboboxを使用したForm
          </Link>
        </li>
        <li className="border rounded-md">
          <Link href="/rhf" className="flex justify-center items-center p-2">
            react-hook-form
          </Link>
        </li>
        <li className="border rounded-md">
          <Link
            href="/rhf-usefieldarray"
            className="flex justify-center items-center p-2"
          >
            react-hook-form:useFieldArray
          </Link>
        </li>
        <li className="border rounded-md">
          <Link
            href="/select-row-table-radio"
            className="flex justify-center items-center p-2"
          >
            ラジオボタンとテーブル
          </Link>
        </li>
        <li className="border rounded-md">
          <Link
            href="/display-setting"
            className="flex justify-center items-center p-2"
          >
            表示項目設定
          </Link>
        </li>
        <li className="border rounded-md">
          <Link
            href="/csv-import"
            className="flex justify-center items-center p-2"
          >
            CSVインポート
          </Link>
        </li>
        <li className="border rounded-md">
          <Link
            href="/search-text-hold"
            className="flex justify-center items-center p-2"
          >
            テキスト検索の文字列保持
          </Link>
        </li>
        <li className="border rounded-md">
          <Link href="/jotai" className="flex justify-center items-center p-2">
            jotai
          </Link>
        </li>
        <li className="border rounded-md">
          <Link
            href="/table-pagination"
            className="flex justify-center items-center p-2"
          >
            Tanstack Tableページネーション
          </Link>
        </li>
        <li className="border rounded-md">
          <Link href="/swr" className="flex justify-center items-center p-2">
            SWRについて
          </Link>
        </li>
        <li className="border rounded-md">
          <Link href="/dnd" className="flex justify-center items-center p-2">
            DnD
          </Link>
        </li>
        <li className="border rounded-md">
          <Link
            href="/dropdown-dialog"
            className="flex justify-center items-center p-2"
          >
            dropdown&dialog
          </Link>
        </li>
      </ul>
    </div>
  );
}
