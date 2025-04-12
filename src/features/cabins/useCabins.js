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
  // Filter cabins
  let filteredCabins;
  if (filterValue === "all") filteredCabins = data;
  if (filterValue === "no-discount")
    filteredCabins = data?.filter((d) => d.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = data?.filter((d) => d.discount > 0);

  // Sort cabinst

  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortBy.split("-");
  const modifire = direction === "asc" ? 1 : -1;

  const cabins = filteredCabins;
  cabins?.sort((a, b) => (a[field] - b[field]) * modifire);
  console.log(field, direction);
  return { cabins, isLoading };
}
