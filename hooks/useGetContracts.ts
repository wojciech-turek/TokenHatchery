import useApi from "hooks/useApi";
import { useQuery } from "@tanstack/react-query";

export const useGetContracts = (address: string) => {
  const { getContractsByAddress } = useApi();
  return useQuery(
    ["contracts", address],
    () => getContractsByAddress(address),
    {
      staleTime: 1000 * 60 * 5,
    }
  );
};
