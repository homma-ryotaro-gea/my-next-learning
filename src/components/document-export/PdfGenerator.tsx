"use client";
import type { MeetingMinutes } from "@/types/meeting-minutes";
import {
	Document,
	Page,
	StyleSheet,
	Text,
	View,
	pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { useState } from "react";

// 出力用コンポーネント
// Create styles
const styles = StyleSheet.create({
	page: {
		flexDirection: "column",
		backgroundColor: "#E4E4E4",
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
	},
});

// Create Document Component
const MyDocument = () => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Text>Section #1</Text>
			</View>
			<View style={styles.section}>
				<Text>Section #2</Text>
			</View>
		</Page>
	</Document>
);

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
			console.log("PDFエクスポート開始");
			setIsExporting(true);
			onExportStart?.();

			// PDFを生成してBlobに変換
			const blob = await pdf(<MyDocument />).toBlob();

			// ファイル名を生成
			const fileName = `議事録_${new Date().toISOString().split("T")[0]}.pdf`;

			// ダウンロード実行
			saveAs(blob, fileName);

			console.log("PDFエクスポート完了:", fileName);
			onExportComplete?.();
		} catch (error) {
			console.error("PDFエクスポートエラー:", error);
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
