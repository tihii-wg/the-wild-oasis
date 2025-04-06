import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

export function useCabins() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";

  const { data, isLoading } = useQuery({
    queryKey: ["Cabins"],
    queryFn: getCabins,
  });

  let cabins;
  if (filterValue === "all") cabins = data;
  if (filterValue === "no-discount")
    cabins = data?.filter((d) => d.discount === 0);
  if (filterValue === "with-discount")
    cabins = data?.filter((d) => d.discount > 0);

  return { cabins, isLoading };
}
