"use client";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";

/**
 * 無限スクロールでコメントを表示するページコンポーネント
 *
 * @example
 * ```tsx
 * // 使用例
 * <InfiniteScrollPage />
 * ```
 *
 * このコンポーネントは以下の機能を提供します：
 * 1. コメントの無限スクロール表示
 * 2. スクロール位置に応じた自動ローディング
 * 3. エラーハンドリング
 * 4. ローディング状態の表示
 */

const fetcher = (url: string): Promise<CommentType[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data: CommentType[]) => resolve(data));
    }, 500);
  });

type CommentType = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

const InfiniteScrollPage = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  // 前回データ読み込みした時の最後のIDを状態管理
  const [lastId, setLastId] = useState<number | null>(null);

  const getKey = (
    pageIndex: number,
    previousPageData: CommentType[] | null
  ) => {
    if (previousPageData && !previousPageData.length) return null;
    return `https://jsonplaceholder.typicode.com/comments?_page=${
      pageIndex + 1
    }&_limit=20`;
  };

  const { data, error, size, setSize, mutate, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateFirstPage: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 2000,
      focusThrottleInterval: 5000,
    }
  );

  const isLoading = !data && !error;
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = !data || data.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 20);

  // 全ページのデータを結合して1つの配列に
  const comments: CommentType[] = useMemo(() => {
    if (!data) return [];
    const flatData = data.flat();
    return [...flatData].reverse();
  }, [data]);

  // データが更新された時に最後のIDを更新
  useEffect(() => {
    if (comments.length > 0) {
      setLastId(comments[0].id);
    }
  }, [comments]);

  // IntersectionObserverを使用して、loadMoreRefが表示されたときに次のページを読み込む
  useEffect(() => {
    if (!loadMoreRef.current) return;

    // 既存のオブザーバーをクリーンアップ
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // 適切な状態チェックを行う新しいオブザーバーを作成
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        // 以下の条件を全て満たす場合のみデータを取得:
        // 1. 要素が表示されている
        // 2. 終端に達していない
        // 3. すでにデータを読み込み中ではない
        // 4. 既存のデータがある
        if (entry.isIntersecting && !isReachingEnd && !isLoadingMore && data) {
          setSize((prevSize) => prevSize + 1);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(loadMoreRef.current);
    observerRef.current = observer;

    // eslint-disable-next-line consistent-return
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isReachingEnd, isLoadingMore, setSize, data]);

  console.log("comments", comments);

  // 一番下にスクロール
  const containerRef = useRef<HTMLDivElement>(null);

  const lastCommentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 初期表示時は一番下までスクロール
    if (comments.length <= 20) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
      });
      return;
    }

    // データ追加時は最新のコメントまでスクロール
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({
        block: "center",
      });
    }
  }, [comments]);

  return (
    <div className="m-4 h-[500px] overflow-y-auto" ref={containerRef}>
      <div
        ref={loadMoreRef}
        className={cn(
          !isLoadingMore && isReachingEnd && "hidden",
          "py-4 text-center text-sm text-gray-500"
        )}
      >
        {isLoadingMore ? (
          <div className="flex justify-center" aria-label="読み込み中">
            <div className="animate-ping h-4 w-4 bg-blue-600 rounded-full" />
          </div>
        ) : (
          isReachingEnd && "No more data"
        )}
      </div>
      {comments.map((comment, index) => (
        <div key={comment.id}>
          {/* 最後のコメントのIDがlastIdと一致する場合にrefを設定 */}
          {comment.id === lastId && <div ref={lastCommentRef} />}
          <div className="p-4 border-2 rounded-lg mb-4 list-none">
            <span className="block text-gray-600 my-2">{comment.id}</span>
            <p className="font-bold text-lg">{comment.name}</p>
            <p className="text-sm text-gray-500">{comment.email}</p>
            <span className="block text-gray-600 my-2">{comment.body}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfiniteScrollPage;
