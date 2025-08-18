import type { MeetingMinutes, StyleConfig } from "@/types/meeting-minutes";
import {
	AlignmentType,
	Document,
	Header,
	HeadingLevel,
	Paragraph,
	TextRun,
	UnderlineType,
} from "docx";

/**
 * デフォルトのスタイル設定
 */
const defaultStyleConfig: StyleConfig = {
	default: {
		font: {
			name: "Yu Mincho",
			size: 20,
			color: "#495057",
		},
		spacing: {
			before: 0,
			after: 0,
		},
	},
	title: {
		font: {
			name: "Yu Mincho",
			size: 30,
			color: "#495057",
		},
		spacing: {
			before: 0,
			after: 120,
		},
		alignment: "center",
	},
	heading: {
		font: {
			name: "Yu Mincho",
			size: 20,
			color: "#495057",
		},
		spacing: {
			before: 240,
			after: 120,
		},
	},
	body: {
		font: {
			name: "Yu Mincho",
			size: 20,
			color: "#495057",
		},
		spacing: {
			before: 0,
			after: 0,
		},
	},
};

/**
 * テキストランを作成する
 */
const createTextRun = (text: string, style: StyleConfig["default"]) => {
	return new TextRun({
		text,
		font: {
			name: style.font.name,
		},
		color: style.font.color,
		size: style.font.size as number,
	});
};

/**
 * 段落を作成する
 */
const createParagraph = (
	children: TextRun[],
	style:
		| StyleConfig["default"]
		| StyleConfig["title"]
		| StyleConfig["heading"]
		| StyleConfig["body"],
	options?: {
		heading?: (typeof HeadingLevel)[keyof typeof HeadingLevel];
		alignment?: (typeof AlignmentType)[keyof typeof AlignmentType];
	},
) => {
	return new Paragraph({
		children,
		heading: options?.heading,
		alignment:
			options?.alignment || style.alignment === "center"
				? AlignmentType.CENTER
				: AlignmentType.LEFT,
		spacing: {
			before: style.spacing.before,
			after: style.spacing.after,
		},
	});
};

/**
 * 議事録からWord文書を生成する
 */
export const buildMeetingMinutesDocument = (
	meetingMinutes: MeetingMinutes,
	customStyle?: Partial<StyleConfig>,
): Document => {
	const style = { ...defaultStyleConfig, ...customStyle };

	// ヘッダー作成
	const header = new Header({
		children: [
			createParagraph(
				[createTextRun(meetingMinutes.title, style.title)],
				style.title,
				{ heading: HeadingLevel.HEADING_1 },
			),
		],
	});

	// 本文作成
	const children: Paragraph[] = [];

	// 開会情報
	children.push(
		createParagraph(
			[
				createTextRun(
					`${meetingMinutes.date}${meetingMinutes.time}より、${meetingMinutes.location}において社員総会を開催した。`,
					style.body,
				),
			],
			style.body,
		),
	);

	// 議決権と出席者数
	children.push(
		createParagraph(
			[
				createTextRun(
					`　議決権のある社員の総数　　${meetingMinutes.totalMembers}名`,
					style.body,
				),
			],
			style.body,
		),
	);

	children.push(
		createParagraph(
			[
				createTextRun(
					`　出席社員の数　　${meetingMinutes.attendingMembers}名`,
					style.body,
				),
			],
			style.body,
		),
	);

	// 出席者名
	const attendeeNames = meetingMinutes.attendees
		.map((attendee) => {
			if (attendee.role) {
				return `${attendee.role}　${attendee.name}`;
			}
			return `${attendee.position}　${attendee.name}`;
		})
		.join("、");

	children.push(
		createParagraph(
			[createTextRun(`　出席社員の氏名　　${attendeeNames}`, style.body)],
			style.body,
		),
	);

	// 空行
	children.push(createParagraph([new TextRun("")], style.body));

	// 開会宣言
	children.push(
		createParagraph(
			[
				createTextRun(
					`　定刻に代表社員　${meetingMinutes.attendees[0]?.name}は議長席につき、開会を宣言し、以下の議案について総社員の同意があった。`,
					style.body,
				),
			],
			style.body,
		),
	);

	// 空行
	children.push(createParagraph([new TextRun("")], style.body));

	// 議案と決議事項
	for (let index = 0; index < meetingMinutes.agendaItems.length; index++) {
		const agendaItem = meetingMinutes.agendaItems[index];

		// 議案タイトル
		children.push(
			createParagraph(
				[
					createTextRun(
						`第${index + 1}号議案　${agendaItem.title}`,
						style.heading,
					),
				],
				style.heading,
			),
		);

		// 議案の説明
		children.push(
			createParagraph(
				[createTextRun(`　${agendaItem.description}`, style.body)],
				style.body,
			),
		);

		// 詳細がある場合
		if (agendaItem.details) {
			for (const detail of agendaItem.details) {
				children.push(
					createParagraph(
						[createTextRun(`　　${detail}`, style.body)],
						style.body,
					),
				);
			}
		}

		// 空行
		children.push(createParagraph([new TextRun("")], style.body));
	}

	// 閉会情報
	children.push(
		createParagraph(
			[
				createTextRun(
					`　${meetingMinutes.closingTime}に議長は以上をもって本日の議事を終了した旨を述べ、閉会した。`,
					style.body,
				),
			],
			style.body,
		),
	);

	children.push(
		createParagraph(
			[
				createTextRun(
					"以上の決議を明確にするため、この議事録をつくり、議長及び出席社員がこれに記名押印する。",
					style.body,
				),
			],
			style.body,
		),
	);

	// 空行
	children.push(createParagraph([new TextRun("")], style.body));

	// 会社名と日付
	children.push(
		createParagraph(
			[
				createTextRun(
					`　${meetingMinutes.date}  ${meetingMinutes.companyName}　社員総会`,
					style.body,
				),
			],
			style.body,
		),
	);

	// 空行
	children.push(createParagraph([new TextRun("")], style.body));

	// 署名欄
	for (const attendee of meetingMinutes.attendees) {
		let signatureText = "　　　";
		if (attendee.role) {
			signatureText += `${attendee.role}　${attendee.name}　　　印`;
		} else {
			signatureText += `${attendee.position}　${attendee.name}　　　印`;
		}

		children.push(
			createParagraph([createTextRun(signatureText, style.body)], style.body),
		);
	}

	// 空行
	children.push(createParagraph([new TextRun("")], style.body));

	return new Document({
		sections: [
			{
				properties: {},
				headers: {
					default: header,
				},
				children,
			},
		],
		styles: {
			default: {
				heading1: {
					run: {
						size: 30,
						bold: true,
						italics: false,
						color: "#495057",
						font: "Yu Mincho",
					},
					paragraph: {
						spacing: {
							after: 120,
						},
					},
				},
				heading2: {
					run: {
						size: 26,
						bold: true,
						underline: {
							type: UnderlineType.DOUBLE,
							color: "FF0000",
						},
						font: "Yu Mincho",
					},
					paragraph: {
						spacing: {
							before: 240,
							after: 120,
						},
					},
				},
			},
		},
	});
};
