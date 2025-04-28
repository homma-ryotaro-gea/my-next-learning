import { useEffect, useMemo, useRef, useState } from "react";
import useSWRInfinite, { type SWRInfiniteConfiguration } from "swr/infinite";

// フックの引数の型定義
type PropsType<T> = {
  path: string; // APIのエンドポイントURL
  options?: SWRInfiniteConfiguration; // SWRの設定オプション
  pageParamName?: string; // ページネーションのクエリパラメータ名
  limitParamName?: string; // 1ページあたりの件数を指定するパラメータ名
  limitSize?: number; // 1ページあたりの件数
  queryParams?: Record<string, string>; // その他のクエリパラメータ
  getIdFromData?: (data: T) => number | string | null; // IDを取得するためのコールバック関数
  keyName?: string; // データのキー名
};

/**
 * 無限スクロール機能を実装するためのカスタムフック
 *
 * @description
 * このフックは以下の機能を提供します：
 * - Intersection Observerを使用した無限スクロールの実装
 * - SWR Infiniteを使用したデータフェッチング
 * - スクロール位置の自動制御
 * - ローディング状態の管理
 *
 * @param props - フックの設定オプション
 * @param props.path - APIのエンドポイントURL
 * @param props.options - SWRの設定オプション
 * @param props.pageParamName - ページネーションのクエリパラメータ名 (デフォルト: "page")
 * @param props.limitParamName - 1ページあたりの件数を指定するパラメータ名 (デフォルト: "limit")
 * @param props.limitSize - 1ページあたりの件数 (デフォルト: 20)
 * @param props.queryParams - その他のクエリパラメータ
 * @param props.keyName - データのキー名 (デフォルト: "id")
 * @returns {Object} フックの戻り値
 * @returns {RefObject} observerRef - Intersection Observer用のref
 * @returns {RefObject} loadMoreRef - 次のページ読み込みトリガー用のref
 * @returns {Array} fetchData - 取得した生データ
 * @returns {Error} error - エラー情報
 * @returns {number} size - 現在のページ数
 * @returns {Function} setSize - ページ数を変更する関数
 * @returns {Function} mutate - データを手動で更新する関数
 * @returns {boolean} isValidating - データ取得中かどうか
 * @returns {Array} data - 全ページのデータを結合した配列
 * @returns {boolean} isLoading - 初回ローディング中かどうか
 * @returns {boolean} isLoadingMore - 追加データ読み込み中かどうか
 * @returns {boolean} isEmpty - データが空かどうか
 * @returns {boolean} isReachingEnd - 最後のページに到達したかどうか
 * @returns {RefObject} containerRef - スクロールコンテナ用のref
 * @returns {RefObject} lastCommentRef - 最新のコメント位置特定用のref
 * @returns {number | null} lastId - 前回データ読み込みした時の最後のID
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const useInfiniteScroll = <T extends { [key: string]: any }[]>(
  props: PropsType<T>
) => {
  // Intersection Observer用のref
  const observerRef = useRef<IntersectionObserver | null>(null);
  // 次のページを読み込むトリガーとなる要素のref
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 前回データ読み込みした時の最後のIDを状態管理
  const [lastId, setLastId] = useState<number | null>(null);

  // propsのデフォルト値を設定
  const {
    path,
    options = {
      revalidateFirstPage: true, // 最初のページを再検証する
      revalidateOnFocus: false, // フォーカス時に再検証しない
      revalidateOnReconnect: false, // 再接続時に再検証しない
      dedupingInterval: 2000, // 重複リクエストを防ぐ間隔(ms)
      focusThrottleInterval: 5000, // フォーカスイベントの制限間隔(ms)
    },
    pageParamName = "page",
    limitParamName = "limit",
    limitSize = 20,
    queryParams,
    keyName = "id",
  } = props;

  // APIからデータを取得する関数
  const fetcher = async (url: string): Promise<T> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };
  // new Promise((resolve) => {
  //   setTimeout(() => {
  //     fetch(url)
  //       .then((res) => res.json())
  //       .then((data: T) => resolve(data));
  //   }, 500);
  // });

  // クエリパラメータを文字列に変換する関数
  const getQueryParams = () => {
    if (!queryParams) return "";
    return Object.entries(queryParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  };

  const query = getQueryParams();

  // SWRInfiniteのキー生成関数
  const getKey = (pageIndex: number, previousPageData: T | null) => {
    // 前のページが空の場合、これ以上データがないのでnullを返す
    if (previousPageData && !previousPageData.length) return null;
    // APIのURLを生成
    return `${path}?${pageParamName}=${
      pageIndex + 1
    }&${limitParamName}=${limitSize}&${query}`;
  };

  // SWRInfiniteフックを使用してデータを取得
  const {
    data: fetchData, // 取得したデータ
    error, // エラー情報
    size, // 現在のページ数
    setSize, // ページ数を変更する関数
    mutate, // データを手動で更新する関数
    isValidating, // データ取得中かどうか
  } = useSWRInfinite(getKey, fetcher, options);

  // 各種状態を管理
  const isEmpty = !fetchData || fetchData.length === 0; // データが空
  const isReachingEnd = // 最後のページに到達したかどうか
    isEmpty ||
    (fetchData && fetchData[fetchData.length - 1]?.length < limitSize);

  // 全ページのデータを1つの配列にまとめる
  const data = useMemo<T>(() => {
    if (!fetchData) return [] as unknown as T;
    return fetchData.flat().reverse() as unknown as T;
  }, [fetchData]);

  // データが更新された時に最後のIDを更新
  useEffect(() => {
    // データが空でない場合は最後のIDを更新
    if (data.length > 0) {
      setLastId(data[0][keyName]);
    }
  }, [data, keyName]);

  // Intersection Observerの設定
  useEffect(() => {
    if (!loadMoreRef.current) return;

    // 既存のオブザーバーをクリーンアップ
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // 新しいオブザーバーを作成
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        // 条件を満たした場合に次のページを読み込む
        if (entry.isIntersecting && !isReachingEnd && !isValidating && data) {
          setSize((prevSize) => prevSize + 1);
        }
      },
      { threshold: 0.5 } // 要素が50%表示されたときに発火
    );

    observer.observe(loadMoreRef.current);
    observerRef.current = observer;

    // クリーンアップ関数
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isReachingEnd, isValidating, setSize, data]);

  // スクロール位置を管理するref
  const containerRef = useRef<HTMLDivElement>(null);
  // 最新のコメントの位置を特定するref
  const lastCommentRef = useRef<HTMLDivElement>(null);

  // スクロール位置の制御
  useEffect(() => {
    if (!containerRef.current) return;

    // 初期表示時は一番下までスクロール
    if (data.length <= limitSize) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
      });
      return;
    }

    // データ追加時は最新のコメントまでスクロール
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({
        block: "center", // 要素が画面中央に来るようにスクロール
      });
    }
  }, [data, limitSize]);

  // フックから返す値
  return {
    observerRef,
    loadMoreRef,
    fetchData,
    error,
    size,
    setSize,
    mutate,
    isValidating,
    data,
    isEmpty,
    isReachingEnd,
    containerRef,
    lastCommentRef,
    lastId,
  };
};
