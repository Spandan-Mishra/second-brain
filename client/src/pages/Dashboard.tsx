import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { Spinner } from "../animations/Spinner"

interface ContentProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const { content, refreshContent, loading } = useContent();

  useEffect(() => {
    refreshContent();
  }, [modalOpen]);

  const getShareLink = async () => {
    const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
      share: true,
    }, {
      headers: {
        "Authorization": localStorage.getItem("token"),
      }
    })

    navigator.clipboard.writeText(response.data.hash);
    alert(`Shareable hash copied`)
  }

  return (
    <>
      {loading ? <div className="h-screen flex justify-center items-center"><Spinner /></div>
        : <div>
          <Sidebar setFilter={setFilter} />
          <div className="p-4 min-h-screen bg-gray-100 ml-72">
            <CreateContentModal open={modalOpen} onClose={() => { setModalOpen(false) }} />
            <div className="flex justify-end gap-4">
              <Button variant="primary" text="Add content" startIcon={PlusIcon()}
                onClick={() => {
                  setModalOpen(true)
                }} />
              <Button variant="secondary" text="Share" startIcon={ShareIcon()} onClick={getShareLink} />
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
      }
    </>
  )
}

