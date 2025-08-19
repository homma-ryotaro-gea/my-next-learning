"use client";

import { useState } from "react";
import { PdfGenerator } from "./PdfGenerator";

/**
 * 議事録エクスポートメインコンポーネント
 */
const DocumentExportPdf = () => {
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
			<h1 className="text-3xl font-bold mb-6">議事録 PDF エクスポート</h1>

			{/* エクスポート機能 */}
			<div className="mb-6">
				<PdfGenerator
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
						<strong>エクスポート:</strong>{" "}
						設定したスタイルで議事録をPDF文書としてダウンロードできます
					</li>
					<li>
						<strong>ファイル名:</strong>{" "}
						自動的に「議事録_日付.pdf」の形式で保存されます
					</li>
				</ul>
			</div>
		</div>
	);
};

export default DocumentExportPdf;
