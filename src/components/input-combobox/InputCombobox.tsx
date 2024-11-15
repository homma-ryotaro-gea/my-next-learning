import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

const InputCombobox = () => {
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
  const [position, setPosition] = useState("bottom");
  // サジェストリストの表示位置を調整するための入力要素
  const inputRef = useRef<HTMLInputElement>(null);
  // サジェストリストの表示位置を調整するためのリスト要素
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // サジェストリストの表示位置を調整する
    const updatePosition = () => {
      if (!inputRef.current || !listRef.current || !isCommandListOpen) {
        return;
      }

      const inputRect = inputRef.current.getBoundingClientRect();
      const listHeight = listRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // 下部に表示したときに画面からはみ出る場合
      if (inputRect.bottom + listHeight > windowHeight) {
        setPosition("top");
      } else {
        setPosition("bottom");
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [isCommandListOpen]);
  return (
    <div className="relative">
      <Input
        ref={inputRef}
        placeholder="担当者氏名入力"
        onChange={(e) => {
          setFilteringValue(e.target.value);
          if (suggests) {
            const searchText = e.target.value;
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
      {/* コマンドリスト */}
      {isCommandListOpen && filteredSuggests.length > 0 && (
        <ul
          ref={listRef}
          className={cn(
            "overflow-auto max-h-[200px] border rounded-sm absolute z-30 left-0 bg-white w-full shadow-md pl-2 py-2",
            "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white",
            position === "top" ? "bottom-[34px]" : "top-[34px]"
          )}
        >
          {filteredSuggests.map((command) => (
            <li key={command.key} className="w-full">
              <button
                type="button"
                className="flex items-center rounded-sm p-2 w-full hover:bg-[#F7F8FB] transition-colors text-sm"
                onClick={() => {
                  setFilteringValue(command.value);
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

export default InputCombobox;
