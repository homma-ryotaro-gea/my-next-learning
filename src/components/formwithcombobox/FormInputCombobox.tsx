"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const FormInputCombobox = () => {
  const suggests = [
    { key: "1", value: "山田太郎" },
    { key: "2", value: "山田花子" },
    { key: "3", value: "鈴木一郎" },
    { key: "4", value: "鈴木二郎" },
    { key: "5", value: "佐藤太郎" },
    { key: "6", value: "佐藤花子" },
    { key: "7", value: "田中一郎" },
    { key: "8", value: "田中二郎" },
  ];
  // サジェストフィルタリング用の値
  const [filteringValue, setFilteringValue] = useState("");
  // フィルタリングされたサジェストリスト
  const [filteredSuggests, setFilteredSuggests] =
    useState<{ key: string; value: string }[]>(suggests);

  const [isCommandListOpen, setCommandListOpen] = useState(false);
  const { control, setValue } = useFormContext();
  return (
    <div className="relative">
      <FormField
        control={control}
        name="main"
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="担当者氏名入力"
                onChange={(e) => {
                  setFilteringValue(e.target.value);
                  if (suggests) {
                    const searchText = e.target.value;
                    setValue("main", searchText);
                    setFilteredSuggests(
                      suggests.filter((command) =>
                        command.value
                          .replace(/\s/g, "")
                          .includes(searchText.replace(/\s/g, ""))
                      )
                    );
                  }
                }}
                onKeyDown={(e) => {
                  // ESCキーでサジェストリストを閉じる
                  if (e.key === "Escape") {
                    setCommandListOpen(false);
                  }
                }}
                onFocus={() => {
                  setCommandListOpen(true);
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setCommandListOpen(false);
                  }, 100);
                }}
                value={filteringValue}
                className={cn(
                  "h-[30px] bg-white group-hover:border-border relative z-20 placeholder:text-sm"
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* コマンドリスト */}
      {isCommandListOpen && filteredSuggests.length > 0 && (
        <ul
          className={cn(
            "overflow-auto max-h-[200px] border rounded-sm absolute z-30 left-0 bg-white w-full shadow-md pl-2 py-2",
            "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white"
          )}
        >
          {filteredSuggests.map((command) => (
            <li key={command.key} className="w-full">
              <button
                type="button"
                className="flex items-center rounded-sm p-2 w-full hover:bg-[#F7F8FB] transition-colors text-sm"
                onClick={() => {
                  setFilteringValue(command.value);
                  setValue("main", command.value);
                  setCommandListOpen(false);
                }}
              >
                {command.value}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormInputCombobox;
