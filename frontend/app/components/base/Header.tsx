import { Link } from "@remix-run/react"

interface Props {
  title?: string
}

export default function Header({
  title,
}: Props) {
  return (
    <div className="w-full h-14 border-solid border-b-2 border-gray-200 relative">
      <LogoLink title={title} />
      <IconGroup>
        <Profile />
        <Search />
      </IconGroup>
    </div>
  )
}

const LogoLink = ({title}: Props) => {
  return(
    <Link to="/">
      <img 
        className="absolute left-3 top-5"
        src="" 
        alt="Aryshi" />
    </Link>
  )
}

const IconGroup = ({children}) => {
  return (
    <div className="absolute right-3 top-5">
      {children}
    </div>
  )
}

const Profile = () => {
  return(
    <span>프로필</span>
  )
}

const Search = () => {
  return(
    <span>검색</span>
  )
}