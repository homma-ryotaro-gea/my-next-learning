"use client";
import DateTimePicker from "@/components/date-picker/DateTimePicker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

const DatePickerPage = () => {
	const [time, setTime] = useState("");
	const [date, setDate] = useState<Date | undefined>();

	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: undefined,
		to: undefined,
	});
	return (
		<div>
			<DateTimePicker time={time} setTime={setTime} />
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						data-empty={!date}
						className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
					>
						<CalendarIcon />
						<span>
							{date ? `${format(date, "yyyy/MM/dd")}` : "Pick a date"}
						</span>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						defaultMonth={date}
						selected={date}
						onSelect={setDate}
						className="rounded-lg border shadow-sm"
						captionLayout="dropdown"
					/>
				</PopoverContent>
			</Popover>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						data-empty={!dateRange}
						className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
					>
						<CalendarIcon />
						<span>
							{dateRange?.from && dateRange?.to
								? `${format(dateRange.from, "yyyy/MM/dd")} - ${format(dateRange.to, "yyyy/MM/dd")}`
								: "Pick a date"}
						</span>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="range"
						numberOfMonths={2}
						defaultMonth={dateRange?.from}
						selected={dateRange}
						onSelect={setDateRange}
						className="rounded-lg border shadow-sm"
						captionLayout="dropdown"
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default DatePickerPage;
