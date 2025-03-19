import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["Cabins"],
    queryFn: getCabins,
  });
  return { cabins, isLoading };
}
