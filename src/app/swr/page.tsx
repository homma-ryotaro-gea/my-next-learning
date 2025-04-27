"use client";
import ActivityTableSelectPeriod from "@/components/swr/ActivityTableSelectPeriod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dayjs from "dayjs";
import { parseAsString, useQueryState, useQueryStates } from "nuqs";
import { Suspense } from "react";
import type { DateRange } from "react-day-picker";
import useSWR from "swr";

const SWRContent = () => {
  let endpoint =
    "https://qiita.com/api/v2/items?page=1&per_page=100&query=user:qiita";
  let endpoint2 = "https://qiita.com/api/v2/items?page=1&per_page=100";

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // 集計期間選択状態
  const [selectedPeriod, setSelectedPeriod] = useQueryState(
    "selectedPeriod",
    parseAsString.withDefault("0")
  );

  // 日付選択状態
  const isDateRangeParser = {
    from: parseAsString.withDefault(""),
    to: parseAsString.withDefault(""),
  };
  const [dateRangeNuqs, setDateRangeNuqs] = useQueryStates(isDateRangeParser);
  console.log(dateRangeNuqs);

  if (dateRangeNuqs.from && dateRangeNuqs.to) {
    endpoint = `${endpoint}+created:>=${dateRangeNuqs.from}+created:<=${dateRangeNuqs.to}`;
    endpoint2 = `${endpoint}&query=created:>=${dateRangeNuqs.from}+created:<=${dateRangeNuqs.to}`;
  }
  console.log(endpoint);
  const totalCount = 0;
  // const { data:totalCount } = useSWR("https://qiita.com/api/v2/items?page=1&per_page=100&query=user:qiita", fetcher);
  const { data, isLoading } = useSWR(endpoint, fetcher);
  const { data: data2, isLoading: isLoading2 } = useSWR(endpoint2, fetcher);
  /**
   * 日付範囲変更
   * @param value 日付範囲
   */
  const changeDateRange = (value: DateRange | undefined) => {
    // valueがfromのみの場合、fromに値をセット
    if (value?.from && !value?.to) {
      setDateRangeNuqs({
        ...dateRangeNuqs,
        from: dayjs(value?.from).format("YYYY-MM-DD") ?? undefined,
      });
    } else {
      setDateRangeNuqs({
        from: dayjs(value?.from).format("YYYY-MM-DD") ?? undefined,
        to: dayjs(value?.to).format("YYYY-MM-DD") ?? undefined,
      });
    }
  };
  /**
   * 日付期間変更
   * @param value 日付期間
   */
  const changeSelectPeriod = (value: string) => {
    // 指定期間の日付が設定されている場合
    if (value === "0" && (dateRangeNuqs.from || dateRangeNuqs.to)) {
      setDateRangeNuqs({
        from: "",
        to: "",
      });
    }
    setSelectedPeriod(value);
  };
  console.log("data2", data2);

  return (
    <div>
      <div>{totalCount}</div>
      <ActivityTableSelectPeriod
        changeDateRange={changeDateRange}
        dateRange={{
          from: dateRangeNuqs.from
            ? dayjs(dateRangeNuqs.from).toDate()
            : undefined,
          to: dateRangeNuqs.to ? dayjs(dateRangeNuqs.to).toDate() : undefined,
        }}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={changeSelectPeriod}
      />
      <Tabs defaultValue="qiita" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="qiita">Qiita</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
        <TabsContent value="qiita">
          {isLoading && <p>Loading...</p>}

          {!isLoading &&
            data &&
            data.map(
              (item: { id: string; created_at: string; title: string }) => (
                <div key={item.id} className="flex gap-4">
                  <p>{dayjs(item.created_at).format("YYYY/MM/DD")}</p>
                  <p>{item.title}</p>
                </div>
              )
            )}
        </TabsContent>
        <TabsContent value="other">
          {isLoading2 && <p>Loading...</p>}

          {!isLoading2 &&
            data2 &&
            data2.map(
              (item: { id: string; created_at: string; title: string }) => (
                <div key={item.id} className="flex gap-4">
                  <p>{dayjs(item.created_at).format("YYYY/MM/DD")}</p>
                  <p>{item.title}</p>
                </div>
              )
            )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const SWRPage = () => {
  return (
    <Suspense>
      <SWRContent />
    </Suspense>
  );
};

export default SWRPage;
