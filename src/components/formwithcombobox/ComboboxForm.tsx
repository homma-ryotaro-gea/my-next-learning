"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import FormInputCombobox from "./FormInputCombobox";

const FormSchema = z.object({
  main: z.string(),
});

const ComboboxForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      main: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormInputCombobox />
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </Form>
  );
};

export default ComboboxForm;
