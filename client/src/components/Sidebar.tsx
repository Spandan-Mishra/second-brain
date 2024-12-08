import { ReactElement } from "react"
import { BrainIcon } from "../icons/BrainIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { SidebarItem } from "./SidebarItem"

interface mediaElement {
  type: String,
  icon: ReactElement
}

const mediaData: mediaElement[] = [
  { type: "Youtube", icon: <YoutubeIcon /> },
  { type: "Twitter", icon: <TwitterIcon /> }
]

export const Sidebar = ({ setFilter }: any) => {
  return <div className="bg-white fixed top-0 left-0 h-screen w-72 p-4">
    <div className="flex items-center pb-8 text-2xl gap-2 cursor-pointer" onClick={() => { setFilter("") }}>
      <div className="text-purple-800" >
        <BrainIcon size="sm" />
      </div>
      Second Brain
    </div>
    <div className="flex flex-col">
      {mediaData.map((media, index) =>
        <span key={index} className="cursor-pointer" onClick={() => { setFilter(media.type.toLowerCase()) }}><SidebarItem text={media.type} icon={media.icon} /></span>
      )}
    </div>
  </div>
}
