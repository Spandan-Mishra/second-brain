
import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useBrain } from "../hooks/useBrain"
import { useParams } from "react-router-dom"

interface ContentProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function BrainView() {
  const [filter, setFilter] = useState("");
  const { shareLink } = useParams();
  console.log(shareLink);
  // @ts-ignore
  const { username, content, refreshContent } = useBrain(shareLink);

  return (
    <>
      {content.length ?
        <div>
          <Sidebar setFilter={setFilter} />
          <div className="p-4 min-h-screen bg-gray-100 ml-72">
            <div className="flex justify-center items-center pt-4 pb-8">
              <h1 className="text-4xl underline underline-offset-4">Welcome to {username}'s second brain</h1>
            </div>
            <div className="flex flex-wrap gap-4">
              {filter
                ? content.filter((entry: ContentProps) => entry.type === filter).map(({ title, type, link }: ContentProps, index) =>
                  <Card
                    key={index}
                    title={title}
                    link={link}
                    type={type}
                  />
                )
                : content.map(({ title, link, type }: ContentProps, index) =>
                  <Card
                    key={index}
                    title={title}
                    link={link}
                    type={type}
                  />
                )
              }
            </div>
          </div>
        </div>
        : <div className="border-2 rounded-md border-rose-500 flex justify-center items-center p-4 text-4xl">
          <p className="text-rose-500">Sharing isn't permitted or user hasn't added any content yet!</p>
        </div>
      }
    </>
  )
}

