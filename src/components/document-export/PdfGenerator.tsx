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
import { createTw } from "react-pdf-tailwind";

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

const tw = createTw({});

// Create Document Component
const MyDocument = () => (
	<Document>
		<Page size="A4" style={tw("p-12")}>
			<View style={tw("mt-12 px-8")}>
				<Text style={tw("text-amber-600 text-2xl text-center")}>
					Section #3
				</Text>
			</View>
			<View style={tw("p-20 bg-gray-100 flex")}>
				<Text style={tw("text-custom text-3xl")}>Section #1</Text>
				<Text style={tw("text-custom text-3xl")}>Section #2</Text>
			</View>
			<View style={tw("mt-12 px-8 rotate-2")}>
				<Text style={tw("text-amber-600 text-2xl")}>Section #3</Text>
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
