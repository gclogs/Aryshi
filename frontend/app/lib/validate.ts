import { withZod } from '@remix-validated-form/with-zod'
import { z } from 'zod';

export const validator = withZod(
    z.object({
      email: z.string().min(1, {message: "이메일을 필수로 입력해주세요."}).email("올바르지 않은 값입니다."),
      password: z.string().min(1, {message: "비밀번호를 입력해주세요"}),
      serial: z.string().min(1, {message: "군번을 입력해주세요"}),
      username: z.string().min(1, {message: "이름을 입력해주세요"}),
      nickname: z.string().min(1, {message: "별명을 입력해주세요"}).max(16, {message: "별명은 16글자를 초과할 수 없습니다."})
    })
  )

export const validate = {
  register: withZod(
    z.object({
      email: z.string().min(1, {message: "이메일을 필수로 입력해주세요."}).email("올바르지 않은 값입니다."),
      password: z.string().min(1, {message: "비밀번호를 입력해주세요"}),
      serial: z.string().min(1, {message: "군번을 입력해주세요"}),
      username: z.string().min(1, {message: "이름을 입력해주세요"}),
      nickname: z.string().min(1, {message: "별명을 입력해주세요"}).max(16, {message: "별명은 16글자를 초과할 수 없습니다."})
    })
  ),
  login: withZod(
    z.object({
      email: z.string().min(1, {message: "이메일을 필수로 입력해주세요."}).email("올바르지 않은 값입니다."),
      password: z.string().min(1, {message: "비밀번호를 입력해주세요"}),
    })
  )
}

// export const validate = {
//   email: (text:string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text),
//   password: (text:string) => (typeof text !== "string" || text.length < 6)
// }