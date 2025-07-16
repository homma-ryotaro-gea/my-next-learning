import { useCallback, useEffect, useMemo, useState } from "react";
// 春分・秋分の日を計算する関数
function calculateEquinox(year: number, isAutumn: boolean): number {
  // 春分の日と秋分の日の近似計算
  let day: number;
  if (isAutumn) {
    // 秋分の日の計算
    day = Math.floor(
      23.2488 + 0.242194 * (year - 1851) - Math.floor((year - 1851) / 4)
    );
  } else {
    // 春分の日の計算
    day = Math.floor(
      20.8431 + 0.242194 * (year - 1851) - Math.floor((year - 1851) / 4)
    );
  }
  return day;
}

// ハッピーマンデー制度対象の祝日を計算する関数
function getNthMonday(year: number, month: number, nth: number): number {
  const firstDay = new Date(year, month - 1, 1);
  const firstMonday = 1 + ((8 - firstDay.getDay()) % 7);
  return firstMonday + (nth - 1) * 7;
}

/**
 * 指定した年の日本の祝日一覧を取得する
 * @param year 年
 * @returns 祝日の配列 [月, 日] の形式
 */
function getJapaneseHolidays(year: number): Array<[number, number]> {
  const holidays: Array<[number, number]> = [];

  // 固定祝日
  holidays.push([1, 1]); // 元日
  holidays.push([2, 11]); // 建国記念の日
  holidays.push([4, 29]); // 昭和の日
  holidays.push([5, 3]); // 憲法記念日
  holidays.push([5, 4]); // みどりの日
  holidays.push([5, 5]); // こどもの日
  holidays.push([8, 11]); // 山の日
  holidays.push([11, 3]); // 文化の日
  holidays.push([11, 23]); // 勤労感謝の日

  // 天皇誕生日（年によって変わる）
  if (year >= 2020) {
    holidays.push([2, 23]); // 現在の天皇誕生日
  } else if (year >= 1989) {
    holidays.push([12, 23]); // 平成の天皇誕生日
  } else {
    holidays.push([4, 29]); // 昭和の天皇誕生日（昭和の日として継続）
  }

  // ハッピーマンデー制度
  if (year >= 2000) {
    holidays.push([1, getNthMonday(year, 1, 2)]); // 成人の日（1月第2月曜日）
  } else {
    holidays.push([1, 15]); // 成人の日（1月15日）
  }

  if (year >= 2003) {
    holidays.push([7, getNthMonday(year, 7, 3)]); // 海の日（7月第3月曜日）
  } else if (year >= 1996) {
    holidays.push([7, 20]); // 海の日（7月20日）
  }

  if (year >= 2000) {
    holidays.push([9, getNthMonday(year, 9, 3)]); // 敬老の日（9月第3月曜日）
  } else if (year >= 1966) {
    holidays.push([9, 15]); // 敬老の日（9月15日）
  }

  if (year >= 2000) {
    holidays.push([10, getNthMonday(year, 10, 2)]); // 体育の日/スポーツの日（10月第2月曜日）
  } else if (year >= 1966) {
    holidays.push([10, 10]); // 体育の日（10月10日）
  }

  // 春分の日・秋分の日
  holidays.push([3, calculateEquinox(year, false)]); // 春分の日
  holidays.push([9, calculateEquinox(year, true)]); // 秋分の日

  // 令和特別措置
  if (year === 2019) {
    holidays.push([5, 1]); // 天皇の即位の日
    holidays.push([10, 22]); // 即位礼正殿の儀
  }
  if (year === 2020) {
    // オリンピック特別措置（コロナで延期されたが祝日は変更済み）
    holidays.push([7, 23]); // 海の日（移動）
    holidays.push([7, 24]); // スポーツの日（移動）
  }
  if (year === 2021) {
    // オリンピック特別措置
    holidays.push([7, 22]); // 海の日（移動）
    holidays.push([7, 23]); // スポーツの日（移動）
  }

  // 振替休日の追加
  const holidayDates = holidays.map(
    ([month, day]) => new Date(year, month - 1, day)
  );
  const substituteDays = holidayDates.filter((date) => {
    // 日曜日の場合、次の平日を振替休日とする
    if (date.getDay() === 0) {
      const substituteDate = new Date(date);
      substituteDate.setDate(date.getDate() + 1);
      // 次の日も祝日の場合は、その次の平日を探す
      while (
        holidayDates.some((h) => h.getTime() === substituteDate.getTime())
      ) {
        substituteDate.setDate(substituteDate.getDate() + 1);
      }
      holidays.push([substituteDate.getMonth() + 1, substituteDate.getDate()]);
      return true;
    }
    return false;
  });

  return holidays;
}

/**
 * 指定した日付が日本の祝日かどうかを判定する
 * @param date 判定したい日付
 * @returns 祝日の場合true
 */
