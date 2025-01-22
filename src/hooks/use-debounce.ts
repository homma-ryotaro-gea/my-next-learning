import { useCallback, useEffect, useRef } from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const useDebounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): [DebouncedFunction<T>, () => void] => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // クリーンアップ関数
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // コンポーネントのアンマウント時にクリーンアップ
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // debounceされた関数
  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      // 既存のタイマーをクリア
      cleanup();

      // 新しいタイマーをセット
      timeoutRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay, cleanup]
  );

  return [debouncedFn, cleanup];
};
