/**
 * 出席者の型定義
 */
export interface Attendee {
	name: string;
	position: string;
	role?: string; // 議長、議事録作成者など
}

/**
 * 議案の型定義
 */
export interface AgendaItem {
	id: number;
	title: string;
	description: string;
	details?: string[];
}

/**
 * 決議事項の型定義
 */
export interface Resolution {
	agendaId: number;
	content: string;
	amount?: number; // 金額がある場合
	effectiveDate?: string; // 変更時期
	paymentDate?: string; // 支給時期
}

/**
 * 議事録の型定義
 */
export interface MeetingMinutes {
	title: string;
	date: string;
	time: string;
	location: string;
	totalMembers: number;
	attendingMembers: number;
	attendees: Attendee[];
	agendaItems: AgendaItem[];
	resolutions: Resolution[];
	closingTime: string;
	companyName: string;
}

/**
 * 文書スタイルの型定義
 */
export interface DocumentStyle {
	font: {
		name: string;
		size: number;
		color: string;
	};
	spacing: {
		before: number;
		after: number;
	};
	alignment?: "left" | "center" | "right" | "justify";
}

/**
 * スタイル設定の型定義
 */
export interface StyleConfig {
	default: DocumentStyle;
	title: DocumentStyle;
	heading: DocumentStyle;
	body: DocumentStyle;
}
