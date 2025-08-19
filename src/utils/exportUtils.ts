import type { Document } from "docx";
import { Packer } from "docx";

/**
 * Word文書をブラウザでダウンロードする
 *
 * @param doc - エクスポートするWord文書
 * @param fileName - ファイル名（拡張子を含む）
 */
export const downloadWordDocument = async (
	doc: Document,
	fileName: string,
): Promise<void> => {
	try {
		// 文書をBlob形式に変換
		const blob = await Packer.toBlob(doc);

		// ダウンロード用のURLを作成
		const url = window.URL.createObjectURL(blob);

		// ダウンロードリンクを作成
		const link = document.createElement("a");
		link.href = url;
		link.download = fileName;

		// リンクをクリックしてダウンロード開始
		document.body.appendChild(link);
		link.click();

		// クリーンアップ
		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
	} catch (error) {
		console.error("Document download failed:", error);
		throw new Error("文書のダウンロードに失敗しました");
	}
};
/**
 * PDF文書をブラウザでダウンロードする
 *
 * @param doc - エクスポートするPDF文書
 * @param fileName - ファイル名（拡張子を含む）
 */
// export const downloadPdfDocument = async (
// 	doc: () => JSX.Element,
// 	fileName: string,
// ): Promise<void> => {
// 	try {
// 		// 文書をBlob形式に変換
// 		const blob = await Packer.toBlob(doc);

// 		// ダウンロード用のURLを作成
// 		const url = window.URL.createObjectURL(blob);

// 		// ダウンロードリンクを作成
// 		const link = document.createElement("a");
// 		link.href = url;
// 		link.download = fileName;

// 		// リンクをクリックしてダウンロード開始
// 		document.body.appendChild(link);
// 		link.click();

// 		// クリーンアップ
// 		document.body.removeChild(link);
// 		window.URL.revokeObjectURL(url);
// 	} catch (error) {
// 		console.error("Document download failed:", error);
// 		throw new Error("文書のダウンロードに失敗しました");
// 	}
// };

/**
 * ファイル名を生成する
 *
 * @param prefix - ファイル名のプレフィックス
 * @param date - 日付（オプション）
 * @returns 生成されたファイル名
 */
export const generateFileName = (prefix: string, date?: string): string => {
	const timestamp = date || new Date().toISOString().split("T")[0];
	return `${prefix}_${timestamp}.docx`;
};
