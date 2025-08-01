"use client";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

const RHFUseFieldArrayPage = () => {
	const main_user = true;

	// 名前の選択肢を定義
	const firstNameOptions = [
		{ value: "山田", label: "山田" },
		{ value: "佐々木", label: "佐々木" },
		{ value: "田中", label: "田中" },
		{ value: "鈴木", label: "鈴木" },
		{ value: "高橋", label: "高橋" },
		{ value: "伊藤", label: "伊藤" },
		{ value: "渡辺", label: "渡辺" },
		{ value: "中村", label: "中村" },
	];

	const lastNameOptions = [
		{ value: "太郎", label: "太郎" },
		{ value: "花子", label: "花子" },
		{ value: "次郎", label: "次郎" },
		{ value: "美咲", label: "美咲" },
		{ value: "健一", label: "健一" },
		{ value: "恵子", label: "恵子" },
		{ value: "正男", label: "正男" },
		{ value: "由美", label: "由美" },
	];

	// 月の選択肢を定義
	const monthOptions = [
		{ value: "1", label: "1月" },
		{ value: "2", label: "2月" },
		{ value: "3", label: "3月" },
		{ value: "4", label: "4月" },
		{ value: "5", label: "5月" },
		{ value: "6", label: "6月" },
		{ value: "7", label: "7月" },
		{ value: "8", label: "8月" },
		{ value: "9", label: "9月" },
		{ value: "10", label: "10月" },
		{ value: "11", label: "11月" },
		{ value: "12", label: "12月" },
	];

	const { register, control, handleSubmit, trigger } = useForm<{
		user_id: string;
		months: { value: string; label: string }[];
		main: { firstName: string; lastName: string }[];
		sub: { firstName: string; lastName: string }[];
	}>({
		defaultValues: {
			user_id: "1",
			months: [
				{ value: "", label: "" },
				{ value: "", label: "" },
			],
			main: main_user ? [{ firstName: "山田", lastName: "太郎" }] : [],
			sub: [
				{ firstName: "山田", lastName: "太郎" },
				{ firstName: "佐々木", lastName: "花子" },
			],
		},
	});

	const {
		fields: monthFields,
		append: monthAppend,
		remove: monthRemove,
		replace: monthReplace,
	} = useFieldArray({
		control,
		name: "months",
	});

	const { fields: mainFields, remove: mainRemove } = useFieldArray({
		control,
		name: "main",
	});
	const {
		fields: subFields,
		append: subAppend,
		remove: subRemove,
		replace: subReplace,
	} = useFieldArray({
		control,
		name: "sub",
	});

	const [isEditing, setIsEditing] = useState(false);

	// 月の書き換え処理
	const handleReplaceMonths = () => {
		const newMonths = [
			{ value: "3", label: "3月" },
			{ value: "6", label: "6月" },
			{ value: "9", label: "9月" },
			{ value: "12", label: "12月" },
		];
		monthReplace(newMonths);
	};

	// サブ担当者の書き換え処理
	const handleReplaceSubUsers = () => {
		const newSubUsers = [
			{ firstName: "田中", lastName: "次郎" },
			{ firstName: "鈴木", lastName: "美咲" },
			{ firstName: "高橋", lastName: "健一" },
		];
		subReplace(newSubUsers);
	};

	return (
		<div>
			<div className="mb-4 flex justify-end">
				<Button
					size={"lg"}
					onClick={() => {
						if (isEditing) {
							trigger().then((isValid) => {
								if (isValid) {
									setIsEditing(false);
								}
							});
						} else {
							setIsEditing(true);
						}
					}}
				>
					{isEditing ? "完了" : "編集"}
				</Button>
			</div>
			<form
				onSubmit={handleSubmit((data) => console.log(data))}
				className="w-full"
			>
				<div className="mb-4">
					<p className="mb-2">月を選択</p>
					<ul>
						{monthFields.map((item, index) => (
							<li key={item.id} className="mb-2 flex items-center gap-2">
								<Controller
									render={({ field }) => (
										<Select
											onValueChange={(value) =>
												field.onChange({ value, label: value })
											}
											value={field.value.value}
										>
											<SelectTrigger className="w-48">
												<SelectValue placeholder="月" />
											</SelectTrigger>
											<SelectContent>
												{monthOptions.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
									name={`months.${index}`}
									control={control}
								/>
								<Button
									onClick={() => monthRemove(index)}
									className="bg-red-500 hover:bg-red-600"
								>
									削除
								</Button>
							</li>
						))}
					</ul>
					<div className="flex gap-2">
						<Button
							onClick={() => {
								monthAppend(
									{
										value: "",
										label: "",
									},
									{ shouldFocus: true },
								);
							}}
							className="bg-blue-500 hover:bg-blue-600"
						>
							月を追加
						</Button>
						<Button
							onClick={handleReplaceMonths}
							className="bg-green-500 hover:bg-green-600"
						>
							月を書き換え
						</Button>
					</div>
				</div>
				<p>メイン担当者</p>
				<ul>
					{mainFields.map((item, index) => (
						<li key={item.id} className="grid grid-cols-3 gap-2">
							<Controller
								render={({ field }) => (
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="姓を選択" />
										</SelectTrigger>
										<SelectContent>
											{firstNameOptions.map((option) => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
								name={`main.${index}.firstName`}
								control={control}
							/>
							<Controller
								render={({ field }) => (
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="名を選択" />
										</SelectTrigger>
										<SelectContent>
											{lastNameOptions.map((option) => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
								name={`main.${index}.lastName`}
								control={control}
							/>
							<div className="flex items-center">
								<Button
									onClick={() => mainRemove(index)}
									className="bg-red-500 hover:bg-red-600"
								>
									削除
								</Button>
							</div>
						</li>
					))}
				</ul>
				<div className="mb-4">
					<p>サブ担当者</p>
					<Button
						onClick={handleReplaceSubUsers}
						className="mb-2 bg-green-500 hover:bg-green-600"
					>
						サブ担当者を書き換え
					</Button>
				</div>
				<ul>
					{subFields.map((item, index) => (
						<li key={item.id} className="grid grid-cols-3 gap-2">
							<Controller
								render={({ field }) => (
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="姓を選択" />
										</SelectTrigger>
										<SelectContent>
											{firstNameOptions.map((option) => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
								name={`sub.${index}.firstName`}
								control={control}
							/>
							<Controller
								render={({ field }) => (
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="名を選択" />
										</SelectTrigger>
										<SelectContent>
											{lastNameOptions.map((option) => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
								name={`sub.${index}.lastName`}
								control={control}
							/>
							<div className="flex items-center">
								<Button
									onClick={() => subRemove(index)}
									className="bg-red-500 hover:bg-red-600"
								>
									削除
								</Button>
							</div>
						</li>
					))}
				</ul>
				{subFields.length < 2 && (
					<Button
						onClick={() =>
							subAppend({
								firstName: "",
								lastName: "",
							})
						}
						className="bg-red-500 hover:bg-red-600"
					>
						サブ担当者追加
					</Button>
				)}
				<Button type="submit" className="bg-blue-500 hover:bg-blue-600">
					送信
				</Button>
			</form>
		</div>
	);
};

export default RHFUseFieldArrayPage;
