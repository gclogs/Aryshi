import Input from '../../lib/system/Input'
import Button from '~/lib/system/Button'
import InputGroup from '~/lib/styles/InputGroup'
import Title from '~/lib/styles/Title'
import QuestionLink from './QuestionLink'
import { ValidatedForm, validationError } from 'remix-validated-form'
import { validator } from '~/lib/validate'
import { DataFunctionArgs, json } from '@remix-run/node'
import { useActionData } from '@remix-run/react'

const registerDescription = {
  emailPlaceholder: "이메일을 입력해주세요.",
  passwordPlaceholder: "비밀번호를 입력해주세요.",
  serial: "군번을 입력해주세요.",
  username: "이름을 입력해주세요.",
  nickname: "별명을 입력해주세요.",
  question: "계정이 이미 있으신가요?",
  actionText: "로그인",
  buttonText: "회원가입",
  actionLink: "/auth/login"
}

const {
  emailPlaceholder,
  passwordPlaceholder,
  serial,
  username,
  nickname,
  question,
  buttonText,
  actionText,
  actionLink
} = registerDescription

export const action = async ({
  request,
}: DataFunctionArgs) => {
  const result = await validator.validate(
    await request.formData()
  )

  if (result.error) {
    return validationError(result.error);
  }

  const { email, password, serial, username, nickname } = result.data
  return json({
    title: `${email} ${password} ${serial} ${username} ${nickname}`
  })
}

export default function RegisterForm() {
  const data = useActionData();

  return (
    <div>
      <Title>JOIN</Title>
      <ValidatedForm validator={validator} method="post">
        <InputGroup>
          <Input type='text' name='email' label='이메일' placeholder={emailPlaceholder} />
          <Input type='password' name='password' label='비밀번호' placeholder={passwordPlaceholder} />
          <Input type='text' name='serial' label='군번' placeholder={serial} />
          <Input type='text' name='username' label='이름' placeholder={username} />
          <Input type='text' name='nickname' label='별명' placeholder={nickname} />
        </InputGroup>
        {data && (
          <span>{data}</span>
        )}
        <Button type='submit'>{buttonText}</Button>
      </ValidatedForm>
      <QuestionLink 
        to={actionLink} 
        question={question} 
        text={actionText}        
        />
    </div>
  );
}