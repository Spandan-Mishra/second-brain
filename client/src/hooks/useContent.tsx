import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export const useContent = () => {
  const [content, setContent] = useState([]);

  const refreshContent = () => {
    axios.get(`${BACKEND_URL}/api/v1/brain/content`, {
      headers: {
        "Authorization": localStorage.getItem('token')
      }
    })
      .then((response) => {
        setContent(response.data.content)
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

  return { content, refreshContent }
}
