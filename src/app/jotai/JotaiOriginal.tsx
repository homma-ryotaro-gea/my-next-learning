import { useAtomValue } from "jotai";
import {
  birthdayAtom,
  currentAgeAtom,
  firstNameAtom,
  lastNameAtom,
} from "./atom";

const JotaiOriginal = () => {
  const firstName = useAtomValue(firstNameAtom);
  const lastName = useAtomValue(lastNameAtom);
  const birthday = useAtomValue(birthdayAtom);
  const currentAge = useAtomValue(currentAgeAtom);
  return (
    <div className="content original">
      <span>Original</span>
      <div className="contentInner">
        <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
        <p>Birthday: {birthday?.toString()}</p>
        <p>Current Age: {currentAge}</p>
      </div>
    </div>
  );
};

export default JotaiOriginal;
