"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

const RHFUseFieldArrayPage = () => {
  const main_user = true;
  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    setError,
    formState,
  } = useForm<{
    user_id: string;
    main: { id: string; firstName: string; lastName: string }[];
    sub: { id: string; firstName: string; lastName: string }[];
  }>({
    defaultValues: {
      user_id: "1",
      main: main_user ? [{ id: "1", firstName: "山田", lastName: "太郎" }] : [],
      sub: [],
    },
  });
  const { fields: mainFields, remove: mainRemove } = useFieldArray({
    control,
    name: "main",
  });
  const {
    fields: subFields,
    append: subAppend,
    remove: subRemove,
  } = useFieldArray({
    control,
    name: "sub",
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button
          size={"lg"}
          onClick={() => {
            if (isEditing) {
              trigger().then((isValid) => {
                if (isValid) {
                  setIsEditing(false);
                }
              });
            } else {
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? "完了" : "編集"}
        </Button>
      </div>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="w-full"
      >
        <ul className="flex flex-col items-center">
          {mainFields.map((item, index) => (
            <li key={item.id} className="grid grid-cols-3 gap-2">
              <Input {...register(`main.${index}.firstName`)} />
              <Controller
                render={({ field }) => <Input {...field} />}
                name={`main.${index}.lastName`}
                control={control}
              />
              <div className="flex items-center">
                <Button
                  onClick={() => mainRemove(index)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  削除
                </Button>
              </div>
            </li>
          ))}
          {subFields.map((item, index) => (
            <li key={item.id} className="grid grid-cols-3 gap-2">
              <Input {...register(`sub.${index}.firstName`)} />
              <Controller
                render={({ field }) => <Input {...field} />}
                name={`sub.${index}.lastName`}
                control={control}
              />
              <div className="flex items-center">
                <Button
                  onClick={() => subRemove(index)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  削除
                </Button>
              </div>
            </li>
          ))}
        </ul>
        {subFields.length < 2 && (
          <Button
            onClick={() =>
              subAppend({
                id: String(subFields.length + 1),
                firstName: "",
                lastName: "",
              })
            }
            className="bg-red-500 hover:bg-red-600"
          >
            追加
          </Button>
        )}
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600"
          size={"lg"}
        >
          送信
        </Button>
      </form>
    </div>
  );
};

export default RHFUseFieldArrayPage;
