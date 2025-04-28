import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Checkbox from ".././../ui/Checkbox";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useEffect, useState } from "react";
import { useConfirm } from "./useConfirm";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, isLoading } = useBooking();
  const { confirm, isConfirming } = useConfirm();
  const { checkin, isChecking } = useCheckin();

  const moveBack = useMoveBack();

  useEffect(
    function () {
      setConfirmPaid(booking?.isPaid);
    },
    [booking],
  );

  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;

  function handleCheckin() {
    checkin(bookingId);
  }

  function handleOnConfirm() {
    confirm(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          onChange={handleOnConfirm}
          disabled={confirmPaid}
        >
          I confirm that {guests.fullName} has paid the total amount of
          <span>{formatCurrency(totalPrice)}</span>
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isChecking || isConfirming}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
