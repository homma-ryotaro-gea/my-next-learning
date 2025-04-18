"use client";

import { Button } from "@/components/ui/button";
import { useReloadQueryCleaner } from "@/hooks/useReloadQueryCleaner";
import { useRouter, useSearchParams } from "next/navigation";

const ReloadQueryDeletePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  useReloadQueryCleaner({
    paramsToRemove: ["query"],
  });

  const handleAddQuery = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("query", "test");
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">クエリパラメータ削除のデモ</h1>
      <div className="space-y-4">
        <p>
          このページでは、ページをリロードするとURLのクエリパラメータが自動的に削除される機能を実装しています。
        </p>
        <div className="space-y-2">
          <p className="font-medium">
            例えば、以下のようなURLでアクセスした場合：
          </p>
          <p className="bg-gray-100 p-2 rounded">
            /reload-querydelete?query=test
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-medium">
            ページをリロードすると、クエリパラメータが削除され、URLは以下のようになります：
          </p>
          <p className="bg-gray-100 p-2 rounded">/reload-querydelete</p>
        </div>
        <div className="flex gap-4">
          <Button onClick={handleAddQuery}>クエリパラメータを付与</Button>
        </div>
        <p className="text-sm text-gray-500">
          ※ この機能は useReloadQueryCleaner フックを使用して実装されています。
        </p>
      </div>
    </div>
  );
};

export default ReloadQueryDeletePage;
