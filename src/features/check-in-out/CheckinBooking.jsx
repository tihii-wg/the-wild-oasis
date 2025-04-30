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
import { useBreakfast } from "./useBreakfast";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useBooking();
  const { confirm, isConfirming } = useConfirm();
  const { checkin, isChecking } = useCheckin();
  const { addBreakfast, isAddingBreakfast } = useBreakfast();
  const moveBack = useMoveBack();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [isAddBreakfast, setIsAddBreacfast] = useState(false);

  useEffect(
    function () {
      setConfirmPaid(booking?.isPaid);
      setIsAddBreacfast(booking?.hasBreakfast);
    },
    [booking],
  );

  if (isLoading || isLoadingSettings || isAddingBreakfast || isConfirming)
    return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    extrasPrice,
    numNights,
    isPaid,
  } = booking;

  const aditionalBreakfastPrice =
    settings.breakfestPrice * numNights * numGuests;

  function handleCheckin() {
    checkin(bookingId);
  }

  function handleOnConfirm() {
    confirm(bookingId);
  }

  function handleAddBreakfast() {
    if (!hasBreakfast) {
      addBreakfast({
        bookingId,
        breakfast: {
          extrasPrice: aditionalBreakfastPrice,
          hasBreakfast: true,
          isPaid: false,
        },
      });
    } else {
      addBreakfast({
        bookingId,
        breakfast: {
          extrasPrice: 0,
          hasBreakfast: false,
        },
      });
    }
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
          id="breakfast"
          checked={isAddBreakfast}
          onChange={handleAddBreakfast}
          // disabled={hasBreakfast}
        >
          Want to add breakfast for {formatCurrency(aditionalBreakfastPrice)}?
        </Checkbox>
      </Box>
      <Box>
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          onChange={handleOnConfirm}
          disabled={confirmPaid}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {hasBreakfast
            ? `${formatCurrency(totalPrice + extrasPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(aditionalBreakfastPrice)})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={
            !confirmPaid || isChecking || isConfirming || isAddingBreakfast
          }
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
