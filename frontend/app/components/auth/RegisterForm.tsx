import styled from 'styled-components'
import color from '~/lib/color';

const registerDescription = {
  emailPlaceholder: "이메일을 입력해주세요.",
  passwordPlaceholder: "비밀번호를 입력해주세요.",
  serial: "군번을 입력해주세요.",
  username: "이름을 입력해주세요.",
  nickname: "별명을 입력해주세요.",
  question: "계정이 이미 있으신가요?",
  actionText: "로그인",
  buttonText: "회원가입"
}

export default function RegisterForm() {
  const {
    emailPlaceholder,
    passwordPlaceholder,
    serial,
    username,
    nickname
  } = registerDescription

  return (
    <div className="register">
      <input type="text" className="email" placeholder={emailPlaceholder} />
      <input type="password" className="pwd" placeholder={passwordPlaceholder} />
    </div>
  );
}