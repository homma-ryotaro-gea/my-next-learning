"use client";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
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

// useSearchParams を使用するコンポーネントを分離
const InfiniteScrollContent = () => {
	const LIMIT_SIZE = 25;

	const searchParams = useSearchParams();
	const childThreadId = searchParams.get("child_thread_id") || "";
	const type = searchParams.get("type") || "";
	// 運営メッセージ取得
	const {
		loadMoreRef,
		data: messages,
		isValidating,
		isReachingEnd,
		containerRef,
		lastCommentRef,
		previousLastId,
		error: messagesError,
		mutate: messagesMutate,
		hasNextPage,
		hasPreviousPage,
		loadPreviousRef,
		isReachingStart,
		previousFirstId,
		firstCommentRef,
	} = useInfiniteScroll<
		ThreadAdminMessageType,
		ThreadAdminMessagePaginationType
	>({
		path: "/api/general/admin-messages/243",
		queryParams: {
			child_thread_id: childThreadId,
			type,
		},
		pageParamName: "page",
		limitParamName: "limit",
		limitSize: LIMIT_SIZE,
	});
	console.log("messages", messages);
	console.log("previousLastId", previousLastId);
	console.log("previousFirstId", previousFirstId);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">スレッド管理者メッセージ</h1>
			<div ref={containerRef} className="h-[calc(100vh-200px)] overflow-y-auto">
				<div className="grid gap-4">
					{hasNextPage && !isReachingEnd && (
						<div
							ref={loadMoreRef}
							className="text-center text-sm text-gray-500"
						>
							{isValidating ? (
								<div className="flex justify-center">
									<div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500" />
								</div>
							) : isReachingEnd ? (
								""
							) : null}
						</div>
					)}
					{messages?.map((message, index) => (
						<div key={`${message.id}-${index}`}>
							{message.id === previousLastId && (
								<div ref={lastCommentRef}>
									<p>lastCommentRef</p>
								</div>
							)}
							{message.id === previousFirstId && (
								<div ref={firstCommentRef}>
									<p>firstCommentRef</p>
								</div>
							)}
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
					{hasPreviousPage && !isReachingStart && (
						<div
							ref={loadPreviousRef}
							className="text-center text-sm text-gray-500"
						>
							{isValidating ? (
								<div className="flex justify-center">
									<div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500" />
								</div>
							) : isReachingStart ? (
								""
							) : null}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

// ローディング状態を表示するフォールバックコンポーネント
const InfiniteScrollFallback = () => (
	<div className="p-4">
		<h1 className="text-2xl font-bold mb-4">スレッド管理者メッセージ</h1>
		<div className="flex justify-center items-center h-[calc(100vh-200px)]">
			<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
		</div>
	</div>
);

const InfiniteScrollPage = () => {
	return (
		<Suspense fallback={<InfiniteScrollFallback />}>
			<InfiniteScrollContent />
		</Suspense>
	);
};

export default InfiniteScrollPage;
