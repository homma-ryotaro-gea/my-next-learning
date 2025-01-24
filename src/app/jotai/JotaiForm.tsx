"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dayjs from "dayjs";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { RESET, useResetAtom } from "jotai/utils";
import type React from "react";
import { useEffect } from "react";
import {
  birthdayAtom,
  birthdayFormatAtom,
  currentAgeAtom,
  firstNameAtom,
  lastNameAtom,
} from "./atom";

type Props = {
  onSubmit: React.Dispatch<React.SetStateAction<boolean>>;
};

const JotaiForm = ({ onSubmit }: Props) => {
  // useAtom で値と更新用関数を取得
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [lastName, setLastName] = useAtom(lastNameAtom);
  const birthday = useAtomValue(birthdayAtom);
  const [valueBirthday, onChangeBirthday] = useAtom(birthdayFormatAtom);
  const setCurrentAge = useSetAtom(currentAgeAtom);

  // 年齢を計算
  useEffect(() => {
    if (!birthday) return;
    setCurrentAge(dayjs().diff(birthday, "year"));
  }, [birthday, setCurrentAge]);

  // フォーム送信
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(true);
  };

  const resetAll = useResetAtom(
    atom(null, (_, set) => {
      set(firstNameAtom, RESET);
      set(lastNameAtom, RESET);
      set(birthdayAtom, RESET);
      set(currentAgeAtom, RESET);
    })
  );

  // フォームリセット
  const handleReset = () => {
    resetAll();
    onSubmit(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formControll">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <p>※ 英字（小文字）のみ入力</p>
      </div>
      <div className="formControll">
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <p>※ 英字（小文字）のみ入力</p>
      </div>
      <div className="formControll">
        <div>
          <Label htmlFor="birthday">Biirthday</Label>
          <input
            type="date"
            id="birthday"
            value={valueBirthday}
            onChange={(e) => onChangeBirthday(e.target.value)}
          />
        </div>
        <p>※日付を入力</p>
      </div>
      <div className="buttonGroup">
        <Button type="submit" disabled={!firstName || !lastName || !birthday}>
          送信
        </Button>
        <Button type="button" onClick={handleReset} variant={"outline"}>
          リセット
        </Button>
      </div>
    </form>
  );
};

export default JotaiForm;
