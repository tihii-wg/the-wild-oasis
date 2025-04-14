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
  const modifire = direction === "asc" ? true : false;

  let cabins = filteredCabins;

  cabins?.sort(function (a, b) {
    let dir = modifire
      ? a[field].toLowerCase() < b[field].toLowerCase()
      : a[field].toLowerCase() > b[field].toLowerCase();
    if (dir) return -1;
  });

  return { cabins, isLoading };
}
