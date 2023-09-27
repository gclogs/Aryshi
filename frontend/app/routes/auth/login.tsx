import { DataFunctionArgs, json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import LoginForm from "~/components/auth/LoginForm";
import { validator } from "~/lib/validate";
import { useEffect } from "react";

export const action = async ({request}: DataFunctionArgs) => {
  const result = await validator.login.validate(await request.formData());

  if (result.error) {
    return validationError(result.error);
  }

  try {
    const res = await fetch('http://localhost:4000/api/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data)
    })
    
    return json(res.body);
    
  } catch(e) {
    throw json(e);
  }
}

export default function Login() {
  const actionData = useActionData();
  
  useEffect(() => {
    if (!actionData) return
  }, [actionData]);

  return (
    <>
      <LoginForm validate={validator.login}/>
    </>
  );
}