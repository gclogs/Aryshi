import Input from '../../lib/system/Input'
import InputGroup from '~/lib/styles/InputGroup'
import Button from '~/lib/styles/Button'
import Title from '~/lib/styles/Title'
import QuestionLink from './QuestionLink'

const loginDescription = {
  emailPlaceholder: "이메일을 입력해주세요.",
  passwordPlaceholder: "비밀번호를 입력해주세요.",
  question: "계정이 이미 있으신가요?",
  actionText: "로그인",
  buttonText: "회원가입",
  actionLink: "/auth/login"
}


export default function LoginForm() {
  const {
    emailPlaceholder,
    passwordPlaceholder,
    question,
    actionText,
    buttonText,
    actionLink
  } = loginDescription

  return (
    <div>
      <Title>LOGIN</Title>
      <InputGroup>
        <Input type='text' name='이메일' placeholder={emailPlaceholder} />
        <Input type='password' name='비밀번호' placeholder={passwordPlaceholder} />
        <Input type='text' name='군번' placeholder={serial} />
        <Input type='text' name='이름' placeholder={username} />
        <Input type='text' name='별명' placeholder={nickname} />
      </InputGroup>
      <Button type='submit'>{buttonText}</Button>
      <QuestionLink 
        to={actionLink} 
        question={question} 
        text={actionText}        
        />
    </div>
  );
}