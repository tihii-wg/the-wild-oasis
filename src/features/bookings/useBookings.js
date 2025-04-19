import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searcParams] = useSearchParams();
  //filter
  const filterValue = searcParams.get("status");

  let filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // status,value

  //Sort

  const sortByRaw = searcParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");

  let sortBy = { field, direction, method: "order" };

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { bookings, isLoading };
}
