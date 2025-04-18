import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type PropsType = {
  /** 削除したいクエリパラメータの配列 */
  paramsToRemove?: string[];
  /** すべてのクエリパラメータを削除するかどうか */
  removeAll?: boolean;
  /** クリーニング後に実行するコールバック */
  onClean?: (() => void) | null;
};

/**
 * ページリロード時に指定したクエリパラメータを削除する高度なカスタムフック
 * - パフォーマンス最適化
 * - SSR対応
 * @param options - 設定オプション
 */
export const useReloadQueryCleaner = ({
  paramsToRemove = [],
  removeAll = false,
  onClean = null,
}: PropsType = {}): void => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // SSR時は実行しない
    if (typeof window === "undefined") return;

    // リロードフラグの確認
    const reloadFlag = sessionStorage.getItem("pageReloadFlag");

    if (reloadFlag === "true") {
      // リロードフラグをリセット
      sessionStorage.removeItem("pageReloadFlag");

      let shouldClean = false;
      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (removeAll) {
        // すべてのクエリパラメータを削除
        shouldClean = newSearchParams.toString().length > 0;
        newSearchParams.forEach((_, key) => {
          newSearchParams.delete(key);
        });
      } else {
        // 指定したパラメータのみ削除
        for (const param of paramsToRemove) {
          if (newSearchParams.has(param)) {
            newSearchParams.delete(param);
            shouldClean = true;
          }
        }
      }

      if (shouldClean) {
        // URLを更新
        const newUrl = newSearchParams.toString()
          ? `${pathname}?${newSearchParams.toString()}`
          : pathname;

        router.replace(newUrl);

        if (typeof onClean === "function") {
          onClean();
        }
      }
    }

    // リロード検出用のイベントリスナー
    const handleBeforeUnload = (): void => {
      sessionStorage.setItem("pageReloadFlag", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname, searchParams, paramsToRemove, removeAll, onClean, router]);
};
