import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";

const useCountContracts = () => {
  const { getCountractCount } = useApi();
  const contractsCountQuery = useQuery(["contractsCount"], getCountractCount, {
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return contractsCountQuery;
};

export default useCountContracts;
