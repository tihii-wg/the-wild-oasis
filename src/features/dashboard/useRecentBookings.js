import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentBookings() {
  const [searchParams, setSearchParams] = useSearchParams();

  const numDays = !searchParams.get("last") ? 7 : searchParams.get("last");

  const date = subDays(new Date(), numDays).toISOString();

  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(date),
    queryKey: ["booking", `last-${numDays}`],
  });

  return { bookings, isLoading };
}
