import Input from '../../lib/system/Input'
import InputGroup from '~/lib/styles/InputGroup'
import Button from '~/lib/system/Button'
import Title from '~/lib/styles/Title'
import QuestionLink from './QuestionLink'
import { ValidatedForm } from 'remix-validated-form'

const loginDescription = {
  emailPlaceholder: "이메일을 입력해주세요.",
  passwordPlaceholder: "비밀번호를 입력해주세요.",
  question: "계정이 이미 있으신가요?",
  actionText: "회원가입",
  buttonText: "로그인",
  actionLink: "/auth/register"
}


export default function LoginForm({validate}: any) {
  const {
    emailPlaceholder,
    passwordPlaceholder,
    question,
    actionText,
    buttonText,
    actionLink
  } = loginDescription

  return (
    <>
      <Title>LOGIN</Title>
      <ValidatedForm validator={validate} method="post">
        <InputGroup>
          <Input type='text' name='email' label='이메일' placeholder={emailPlaceholder} />
          <Input type='password' name='password' label='비밀번호' placeholder={passwordPlaceholder} />
        </InputGroup>
        <Button type='submit'>{buttonText}</Button>
      </ValidatedForm>
      <QuestionLink 
        to={actionLink} 
        question={question} 
        text={actionText}        
        />
    </>
  );
}