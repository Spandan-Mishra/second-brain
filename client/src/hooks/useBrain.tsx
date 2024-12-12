
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export const useBrain = (shareLink: String) => {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState([]);

  const refreshContent = () => {
    axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`)
      .then((response) => {
        if (response.status === 200) {
          setUsername(response.data.username);
          setContent(response.data.content)
        }
      })
  }

  useEffect(() => {
    refreshContent();
    let interval = setInterval(() => {
      refreshContent();
    }, 10 * 1000)

    return () => {
      clearInterval(interval);
    }
  }, [])

  return { username, content, refreshContent }
}
