import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import { useCabins } from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const [searcParams] = useSearchParams();

  const { cabins } = useCabins();
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { stays, confirmedStays, isLoading: isLoading2 } = useRecentStays();

  const numDays = searcParams.get("last");
  const cabinCount = numDays * cabins?.length;

  if (isLoading1 || isLoading2) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabinCount}
      />
      <div>Todfay</div>
      <div>ldfjvdlkfj</div>
      <div>ldfjvdlkfj</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
