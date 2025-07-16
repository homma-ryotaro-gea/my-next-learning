"use client";

import {
  getSpecificBusinessDays,
  useBusinessDayCalculator,
  useBusinessDayCountdown,
  useBusinessDayInfo,
  useBusinessDays,
  useCurrentBusinessDay,
  useIsBusinessDay,
  useMonthlyBusinessDays,
  useNthBusinessDay,
} from "@/hooks/japanese-holidays-hooks/useIsBusinessDay";

const JapaneseHolidays = () => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  // 基本的な営業日判定
  const isTodayBusinessDay = useIsBusinessDay();

  // 現在の営業日情報
  const { currentDate, isCurrentBusinessDay } = useCurrentBusinessDay();

  // 期間内営業日取得
  const { businessDays, businessDayCount } = useBusinessDays(today, nextWeek);

  // 営業日計算
  const { addBusinessDays, getNextBusinessDay } =
    useBusinessDayCalculator(today);

  // 包括的な営業日情報
  const businessDayInfo = useBusinessDayInfo();

  // カウントダウン
  const countdown = useBusinessDayCountdown(nextWeek);

  // 2025年5月の第1営業日取得の例
  const may2025FirstBusinessDay = useNthBusinessDay(2025, 5, 1);
  // 2025年6月の第1営業日取得の例
  const june2025FirstBusinessDay = useNthBusinessDay(2025, 6, 1);
  // 2025年7月の第1営業日取得の例
  const july2025FirstBusinessDay = useNthBusinessDay(2025, 7, 1);
  // 2025年5月の月次営業日情報
  const may2025Info = useMonthlyBusinessDays(2025, 5);

  // 2025年1月から12月までの第1営業日取得の例
  // 現在の月を取得
  const currentMonth = currentDate.getMonth() + 1;
  const firstBusinessDays = getSpecificBusinessDays(
    2025,
    // 現在の月から12ヶ月分の月を取得
    Array.from({ length: 12 }, (_, i) => i + currentMonth),
    1
  ).slice(0, 3);

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="font-bold">基本的な営業日判定</h3>
        <p>今日は営業日? {isTodayBusinessDay ? "はい" : "いいえ"}</p>
      </div>

      <div>
        <h3 className="font-bold">現在の営業日情報</h3>
        <p>現在日時: {currentDate.toLocaleDateString()}</p>
        <p>営業日? {isCurrentBusinessDay ? "はい" : "いいえ"}</p>
      </div>

      <div>
        <h3 className="font-bold">期間内営業日</h3>
        <p>営業日数: {businessDayCount}日</p>
        <p>
          営業日一覧:{" "}
          {businessDays.map((d) => d.toLocaleDateString()).join(", ")}
        </p>
      </div>

      <div>
        <h3 className="font-bold">営業日計算</h3>
        <p>3営業日後: {addBusinessDays(3).toLocaleDateString()}</p>
        <p>次の営業日: {getNextBusinessDay().toLocaleDateString()}</p>
      </div>

      <div>
        <h3 className="font-bold">包括的情報</h3>
        <p>
          次の営業日: {businessDayInfo.nextBusinessDay.toLocaleDateString()}
        </p>
        <p>
          前の営業日: {businessDayInfo.previousBusinessDay.toLocaleDateString()}
        </p>
      </div>

      <div>
        <h3 className="font-bold">カウントダウン</h3>
        <p>来週まで残り営業日: {countdown.businessDaysRemaining}日</p>
        <p>目標到達? {countdown.isTargetReached ? "はい" : "いいえ"}</p>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-bold text-blue-600">【新機能】第N営業日取得</h3>
        <div className="bg-blue-50 p-3 rounded">
          <p className="font-semibold">2025年5月の第1営業日</p>
          <p>
            日付:{" "}
            {may2025FirstBusinessDay.date?.toLocaleDateString() ||
              "存在しません"}
          </p>
          <p>存在: {may2025FirstBusinessDay.exists ? "はい" : "いいえ"}</p>
          <p>
            5月の総営業日数: {may2025FirstBusinessDay.totalBusinessDaysInMonth}
            日
          </p>
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <p className="font-semibold">2025年6月の第1営業日</p>
          <p>
            日付:{" "}
            {june2025FirstBusinessDay.date?.toLocaleDateString() ||
              "存在しません"}
          </p>
          <p>存在: {june2025FirstBusinessDay.exists ? "はい" : "いいえ"}</p>
          <p>
            6月の総営業日数: {june2025FirstBusinessDay.totalBusinessDaysInMonth}
            日
          </p>
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <p className="font-semibold">2025年7月の第1営業日</p>
          <p>
            日付:{" "}
            {july2025FirstBusinessDay.date?.toLocaleDateString() ||
              "存在しません"}
          </p>
          <p>存在: {july2025FirstBusinessDay.exists ? "はい" : "いいえ"}</p>
          <p>
            7月の総営業日数: {july2025FirstBusinessDay.totalBusinessDaysInMonth}
            日
          </p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-bold text-blue-600">
          【新機能】指定年月の第N営業日取得
        </h3>
        <div className="bg-blue-50 p-3 rounded">
          <p className="font-semibold">2025年毎月の第1営業日</p>
          {firstBusinessDays.map((date, index) => (
            <p key={index}>
              日付: {date.toLocaleDateString() || "存在しません"}
            </p>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-green-600">月次営業日情報</h3>
        <div className="bg-green-50 p-3 rounded">
          <p>2025年5月の営業日数: {may2025Info.totalBusinessDays}日</p>
          <p>
            最初の営業日: {may2025Info.firstBusinessDay?.toLocaleDateString()}
          </p>
          <p>
            最後の営業日: {may2025Info.lastBusinessDay?.toLocaleDateString()}
          </p>
          <p>
            第10営業日:{" "}
            {may2025Info.getNthBusinessDay(10)?.toLocaleDateString() ||
              "存在しません"}
          </p>
          <div className="mt-2">
            <p className="font-semibold">営業日一覧（最初の5日）:</p>
            <ul className="list-disc list-inside">
              {may2025Info.allBusinessDays.slice(0, 5).map((date, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <li key={index}>
                  第{index + 1}営業日: {date.toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JapaneseHolidays;
