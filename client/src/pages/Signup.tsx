
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../icons/BrainIcon";

export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passowrdRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  const signup = async () => {
    const username = usernameRef.current?.value;
    const password = passowrdRef.current?.value;
    await axios.post(`${BACKEND_URL}/api/v1/brain/signup`, {
      username: username,
      password: password
    });

    navigate("/signin");
  }

  return <div className="h-screen w-screen bg-gray-100 flex flex-col gap-10 justify-center items-center">
    <h1 className="flex gap-2 justify-center items-center text-6xl mb-12">
      <span className="text-purple-800"><BrainIcon size="lg" /></span> Second Brain
    </h1>
    <div className="bg-white rounded-xl border min-2-52 p-6 mb-20">
      <Input reference={usernameRef} placeholder="Username" />
      <Input reference={passowrdRef} placeholder="Password" />

      <div className="flex justify-center pt-4">
        <Button variant="primary" text="Signup" fullWidth={true} onClick={signup} />
      </div>
    </div>
  </div>
}
