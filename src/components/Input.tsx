import { InputHTMLAttributes } from "react"

interface PropsInput extends InputHTMLAttributes<HTMLInputElement> {
  value: string | number,
}

const Input: React.FC<PropsInput> = ({
  value,
  ...rest
}) => {
  return (
    <input type="text" value={value} {...rest} />
  )
}

export default Input