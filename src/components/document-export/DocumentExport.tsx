"use client";

import { sampleMeetingMinutes } from "@/data/sample-meeting-minutes";
import { useState } from "react";
import { DocumentGenerator } from "./DocumentGenerator";

/**
 * 議事録エクスポートメインコンポーネント
 */
const DocumentExport = () => {
	const [exportStatus, setExportStatus] = useState<{
		isExporting: boolean;
		error: string | null;
		success: boolean;
	}>({
		isExporting: false,
		error: null,
		success: false,
	});

	const handleExportStart = () => {
		setExportStatus({
			isExporting: true,
			error: null,
			success: false,
		});
	};

	const handleExportComplete = () => {
		setExportStatus({
			isExporting: false,
			error: null,
			success: true,
		});

		// 3秒後に成功メッセージをクリア
		setTimeout(() => {
			setExportStatus((prev) => ({ ...prev, success: false }));
		}, 3000);
	};

	const handleExportError = (error: string) => {
		setExportStatus({
			isExporting: false,
			error,
			success: false,
		});
	};

	const clearError = () => {
		setExportStatus((prev) => ({ ...prev, error: null }));
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">議事録 Word エクスポート</h1>

			{/* 議事録プレビュー */}
			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-3">議事録プレビュー</h2>
				<div className="border border-gray-300 p-4 bg-gray-50 rounded">
					<div className="space-y-2">
						<h3 className="text-lg font-bold text-center">
							{sampleMeetingMinutes.title}
						</h3>
						<p>
							<strong>日時:</strong> {sampleMeetingMinutes.date}{" "}
							{sampleMeetingMinutes.time}
						</p>
						<p>
							<strong>場所:</strong> {sampleMeetingMinutes.location}
						</p>
						<p>
							<strong>出席者:</strong> {sampleMeetingMinutes.attendingMembers}名
							/ {sampleMeetingMinutes.totalMembers}名
						</p>
						<p>
							<strong>議案数:</strong> {sampleMeetingMinutes.agendaItems.length}
							件
						</p>
					</div>
				</div>
			</div>

			{/* エクスポート機能 */}
			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-3">エクスポート設定</h2>
				<DocumentGenerator
					meetingMinutes={sampleMeetingMinutes}
					onExportStart={handleExportStart}
					onExportComplete={handleExportComplete}
					onExportError={handleExportError}
				/>
			</div>

			{/* ステータス表示 */}
			{exportStatus.error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					<div className="flex justify-between items-center">
						<span>エラー: {exportStatus.error}</span>
						<button
							type="button"
							onClick={clearError}
							className="text-red-700 hover:text-red-900 font-bold"
						>
							✕
						</button>
					</div>
				</div>
			)}

			{exportStatus.success && (
				<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
					<div className="flex items-center">
						<span className="mr-2">✓</span>
						<span>エクスポートが完了しました！</span>
					</div>
				</div>
			)}

			{exportStatus.isExporting && (
				<div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
					<div className="flex items-center">
						<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2" />
						処理中です。しばらくお待ちください...
					</div>
				</div>
			)}

			{/* 使用方法の説明 */}
			<div className="mt-8 p-4 bg-gray-100 rounded">
				<h3 className="font-semibold mb-2">使用方法:</h3>
				<ul className="list-disc list-inside space-y-1 text-sm">
					<li>
						<strong>スタイル設定:</strong>{" "}
						タイトル、見出し、本文のフォントサイズと色をカスタマイズできます
					</li>
					<li>
						<strong>エクスポート:</strong>{" "}
						設定したスタイルで議事録をWord文書としてダウンロードできます
					</li>
					<li>
						<strong>ファイル名:</strong>{" "}
						自動的に「議事録_日付.docx」の形式で保存されます
					</li>
				</ul>
				<div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
					<p className="text-sm text-blue-800">
						<strong>注意:</strong> フォントサイズは半ポイント単位（例: 20 =
						10pt）で指定します。 色は16進数カラーコードで指定できます。
					</p>
				</div>
			</div>
		</div>
	);
};

export default DocumentExport;
