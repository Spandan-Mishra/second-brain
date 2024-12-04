import { ReactElement } from "react"

interface ButtonProps {
  variant: "primary" | "secondary",
  text: string,
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
}

const variantClasses = {
  "primary": "bg-purple-600 text-white",
  "secondary": "bg-purple-200 text-purple-400"
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center"

export const Button = ({ variant, text, startIcon, onClick, fullWidth }: ButtonProps) => {
  return <button className={`${variantClasses[variant]} ${defaultStyles} ${fullWidth ? "w-full flex justify-center items-center" : null}`} onClick={onClick}>
    <div className="pr-2">
      {startIcon}
    </div>
    {text}
  </button>
}
