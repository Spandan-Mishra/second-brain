import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"

interface ContentProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { content, refreshContent } = useContent();

  useEffect(() => {
    refreshContent();
  }, [modalOpen]);

  useEffect(() => {
    window.twttr?.widgets?.load();
  }, [content]);


  return (
    <div>
      <Sidebar />
      <div className="p-4 min-h-screen bg-gray-100 ml-72">
        <CreateContentModal open={modalOpen} onClose={() => { setModalOpen(false) }} />
        <div className="flex justify-end gap-4">
          <Button variant="primary" text="Add content" startIcon={PlusIcon()}
            onClick={() => {
              setModalOpen(true)
            }} />
          <Button variant="secondary" text="Share" startIcon={ShareIcon()} />
        </div>
        <div className="flex flex-wrap gap-4">
          {content.map(({ title, type, link }: ContentProps) =>
            <Card
              title={title}
              type={type}
              link={link}
            />
          )}
        </div>
      </div>
    </div>
  )
}

