
type ButtonElement = string;

interface Props {
  type: "button" | "submit" | "reset" | undefined,
  children: ButtonElement,
}

export default function Button({type, children}: Props) {
  return (
    <button
      type={type}
      className={`w-80 h-14 mt-8 px-8 py-8 flex mx-auto justify-center rounded-md border-20 bg-violet-800 text-white text-center`}>
      {children}
    </button>
  )
}