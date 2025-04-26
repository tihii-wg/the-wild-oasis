import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constances";

export function useBookings() {
  const [searcParams] = useSearchParams();

  const queryClient = useQueryClient();
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

  const page = !searcParams.get("page") ? 1 : Number(searcParams.get("page"));
  // const toc
  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //Prefetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  return { bookings, isLoading, count };
}
