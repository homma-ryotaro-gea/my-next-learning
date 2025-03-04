"use client";
import { Button } from "@/components/ui/button";
import { CustomCalendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";
import { useState } from "react";
import type { DateRange as DateRangeType } from "react-day-picker";

type PropsType = {
  value: DateRangeType | undefined;
  setValue: (value: DateRangeType | undefined) => void;
};

const SelectDateRange = (props: PropsType) => {
  const { value, setValue } = props;
  // 日付選択表示状態
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild={true}>
        <Button
          variant={"outline"}
          className={`w-[220px] tracking-[1.25px] px-2 justify-center font-normal h-8 ${
            !value && "text-muted-foreground"
          }`}
        >
          {value?.from ? (
            value.to ? (
              <>
                {dayjs(value.from).format("YYYY/MM/DD")} -{" "}
                {dayjs(value.to).format("YYYY/MM/DD")}
              </>
            ) : (
              dayjs(value.from).format("YYYY/MM/DD")
            )
          ) : (
            <span className="text-geagray">2025/07/01 - 2025/07/31</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CustomCalendar
          initialFocus={true}
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={(e) => setValue(e)}
          numberOfMonths={2}
          onDayClick={() => {
            if (value?.from && !value.to) {
              setOpen(false);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default SelectDateRange;