function isJapaneseHoliday(date: Date): boolean {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const holidays = getJapaneseHolidays(year);
  return holidays.some(
    ([holidayMonth, holidayDay]) => month === holidayMonth && day === holidayDay
  );
}

/**
 * 指定した日付が営業日かどうかを判定する
 * @param date 判定したい日付
 * @returns 営業日の場合true、休業日の場合false
 */
function isBusinessDay(date: Date): boolean {
  // 土日チェック（0: 日曜日, 6: 土曜日）
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return false;
  }

  // 祝日チェック
  return !isJapaneseHoliday(date);
}

/**
 * 指定した年、月の配列、第N営業日から営業日の配列を取得する
 * @param year 年
 * @param months 月の配列
 * @param nthBusinessDay 第N営業日
 * @returns 営業日の配列
 */
export function getSpecificBusinessDays(
  year: number,
  months: number[],
  nthBusinessDay: number
): Date[] {
  const businessDays: Date[] = [];

  for (const month of months) {
    const nthDay = getNthBusinessDayOfMonth(year, month, nthBusinessDay);
    if (nthDay) {
      businessDays.push(nthDay);
    }
  }

  return businessDays;
}

/**
 * 基本的な営業日判定Hook
 * @param date 判定したい日付（省略時は今日）
 * @returns 営業日かどうかの判定結果
 */
export function useIsBusinessDay(date?: Date) {
  const targetDate = useMemo(() => date || new Date(), [date]);

  const isBusinessDayResult = useMemo(() => {
    return isBusinessDay(targetDate);
  }, [targetDate]);

  return isBusinessDayResult;
}

/**
 * 現在の日付と営業日情報を管理するHook
 */
