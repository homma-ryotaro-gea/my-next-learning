"use client";

import { useAtomValue } from "jotai";
import { birthdayJpAtom, currentAgeAtom, fullNameAtom } from "./atom";

type Props = {
  isShow: boolean;
};

/**
 * フォームの入力値を表示するコンポーネント
 * @param isShow
 * @returns
 */
const JotaiResult = ({ isShow }: Props) => {
  // useAtomValue で値だけ取得
  // 表示するためのコンポーネントなので、更新用関数は不要
  const fullName = useAtomValue(fullNameAtom);
  const birthdayJp = useAtomValue(birthdayJpAtom);
  const currentAge = useAtomValue(currentAgeAtom);

  return (
    <>
      {isShow && (
        <div className="content">
          <span>Result</span>
          <div className="contentInner result">
            <p>
              <b>{fullName}</b>さんは
              {<b>{birthdayJp}</b>}生まれです。
            </p>
            <p>
              現在の年齢は<b>{currentAge}</b>歳です。
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default JotaiResult;
