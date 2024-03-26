import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { UseFetchType } from "../types";

const useFetch = <T >(url: string): UseFetchType<T | null> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      // Simulate loading for 1 second to demonstrate loading state and skeleton
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useFetch;
