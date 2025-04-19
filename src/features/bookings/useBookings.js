import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searcParams] = useSearchParams();
  //filter
  const filterValue = searcParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // status,value

  const sort = searcParams.get("sortBy");
  const sortBy = !sort || "starDate-desc";
  console.log(sort);

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({ filter }),
  });

  return { bookings, isLoading };
}
