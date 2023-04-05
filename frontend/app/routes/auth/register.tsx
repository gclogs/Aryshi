import RegisterForm from "~/components/auth/RegisterForm";
import BaseLayout from "~/components/layouts/BaseLayout";

export default function Register() {
  return (
    <div>
      <BaseLayout>
        <RegisterForm />
      </BaseLayout>
    </div>
  );
}
