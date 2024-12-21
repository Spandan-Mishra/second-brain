import { forwardRef } from "react"

interface InputProps {
  placeholder: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ placeholder }, ref) => {
  return <div>
    <input placeholder={placeholder} type={placeholder === "Password" ? "password" : "text"} className="px-4 py-2 border rounded m-2" ref={ref} />
  </div>
});
