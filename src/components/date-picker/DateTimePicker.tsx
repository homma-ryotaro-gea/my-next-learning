"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type PropsType = {
  time: string;
  setTime: (time: string) => void;
  hours?: string[];
  minutes?: string[];
  disabled?: boolean;
  disabledMinutes?: boolean;
  disabledClassName?: string;
  placeholder?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const DateTimePicker = (props: PropsType) => {
  const {
    time,
    setTime,
    hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0")),
    minutes = Array.from({ length: 4 }, (_, i) =>
      String(i * 15).padStart(2, "0")
    ),
    disabled = false,
    disabledMinutes = false,
    disabledClassName = "",
    placeholder = "--:--",
    open = undefined,
    onOpenChange,
  } = props;

  const [isOpen, setIsOpen] = React.useState(false);

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    let newTime = time;
    if (type === "hour") {
      newTime = `${value}:00`;
    } else {
      newTime = `${time.split(":")[0]}:${value}`;
      if (onOpenChange) {
        onOpenChange(false);
      } else {
        setIsOpen(false);
      }
    }
    setTime(newTime);
  };

  /**
   * 時間をクリアする
   */
  const handleClear = () => {
    setTime("");
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <Popover
      open={open || isOpen}
      onOpenChange={onOpenChange || setIsOpen}
      modal
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal",
            !time && "text-muted-foreground",
            disabledClassName
          )}
          disabled={disabled}
          onClick={() => {
            if (disabled) {
              return;
            }
            setIsOpen(true);
          }}
        >
          {time ? (
            time
              .split(":")
              .map((t) => t.padStart(2, "0"))
              .join(":")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <div>
            <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex p-2 sm:flex-col">
                  {hours.map((hour) => (
                    <Button
                      key={hour}
                      size="icon"
                      variant={
                        time.split(":")[0] === hour ? "secondary" : "ghost"
                      }
                      className="aspect-square shrink-0 sm:w-full"
                      onClick={() => {
                        handleTimeChange("hour", hour);
                      }}
                    >
                      {hour.toString().padStart(2, "0")}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex p-2 sm:flex-col">
                  {minutes.map((minute) => (
                    <Button
                      key={minute}
                      size="icon"
                      variant={
                        time.split(":")[1] === minute ? "secondary" : "ghost"
                      }
                      className="aspect-square shrink-0 sm:w-full"
                      onClick={() => handleTimeChange("minute", minute)}
                      disabled={disabledMinutes}
                    >
                      {minute}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
            </div>
            <Button className="w-full" variant="ghost" onClick={handleClear}>
              クリア
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

DateTimePicker.defaultProps = {
  hours: Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0")),
  minutes: Array.from({ length: 4 }, (_, i) => String(i * 15).padStart(2, "0")),
  disabled: false,
  disabledClassName: "",
  placeholder: "--:--",
  disabledMinutes: false,
  open: undefined,
  onOpenChange: () => {},
};

export default DateTimePicker;
