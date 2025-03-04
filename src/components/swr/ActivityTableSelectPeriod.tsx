import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DateRange } from "react-day-picker";
import SelectDateRange from "./SelectDateRange";

type PropsType = {
  selectedPeriod: string;
  setSelectedPeriod: (value: string) => void;
  dateRange: DateRange | undefined;
  changeDateRange: (value: DateRange | undefined) => void;
};

const ActivityTableSelectPeriod = (props: PropsType) => {
  const { selectedPeriod, setSelectedPeriod, dateRange, changeDateRange } =
    props;
  return (
    <div className="flex gap-3 items-center">
      <span className="text-geatextgray text-xs">集計期間</span>
      <Select
        onValueChange={(value) => setSelectedPeriod(value)}
        value={selectedPeriod}
      >
        <SelectTrigger className="w-[90px] text-geatextgray text-xs">
          <SelectValue placeholder={selectedPeriod} />
        </SelectTrigger>
        <SelectContent className="w-[90px]">
          <SelectItem value="0" className="text-xs">
            全期間
          </SelectItem>
          <SelectItem value="1" className="text-xs">
            指定期間
          </SelectItem>
        </SelectContent>
      </Select>
      {selectedPeriod === "1" && (
        <SelectDateRange value={dateRange} setValue={changeDateRange} />
      )}
    </div>
  );
};

export default ActivityTableSelectPeriod;
