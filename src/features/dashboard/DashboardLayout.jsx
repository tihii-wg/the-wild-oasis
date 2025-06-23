import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import { useCabins } from "../cabins/useCabins";
import { Line, LineChart } from "recharts";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { cabins, isLoading: isLoading3 } = useCabins();
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { numDays, confirmedStays, isLoading: isLoading2 } = useRecentStays();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  const cabinCount = numDays * cabins.length;

  const numBookings = bookings.length;

  const checkins = confirmedStays.length;

  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const ocupation =
    (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / cabinCount) *
    100;

  return (
    <StyledDashboardLayout>
      <Stats
        sales={sales}
        ocupation={ocupation}
        numBookings={numBookings}
        checkins={checkins}
      />
      <div>ldfjvdlkfj</div>
      <div>ldfjvdlkfj</div>
      <SalesChart numDays={numDays} bookings={bookings} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