export function useCurrentBusinessDay() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const isCurrentBusinessDay = useIsBusinessDay(currentDate);

  const updateCurrentDate = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  useEffect(() => {
    // 日付が変わった時に自動更新（日付変更時のみ）
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const timer = setTimeout(() => {
      updateCurrentDate();
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, [updateCurrentDate]);

  return {
    currentDate,
    isCurrentBusinessDay,
    updateCurrentDate,
  };
}

/**
 * 期間内の営業日を取得するHook
 * @param startDate 開始日
 * @param endDate 終了日
 * @returns 営業日の配列と関連情報
 */
export function useBusinessDays(startDate: Date, endDate: Date) {
  const businessDays = useMemo(() => {
    const days: Date[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (isBusinessDay(currentDate)) {
        days.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }, [startDate, endDate]);

  const businessDayCount = useMemo(() => businessDays.length, [businessDays]);

  return {
    businessDays,
    businessDayCount,
  };
}

/**
 * 営業日の加算・減算を行うHook
 * @param baseDate 基準日
 * @returns 営業日計算の関数群
 */
export function useBusinessDayCalculator(baseDate: Date) {
  const addBusinessDays = useCallback(
    (businessDaysToAdd: number): Date => {
      const resultDate = new Date(baseDate);
      let daysAdded = 0;

      while (daysAdded < businessDaysToAdd) {
        resultDate.setDate(resultDate.getDate() + 1);
        if (isBusinessDay(resultDate)) {
          daysAdded++;
        }
      }

      return resultDate;
    },
    [baseDate]
  );

  const subtractBusinessDays = useCallback(
    (businessDaysToSubtract: number): Date => {
      const resultDate = new Date(baseDate);
      let daysSubtracted = 0;

      while (daysSubtracted < businessDaysToSubtract) {
        resultDate.setDate(resultDate.getDate() - 1);
        if (isBusinessDay(resultDate)) {
          daysSubtracted++;
        }
      }

      return resultDate;
    },
    [baseDate]
  );

  const getNextBusinessDay = useCallback((): Date => {
    return addBusinessDays(1);
  }, [addBusinessDays]);

  const getPreviousBusinessDay = useCallback((): Date => {
    return subtractBusinessDays(1);
  }, [subtractBusinessDays]);

  return {
    addBusinessDays,
    subtractBusinessDays,
    getNextBusinessDay,
    getPreviousBusinessDay,
  };
}

/**
 * 営業日に関する包括的な情報を提供するHook
 * @param date 基準日（省略時は今日）
 * @returns 営業日に関する全ての情報と操作
 */
export function useBusinessDayInfo(date?: Date) {
  const baseDate = useMemo(() => date || new Date(), [date]);
  const isCurrentBusinessDay = useIsBusinessDay(baseDate);
  const calculator = useBusinessDayCalculator(baseDate);

  const nextBusinessDay = useMemo(
    () => calculator.getNextBusinessDay(),
    [calculator]
  );

  const previousBusinessDay = useMemo(
    () => calculator.getPreviousBusinessDay(),
    [calculator]
  );

  return {
    baseDate,
    isCurrentBusinessDay,
    nextBusinessDay,
    previousBusinessDay,
    ...calculator,
  };
}

/**
 * 営業日カウントダウン機能を提供するHook
 * @param targetDate 目標日
 * @returns カウントダウン情報
 */
export function useBusinessDayCountdown(targetDate: Date) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const countdown = useMemo(() => {
    if (currentDate >= targetDate) {
      return {
        businessDaysRemaining: 0,
        isTargetReached: true,
        businessDays: [],
      };
    }

    const days: Date[] = [];
    const tempDate = new Date(currentDate);
    tempDate.setDate(tempDate.getDate() + 1); // 明日から開始

    while (tempDate < targetDate) {
      if (isBusinessDay(tempDate)) {
        days.push(new Date(tempDate));
      }
      tempDate.setDate(tempDate.getDate() + 1);
    }

    return {
      businessDaysRemaining: days.length,
      isTargetReached: false,
      businessDays: days,
    };
  }, [currentDate, targetDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60); // 1時間ごとに更新

    return () => clearInterval(timer);
  }, []);

  return countdown;
}

/**
 * 指定した月の第N営業日を取得する
 * @param year 年
 * @param month 月（1-12）
 * @param nthBusinessDay 第N営業日（1から開始）
 * @returns 第N営業日のDate、存在しない場合はnull
 */
function getNthBusinessDayOfMonth(
  year: number,
  month: number,
  nthBusinessDay: number
): Date | null {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);

  let businessDayCount = 0;
  const currentDate = new Date(firstDayOfMonth);

  while (currentDate <= lastDayOfMonth) {
    if (isBusinessDay(currentDate)) {
      businessDayCount++;
      if (businessDayCount === nthBusinessDay) {
        return new Date(currentDate);
      }
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return null; // 指定した営業日数が月内に存在しない場合
}

/**
 * 指定した月の全営業日を取得する
 * @param year 年
 * @param month 月（1-12）
 * @returns その月の全営業日の配列
 */
function getBusinessDaysOfMonth(year: number, month: number): Date[] {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);

  const businessDays: Date[] = [];
  const currentDate = new Date(firstDayOfMonth);

  while (currentDate <= lastDayOfMonth) {
    if (isBusinessDay(currentDate)) {
      businessDays.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return businessDays;
}

/**
 * 指定月の第N営業日を取得するHook
 * @param year 年
 * @param month 月（1-12）
 * @param nthBusinessDay 第N営業日（1から開始）
 * @returns 第N営業日の情報
 */
export function useNthBusinessDay(
  year: number,
  month: number,
  nthBusinessDay: number
) {
  const result = useMemo(() => {
    const nthDay = getNthBusinessDayOfMonth(year, month, nthBusinessDay);
    const allBusinessDays = getBusinessDaysOfMonth(year, month);

    return {
      date: nthDay,
      exists: nthDay !== null,
      totalBusinessDaysInMonth: allBusinessDays.length,
      allBusinessDays,
      isValidRequest:
        nthBusinessDay > 0 && nthBusinessDay <= allBusinessDays.length,
    };
  }, [year, month, nthBusinessDay]);

  return result;
}

/**
 * 指定月の営業日情報を包括的に取得するHook
 * @param year 年
 * @param month 月（1-12）
 * @returns 月の営業日に関する全情報
 */
export function useMonthlyBusinessDays(year: number, month: number) {
  const monthlyInfo = useMemo(() => {
    const allBusinessDays = getBusinessDaysOfMonth(year, month);
    const firstBusinessDay = allBusinessDays[0] || null;
    const lastBusinessDay = allBusinessDays[allBusinessDays.length - 1] || null;

    // 各営業日を第N営業日として番号付け
    const businessDayMap = new Map<string, number>();
    allBusinessDays.forEach((date, index) => {
      const dateString = date.toISOString().split("T")[0];
      businessDayMap.set(dateString, index + 1);
    });

    return {
      year,
      month,
      allBusinessDays,
      totalBusinessDays: allBusinessDays.length,
      firstBusinessDay,
      lastBusinessDay,
      businessDayMap,
    };
  }, [year, month]);

  const getNthBusinessDay = useCallback(
    (nth: number) => {
      return getNthBusinessDayOfMonth(year, month, nth);
    },
    [year, month]
  );

  const getBusinessDayNumber = useCallback(
    (date: Date): number | null => {
      const dateString = date.toISOString().split("T")[0];
      return monthlyInfo.businessDayMap.get(dateString) || null;
    },
    [monthlyInfo.businessDayMap]
  );

  const isDateNthBusinessDay = useCallback(
    (date: Date, nth: number): boolean => {
      const nthDay = getNthBusinessDay(nth);
      if (!nthDay) return false;

      return date.toDateString() === nthDay.toDateString();
    },
    [getNthBusinessDay]
  );

  return {
    ...monthlyInfo,
    getNthBusinessDay,
    getBusinessDayNumber,
    isDateNthBusinessDay,
  };
}
