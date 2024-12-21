import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Input } from "./Input";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
  Twitter = 'twitter',
  Youtube = 'youtube',
}

export const CreateContentModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  const addContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(`${BACKEND_URL}/api/v1/brain/content`, {
      link,
      title,
      type
    }, {
      headers: {
        'Authorization': localStorage.getItem('token'),
      }
    })

    onClose();
  }

  return <div>
    {open && <>
      <div className="w-screen h-screen bg-slate-200 fixed top-0 left-0 opacity-60 flex justify-center"></div>
      <div className="fixed inset-2/4 flex justify-center">
        <div className="flex flex-col justify-center">
          <span className="bg-white opacity-100 p-4 rounded">
            <div className="flex justify-end">
              <div className="cursor-pointer" onClick={onClose}>
                <CrossIcon />
              </div>
            </div>
            <div>
              <Input ref={titleRef} placeholder={"Enter Title"} />
              <Input ref={linkRef} placeholder={"Enter Link"} />
            </div>
            <div className="flex justify-center py-2 gap-3">
              <Button variant={type === ContentType.Youtube ? "primary" : "secondary"}
                onClick={() => {
                  setType(ContentType.Youtube)
                }}
                text="Youtube" />
              <Button variant={type === ContentType.Twitter ? "primary" : "secondary"}
                onClick={() => {
                  setType(ContentType.Twitter)
                }}
                text="Twitter" />
            </div>
            <div className="flex justify-center py-2">
              <Button variant="primary" text="Submit" onClick={addContent} />
            </div>
          </span>
        </div>
      </div>
    </>}
  </div>
}
