import { TwitterTweetEmbed } from "react-twitter-embed";
import { OpenNewIcon } from "../icons/OpenNewIcon";
import { ShareIcon } from "../icons/ShareIcon"
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

interface CardProps {
  type: "twitter" | "youtube";
  title: string;
  link: string;
}

export const Card = ({ type, title, link }: CardProps, index: number) => {
  return <div>
    <div className="p-4 bg-white rounded-md border-gray-200 border max-w-72 min-h-48 min-w-72 ">
      <div className="flex justify-between">
        <div className="flex items-center text-md">
          <div className="text-gray-500 pr-2">
            {type === "twitter" ? <TwitterIcon /> : <YoutubeIcon />}
          </div>
          <div>
            {title}
          </div>
        </div>
        <div className="flex items-center">
          <div onClick={() => {
            navigator.clipboard.writeText(link)
            alert(`post link copied`)
          }} className="text-gray-500 pr-2 cursor-pointer">
            <ShareIcon />
          </div>
          <div className="text-gray-500">
            <a href={link} target="_blank">
              <OpenNewIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="pt-4" key={index}>
        {type === "youtube" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
        </iframe>}

        {type === "twitter" && <TwitterTweetEmbed tweetId={link.split('/status/').pop() as string} />}
      </div>
    </div>
  </div>
}
