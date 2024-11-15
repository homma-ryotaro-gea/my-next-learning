"use client";

import InputCombobox from "@/components/input-combobox/InputCombobox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const InputComboboxPage = () => {
  return (
    <>
      <Alert>
        <AlertTitle className="font-bold">InputCombobox</AlertTitle>
        <AlertDescription>
          サジェストリストを表示する入力コンポーネントです。
          <br />
          入力されたテキストによってサジェストリストをフィルタリングします。
          <br />
          サジェストリストは上下に表示され、画面からはみ出る場合は自動的に位置を調整します。
          <br />
          ESCキーでサジェストリストを閉じることができます。
        </AlertDescription>
      </Alert>
      <div className="flex w-full flex-col gap-4 items-center pt-4">
        {[1, 2, 3, 4, 5].map((i) => {
          return (
            <div key={i} className="w-56">
              <InputCombobox />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default InputComboboxPage;
