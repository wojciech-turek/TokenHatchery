import { useQuery } from "@tanstack/react-query";
import { Deployments } from "types/tokens";

export const useGetContracts = (address: string) => {
  const getContracts = async () => {
    const response = await fetch("/api/getContracts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
      }),
    });
    const data = await response.json();
    return data as Deployments[];
  };

  return useQuery(["getContracts", address], getContracts);
};
