import dayjs from "dayjs";
import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

export const firstNameAtom = atomWithReset<string>("");
export const lastNameAtom = atomWithReset<string>("");
export const birthdayAtom = atomWithReset<Date | null>(null);
export const currentAgeAtom = atomWithReset<number | null>(null);
/** Read Only Atom: 第2引数を省略すると Read Only となる */
// firstNameAtom + " " + lastNameAtom を連結し大文字にした値を返す
export const fullNameAtom = atom((get) =>
  `${get(firstNameAtom)} ${get(lastNameAtom)}`.toUpperCase()
);
// birthdayAtom を "YYYY年M月D日" でフォーマットした値を返す
export const birthdayJpAtom = atom((get) => {
  const birthday = get(birthdayAtom);
  return birthday ? dayjs(birthday).format("YYYY年M月D日") : "";
});
/** Write Only Atom: 第1引数を "null" にすると Write Only となる */
// birthdayAtom から現在の年齢を計算して "currentAgeAtom" に結果をセットする
export const setCurrentAgeAtom = atom(null, (get, set) => {
  const birthday = get(birthdayAtom);
  set(currentAgeAtom, birthday ? dayjs().diff(birthday, "year") : null);
});
/** Write Read Atom: 第1引数, 第2引数の両方と設定することもできる */
export const birthdayFormatAtom = atom(
  (get) => {
    const _birthday = get(birthdayAtom);
    return _birthday ? dayjs(_birthday).format("YYYY-MM-DD") : "";
  },
  (_, set, update: string) => {
    const _date = dayjs(update).toDate();
    set(birthdayAtom, !Number.isNaN(_date.getTime()) ? _date : null);
  }
);
