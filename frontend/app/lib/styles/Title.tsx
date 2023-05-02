
interface Props {
  children: string
}

export default function Title({children}: Props) {
  return(
    <h1 className="my-4 text-center text-base text-black">
      {children}
    </h1>
  )
}