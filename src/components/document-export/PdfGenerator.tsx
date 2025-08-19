"use client";

import type { MeetingMinutes } from "@/types/meeting-minutes";
import { buildMeetingMinutesDocument } from "@/utils/documentBuilder";
import { downloadWordDocument, generateFileName } from "@/utils/exportUtils";
import { useState } from "react";

interface PdfGeneratorProps {
	meetingMinutes: MeetingMinutes;
	onExportStart?: () => void;
	onExportComplete?: () => void;
	onExportError?: (error: string) => void;
}

/**
 * PDF文書生成コンポーネント
 */
export const PdfGenerator: React.FC<PdfGeneratorProps> = ({
	meetingMinutes,
	onExportStart,
	onExportComplete,
	onExportError,
}) => {
	const [isExporting, setIsExporting] = useState(false);

	/**
	 * PDF文書をエクスポートする
	 */
	const handleExport = async () => {
		try {
			setIsExporting(true);
			onExportStart?.();

			// Word文書を生成（PDF変換のため）
			const doc = buildMeetingMinutesDocument(meetingMinutes);

			// ファイル名を生成（PDF用）
			const fileName = generateFileName("議事録", meetingMinutes.date).replace(
				".docx",
				".pdf",
			);

			// ダウンロード実行
			await downloadWordDocument(doc, fileName);

			onExportComplete?.();
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "PDFエクスポートに失敗しました";
			onExportError?.(errorMessage);
		} finally {
			setIsExporting(false);
		}
	};

	return (
		<div className="space-y-4">
			{/* エクスポートボタン */}
			<button
				type="button"
				onClick={handleExport}
				disabled={isExporting}
				className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isExporting ? "エクスポート中..." : "PDF文書をダウンロード"}
			</button>
		</div>
	);
};
