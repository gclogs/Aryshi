import RegisterForm from "~/components/auth/RegisterForm";
import BaseLayout from "~/components/layouts/BaseLayout";
import { DataFunctionArgs, json } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { validator } from "~/lib/validate";
import { useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";

export const action = async ({request}: DataFunctionArgs) => {
  const result = await validator.register.validate(await request.formData());

  if (result.error) {
    return validationError(result.error);
  }

  try {
    const res = await fetch('http://localhost:4000/api/auth/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data)
    });

    return json(res.body);
  } catch (e) {
    throw json(e)
  }
}

export default function Register() {
  const actionData = useActionData();

  useEffect(() => {
    if (!actionData) return
  }, [actionData])

  return (
    <>
      <RegisterForm validate={validator.register}/>
    </>
  );
}