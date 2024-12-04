
export const SidebarItem = ({ text, icon }) => {
  return <div className="flex items-center text-gray-700 hover:bg-slate-100">
    <div className="p-3">
      {icon}
    </div>
    <div className="font-medium">
      {text}
    </div>
  </div>
}
