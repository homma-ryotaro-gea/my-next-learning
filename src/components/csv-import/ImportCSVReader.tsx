"use client";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";
import { useCSVReader } from "react-papaparse";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

/**
 * 顧問先招待フォームタイプ
 */
export type ClientInviteFormType = {
  id: number;
  authority: string;
  first_name: string;
  last_name: string;
  email: string;
  errors: {
    email: string[];
  };
};

type PropsType = {
  downloadUrl: string;
  downloadFileName: string;
};

export const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const ImportCSVReader = (props: PropsType) => {
  const { downloadFileName, downloadUrl } = props;
  const { CSVReader } = useCSVReader();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [items, setItems] = useState<ClientInviteFormType[]>([
    {
      id: 1,
      authority: "",
      first_name: "",
      last_name: "",
      email: "",
      errors: {
        email: [],
      },
    },
  ]);
  /**
   * ファイルインポート後処理
   * @param uploadData インポートしたデータ
   */
  const uploadAccepted = async (uploadData: [][]) => {
    console.log("uploadData", uploadData);
    // CSVヘッダーフォーマット確認
    const header: string[] = uploadData[0];
    if (
      header[0] !== "権限" ||
      header[1] !== "氏名（性）" ||
      header[2] !== "氏名（名）" ||
      header[3] !== "登録メールアドレス"
    ) {
      setIsError(true);
      return;
    }

    setIsLoading(true);
    const authorityList = ["管理者", "担当者"];
    let lastId = items.pop()?.id ?? 0;
    const errorList: string[] = [];
    const newData = uploadData
      .filter((item: string[], index) => index !== 0 && item[0] !== "")
      .map((item: string[], index) => {
        if (item.length < 4) {
          errorList.push(`※データ行${index + 1}行目のデータが不足しています`);
        }
        if (!authorityList.includes(item[0])) {
          errorList.push(`※データ行${index + 1}行目の権限が不正です`);
        }
        const emailCheck = item[3] ? item[3].trim().match(EMAIL_REGEX) : false;
        lastId++;
        return {
          id: lastId,
          authority: item[0],
          first_name: item[1],
          last_name: item[2],
          email: item[3],
          errors: {
            email: emailCheck ? [] : ["※メールアドレスの形式が異なっています"],
          },
        };
      });
    setIsScrollBottom(true);

    // itemsの中の情報が全て空のデータは削除
    const newItems = items.filter(
      (item) =>
        item.authority !== "" ||
        item.first_name !== "" ||
        item.last_name !== "" ||
        item.email !== ""
    );

    if (errorList.length > 0) {
      setErrors(errorList);
      setIsError(true);
      return;
    }

    setItems([...newItems, ...newData]);
    setIsLoading(false);
  };

  return (
    <div className="md:mb-5">
      <CSVReader
        onUploadAccepted={(results: { data: []; error: []; meta: [] }) => {
          const dataFormats = results.data.filter(
            (item: [], index) => index !== 0 && item.length >= 4
          );
          if (dataFormats.length > 0) {
            uploadAccepted(results.data);
          } else {
            setIsError(true);
          }
          if (results.error) {
            setIsError(true);
          }
        }}
      >
        {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
        {({ getRootProps, acceptedFile }: any) => (
          <>
            <div>
              <div
                className="w-full py-4 md:py-8 px-2 bg-[#F7F8FB] rounded-sm"
                {...getRootProps()}
              >
                <p className="text-center text-sm">
                  指定フォーマットのCSVファイルをドラッグ＆ドロップまたは
                </p>
                <div className="flex justify-center mt-2 md:mt-5 ">
                  <Button
                    className="bg-white text-geatext border border-geagray"
                    size="sm"
                    type="button"
                  >
                    ファイルを選択
                  </Button>
                </div>
                {isError && (
                  <div>
                    <div className="text-center text-sm text-primary mt-5 whitespace-pre-wrap">
                      ※正常にデータ処理ができませんでした。
                      <br />
                      再度、データ内容・形式をご確認の上、アップロードを行ってください
                    </div>
                    {errors.map((error) => (
                      <div
                        key={error}
                        className="text-center text-sm text-primary mt-5 whitespace-pre-wrap"
                      >
                        {error}
                      </div>
                    ))}
                  </div>
                )}
                {acceptedFile && !isError && (
                  <div className="flex justify-center mt-5 text-geagray">
                    <span>{acceptedFile.name}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </CSVReader>
      <div className="flex items-center gap-3 text-sm text-geagray mt-2 justify-end">
        <DownloadIcon />
        <a href={downloadUrl} download={downloadFileName}>
          CSVフォーマットダウンロード
        </a>
      </div>
      <div className="overflow-auto max-h-[320px]">
        {items.length > 1 && (
          <table className="w-full mt-5">
            <thead>
              <tr className="bg-geagray text-white">
                <th className="p-2">会社名</th>
                <th className="p-2">姓</th>
                <th className="p-2">名</th>
                <th className="p-2">メールアドレス</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <tr key={item.id} className="border-b border-geagray">
                    <td className="p-2">
                      <Select
                        defaultValue={item.authority}
                        value={item.authority}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">管理者</SelectItem>
                          <SelectItem value="3">担当者</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    {/* <td className="p-2">{item.authority}</td> */}
                    <td className="p-2">{item.first_name}</td>
                    <td className="p-2">{item.last_name}</td>
                    <td className="p-2">{item.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ImportCSVReader;
