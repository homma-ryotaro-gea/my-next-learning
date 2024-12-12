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
      </ul>
    </div>
  );
}
