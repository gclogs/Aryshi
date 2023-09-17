import { Link } from "@remix-run/react"
import { PropsWithChildren } from "react"

interface Props {
  title?: React.ReactNode
}

export default function Header({
  title
}: Props) {
  return (
    <HeaderBlcok>
      <LogoLink />
      <IconGroup>
        <Search />
      </IconGroup>
    </HeaderBlcok>
  )
}

const HeaderBlcok = ({children}: PropsWithChildren) => {
  return(
    <>
      <div className="w-full h-14 border-solid border-b-2 border-gray-200 relative">
        {children}
      </div>
    </>
  )
}

const LogoLink = () => {
  return(
    <Link to="/">
      <img 
        className="absolute left-3 top-5"
        src="../../assets/title_logo.svg" />
    </Link>
  )
}

const IconGroup = ({children}) => {
  return (
    <div className="absolute right-3 top-4">
      {children}
    </div>
  )
}

const Search = () => {
  return(
    <a href="#">
      <img
        className="w-10 px-2"
        src="../../assets/search.svg" 
        alt="search" />
    </a>
  )
}