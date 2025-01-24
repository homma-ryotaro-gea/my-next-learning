"use client";
import { useState } from "react";
import JotaiForm from "./JotaiForm";
import JotaiOriginal from "./JotaiOriginal";
import JotaiResult from "./JotaiResult";

const JotaiPage = () => {
  // Resultコンポーネント表示用 State
  const [showResult, setShowResult] = useState(false);
  return (
    <div className="container">
      <p className="message">
        <b>コンポーネント側</b> で Atom を編集する場合
      </p>
      <JotaiForm onSubmit={setShowResult} />
      <JotaiResult isShow={showResult} />
      <JotaiOriginal />
    </div>
  );
};

export default JotaiPage;
