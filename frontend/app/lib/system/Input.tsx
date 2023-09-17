
import { useField } from "remix-validated-form"

interface Props {
  type: string,
  name: string,
  label?: string,
  placeholder?: string,
  onChange?: any,
}

export default function Input({ type, label, name, onChange }: Props) {
  const { error, getInputProps } = useField(name);

  return (
    <div className="mb-3.5">
      {error ? (
        <>
          <label className="flex flex-direction text-red-600">{label}</label>
          <input {...getInputProps({id: name, type, onChange})} className="w-80 h-12 px-3 py-3 rounded-lg border-2 border-red-600 focus:border-red"/>
          <p className='text-center text-red-600'>{error}</p>
        </>
        ) : (
          <>
            <label className="flex flex-direction">{label}</label>
            <input {...getInputProps({id: name, type, onChange})} className="w-80 h-12 px-3 py-3 rounded-lg border-2 border-gray-200 focus:border-black"/>
          </>
        )}
    </div>
  )
}

