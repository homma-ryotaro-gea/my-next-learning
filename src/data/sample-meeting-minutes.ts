import type { MeetingMinutes } from "@/types/meeting-minutes";

/**
 * サンプルの議事録データ
 */
export const sampleMeetingMinutes: MeetingMinutes = {
	title: "第１０回　社員総会",
	date: "令和8年2月1日",
	time: "11時00分",
	location: "本社会議室",
	totalMembers: 5,
	attendingMembers: 4,
	attendees: [
		{
			name: "鈴木 太郎",
			position: "代表社員",
			role: "議長兼議事録作成者",
		},
		{
			name: "佐藤 二郎",
			position: "社員",
		},
		{
			name: "田中 三郎",
			position: "社員",
		},
		{
			name: "中村 アルベルト 四郎",
			position: "社員",
		},
	],
	agendaItems: [
		{
			id: 1,
			title: "決算報告書の承認に関する件",
			description:
				"当会社第10期（自 令和7年1月1日　至 令和7年12月31日）における事業の概況報告の後、別冊決算書（貸借対照表、損益計算書、及び株主資本等変動計算書、個別注記表）について承認する。",
		},
		{
			id: 2,
			title: "役員報酬額の承認に関する件",
			description: "各社員の役員報酬を下記の通りにすることについて承認する。",
			details: [
				"代表社員　鈴木 太郎　月額報酬　1,000,000円",
				"社員　佐藤 二郎　月額報酬　1,200,000円",
				"社員　田中 三郎　月額報酬　900,000円",
				"社員　中村 アルベルト 四郎　月額報酬　850,000円",
			],
		},
		{
			id: 3,
			title: "事前確定届出給与支払の承認に関する件",
			description:
				"事前確定届出給与を下記の通りに支給することについて承認する。",
			details: [
				"代表社員　鈴木 太郎　支給額　6,000,000円",
				"社員　佐藤 二郎　支給額　7,200,000円",
				"社員　田中 三郎　支給額　5,400,000円",
				"社員　中村 アルベルト 四郎　支給額　5,100,000円",
			],
		},
	],
	resolutions: [
		{
			agendaId: 1,
			content: "決算報告書を承認する",
		},
		{
			agendaId: 2,
			content: "役員報酬額を承認する",
			effectiveDate: "令和8年2月10日支給分より",
		},
		{
			agendaId: 3,
			content: "事前確定届出給与支払を承認する",
			paymentDate: "令和8年12月10日支給",
		},
	],
	closingTime: "11時30分",
	companyName: "合同会社GeaRaise",
};
