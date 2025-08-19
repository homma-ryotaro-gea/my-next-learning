"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

export function DatePicker() {
	const [date, setDate] = React.useState<Date>();
	const [dateTimeInputs, setDateTimeInputs] = React.useState([
		{ id: 0, startDate: "", startTime: "", endTime: "" },
	]);
	// 候補件数
	const [candidates, setCandidates] = React.useState(0);

	React.useEffect(() => {
		if (date) {
			const formattedDate = dayjs(date).format("YYYY-MM-DD");
			const formattedTime = dayjs(date).format("HH:mm");
			setDateTimeInputs((prevInputs) => [
				...prevInputs,
				{
					id: candidates,
					startDate: formattedDate,
					startTime: formattedTime,
					endTime: "",
				},
			]);
		}
	}, [date, candidates]);

	console.log("dateTimeInputs", dateTimeInputs);

	return (
		<Popover modal={true}>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[280px] justify-start text-left font-normal",
						!date && "text-muted-foreground",
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? dayjs(date).format("YYYY-MM-DD") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
