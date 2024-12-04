import { BrainIcon } from "../icons/BrainIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { SidebarItem } from "./SidebarItem"

export const Sidebar = () => {
  return <div className="bg-white fixed top-0 left-0 h-screen w-72 p-4">
    <div className="flex items-center pb-8 text-2xl gap-2">
      <div className="text-purple-800">
        <BrainIcon size="sm" />
      </div>
      Second Brain
    </div>
    <div className="flex flex-col">
      <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
      <SidebarItem text="Twitter" icon={<TwitterIcon />} />
    </div>
  </div>
}
