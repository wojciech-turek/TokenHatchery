import { useQuery } from "@tanstack/react-query";

const useCountContracts = () => {
  const contractsCountQuery = useQuery(
    ["contractsCount"],
    () => {
      return fetch("/api/getContractsCount").then((res) => res.json());
    },
    {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  return contractsCountQuery;
};

export default useCountContracts;
