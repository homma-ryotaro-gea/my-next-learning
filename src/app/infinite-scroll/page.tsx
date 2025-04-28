"use client";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import type {
  ThreadAdminMessagePaginationType,
  ThreadAdminMessageType,
} from "../api/thread-admin-messages/types";

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

const LIMIT_SIZE = 20;

const InfiniteScrollPage = () => {
  const {
    loadMoreRef,
    data: messages,
    isValidating,
    isReachingEnd,
    containerRef,
    lastCommentRef,
    lastId,
  } = useInfiniteScroll<
    ThreadAdminMessageType,
    ThreadAdminMessagePaginationType
  >({
    path: "/api/thread-admin-messages",
    pageParamName: "page",
    limitParamName: "limit",
    limitSize: LIMIT_SIZE,
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">スレッド管理者メッセージ</h1>
      <div ref={containerRef} className="h-[calc(100vh-200px)] overflow-y-auto">
        <div className="grid gap-4">
          <div ref={loadMoreRef} className="text-center text-sm text-gray-500">
            {isValidating ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500" />
              </div>
            ) : isReachingEnd ? (
              ""
            ) : null}
          </div>
          {messages?.map((message, index) => (
            <div key={`${message.id}-${index}`}>
              {message.id === lastId && <div ref={lastCommentRef} />}
              <div className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold">
                    メッセージID: {message.id}
                  </h2>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      message.message_status
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {message.message_status ? "既読" : "未読"}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{message.content}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">スレッド情報</p>
                    <p>タイトル: {message.thread?.title}</p>
                    <p>親スレッドID: {message.parent_thread}</p>
                  </div>
                  <div>
                    <p className="font-medium">マッチング情報</p>
                    <p>ステータス: {message.matching_status_flg}</p>
                    <p>
                      更新日時:{" "}
                      {new Date(message.matching_status_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                {message.matching_user && (
                  <div className="mt-2 p-2 bg-gray-50 rounded">
                    <p className="font-medium">マッチングユーザー</p>
                    <p>名前: {message.matching_user.name}</p>
                    <p>メール: {message.matching_user.email}</p>
                  </div>
                )}
                <div className="mt-2 text-sm text-gray-500">
                  <p>
                    作成日時: {new Date(message.create_at).toLocaleString()}
                  </p>
                  <p>
                    更新日時: {new Date(message.update_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteScrollPage;
