interface Props {
  children: any
}

export default function InputGroup({children}: Props) {
  return (
    <div className="flex flex-col text-sm place-items-center">
      {children}
    </div>
  )
}

