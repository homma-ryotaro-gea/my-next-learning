"use client";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { cn } from "@/lib/utils";

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

const LIMIT_SIZE = 20;

const InfiniteScrollPage = () => {
  const {
    loadMoreRef,
    data: comments,
    isValidating,
    isReachingEnd,
    containerRef,
    lastCommentRef,
    lastId,
  } = useInfiniteScroll<CommentType[]>({
    path: "https://jsonplaceholder.typicode.com/comments",
    pageParamName: "_page",
    limitParamName: "_limit",
    limitSize: LIMIT_SIZE,
  });

  return (
    <div
      className="m-4 h-[calc(100vh-100px)] overflow-y-auto"
      ref={containerRef}
    >
      <div
        ref={loadMoreRef}
        className={cn(
          !isValidating && isReachingEnd && "hidden",
          "py-4 text-center text-sm text-gray-500"
        )}
      >
        {isValidating ? (
          <div className="flex justify-center" aria-label="読み込み中">
            <div className="animate-ping h-4 w-4 bg-blue-600 rounded-full" />
          </div>
        ) : (
          isReachingEnd && "No more data"
        )}
      </div>
      {comments.map((comment) => (
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
