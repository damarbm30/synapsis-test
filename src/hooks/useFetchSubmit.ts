import { useState } from "react";

const useFetchSubmit = (endpoint: string, method: string) => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (body?: any) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
        method: method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer f662db3b5b3de486554dc35c00ed0c0fcb50178dcd4700e91997a00d18b55ca6`,
        },
        body: body,
      });
      setData(await response.json());
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const request = async (body?: any) => {
    await fetchData(body);
  };

  return { data, isLoading, error, request };
};

export default useFetchSubmit;
