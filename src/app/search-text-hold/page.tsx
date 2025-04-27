"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

// サンプルデータ
const SAMPLE_ITEMS = [
  { id: 1, title: "React基礎講座", category: "プログラミング" },
  { id: 2, title: "TypeScript入門", category: "プログラミング" },
  { id: 3, title: "Next.js実践ガイド", category: "プログラミング" },
  { id: 4, title: "UIデザイン基礎", category: "デザイン" },
  { id: 5, title: "レスポンシブデザイン", category: "デザイン" },
] as const;

type Item = (typeof SAMPLE_ITEMS)[number];

const SearchTextHoldContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL パラメータ更新用の関数
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // 表示用と実際の検索用の状態を分離
  const [displayTerm, setDisplayTerm] = useState(
    () => searchParams.get("q") || ""
  );
  const [searchTerm, setSearchTerm] = useState(displayTerm);
  const [filteredItems, setFilteredItems] = useState<Item[]>([...SAMPLE_ITEMS]);

  // 検索実行処理
  const performSearch = useCallback(
    (term: string) => {
      const filtered = SAMPLE_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(term.toLowerCase()) ||
          item.category.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredItems(filtered);

      // URL更新
      const query = createQueryString("q", term);
      router.push(`${pathname}?${query}`, { scroll: false });
    },
    [createQueryString, pathname, router]
  );

  // 入力変更時のハンドラー
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    performSearch(value);
  };

  // 初期表示時とURLパラメータ変更時の処理
  useEffect(() => {
    const currentTerm = searchParams.get("q") || "";
    setDisplayTerm(currentTerm);
    setSearchTerm(currentTerm);
    performSearch(currentTerm);
  }, [searchParams, performSearch]);

  const [debouncedSearch] = useDebounce(handleSearch, 500);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link href="/search-text-hold">検索テキスト保持</Link>
      <div className="mb-6">
        <Input
          type="search"
          placeholder="検索..."
          value={displayTerm}
          onChange={(e) => {
            setDisplayTerm(e.target.value);
            debouncedSearch(e.target.value);
          }}
          className="max-w-md"
        />
        {displayTerm !== searchTerm && (
          <p className="text-sm text-gray-500 mt-2">
            検索結果は入力完了後に更新されます...
          </p>
        )}
      </div>

      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.category}</p>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          検索結果が見つかりませんでした
        </p>
      )}
    </div>
  );
};

const SearchTextHoldPage = () => {
  return (
    <Suspense>
      <SearchTextHoldContent />
    </Suspense>
  );
};

export default SearchTextHoldPage;
