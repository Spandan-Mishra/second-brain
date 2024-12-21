
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../icons/BrainIcon";

interface FormFields {
  username: string;
  password: string;
}

interface ErrorFormat {
  path: keyof FormFields;
  message: string;
}

export const Signup = () => {
  const [error, setError] = useState<Partial<FormFields>>({});
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const signup = async () => {
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      if (!username || !password) {
        setError({
          username: !username ? "Username is required" : undefined,
          password: !password ? "Password is required" : undefined,
        })
        return;
      }

      await axios.post(`${BACKEND_URL}/api/v1/brain/signup`, {
        username,
        password
      })

      setError({});
      navigate('/signin');
    } catch (err: any) {
      if (err.response && err.response.status == 400) {
        const errors: Partial<FormFields> = {};

        err.response.data.errors.forEach((e: ErrorFormat) => {
          errors[e.path] = e.message;
        })

        setError(errors);
      } else {
        console.log("Unknown Error: ", err);
      }
    }

  }

  return <div className="h-screen w-screen bg-gray-100 flex flex-col gap-10 justify-center items-center">
    <h1 className="flex gap-2 justify-center items-center text-6xl mb-12">
      <span className="text-purple-800"><BrainIcon size="lg" /></span> Second Brain
    </h1>
    <div className="bg-white rounded-xl border min-2-52 p-6 mb-20">

      {["username", "password"].map((field) => {
        return (
          <div key={field} className="flex flex-col justify-center items-center">
            <Input
              ref={field === "username" ? usernameRef : passwordRef}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
            {error[field as keyof FormFields] && <p className="text-sm text-red-500 italic">{error[field as keyof FormFields]}</p>}
          </div>
        )
      })}

      {/* <Input reference={usernameRef} placeholder="Username" /> */}
      {/* {error.username && <p className="text-xs text-red-500">{error.username}</p>} */}
      {/* <Input reference={passwordRef} placeholder="Password" /> */}
      {/* {error.password && <p>{error.password}</p>} */}
      <div className="flex justify-center pt-4">
        <Button variant="primary" text="Signup" fullWidth={true} onClick={signup} />
      </div>
    </div>
  </div>
}
