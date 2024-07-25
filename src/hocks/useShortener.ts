import { useState } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_TinyURL_API_Key;

interface UseShortenerReturn {
  shortenUrl: (url: string) => Promise<void>;
  shortUrl: string;
  isLoading: boolean;
  error: string | null;
}

export function useShortener(): UseShortenerReturn {
  const [shortUrl, setShortUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const shortenUrl = async (url: string): Promise<void> => {
    if (url === "") {
      setError("قم بإدخال رابط");
      return;
    }

    setIsLoading(true);
    setShortUrl("");
    setError(null);

    try {
      const response = await axios.post(
        "https://api.tinyurl.com/create",
        {
          url: url,
          domain: "tinyurl.com",
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      setShortUrl(response.data.data.tiny_url);
    } catch (error) {
      let errorMessage = "حدث خطأ أثناء تقصير الرابط";

      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        errorMessage = error.response.data.errors[0] || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      if (errorMessage === "Invalid URL.") errorMessage = "الرابط غير صالح";

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { shortenUrl, shortUrl, isLoading, error };
}