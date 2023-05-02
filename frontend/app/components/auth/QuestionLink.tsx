import { Link } from "@remix-run/react";

interface Props {
  to: string,
  question: string,
  text: string
}

export default function QuestionLink({to, question, text}: Props) {
  return(
    <div className="text-center text-base">
      {question} <Link to={to}><strong>{text}</strong></Link>
    </div>
  )
}