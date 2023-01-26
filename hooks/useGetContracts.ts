import useApi from "hooks/useApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetContracts = (address: string) => {
  const queryClient = useQueryClient();
  const { getContractsByAddress } = useApi();
  return useQuery(
    ["contracts", address],
    () => getContractsByAddress(address),
    {
      staleTime: 1000 * 60 * 5,
      onSuccess: (data) => {
        data.forEach((contractType) => {
          contractType.deployments.forEach((contract) => {
            queryClient.setQueryData(["contract", contract._id], {
              ...contract,
              type: contractType.type,
            });
          });
        });
      },
    }
  );
};
