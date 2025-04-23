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

  let sortBy = { field, direction };
  //Pagination

  const page = !searcParams.get("page") ? 1 : searcParams.get("page");
  // const toc
  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { bookings, isLoading, count };
}
