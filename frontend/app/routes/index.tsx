import { Link } from "@remix-run/react";
import Header from "~/components/base/Header";

interface ListProps {
  list: Array<LinkedAssetsVectors>;
}

interface LinkedAssetsVectors {
  vector: string;
  link: string;
  style?: string;
}

export default function Index() {
  const assets = [
    {vector: "home_disable", link: "/", style: "w-8"},
    {vector: "write_disable", link: "/", style: "w-7"},
    {vector: "bubble_disable", link: "/", style: "w-8"},
    {vector: "profile_disable", link: "/", style: "w-6"},
  ]
  
  return (
    <> 
      <Header />
      <footer>
        <Border>
          <List list={assets}/>
        </Border>
      </footer>
    </>
  );
}

const Border = ({children}) => {
  return (
    <div className="border-t-1 items-center">
      {children}
    </div>
  )
}

const List = ({list}: ListProps) => {
  return (
    <ul className="flex justify-center">
      {list.map((v) => (
        <li className="px-5 py-3">
          <Link to={v.link}>
            <img 
              className={`${v.style}`}
              src={`/assets/${v.vector}.svg`}
              />
          </Link>
        </li>
      ))}
    </ul>
  )
}