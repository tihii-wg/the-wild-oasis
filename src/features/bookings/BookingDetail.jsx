import { HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import { useCheckout } from "../check-in-out/useCheckout";
import BookingDataBox from "./BookingDataBox";
import { useBooking } from "./useBooking";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const { removeBooking } = useDeleteBooking();
  const { checkout } = useCheckout();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  const { id: bookingId, status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "checked-in" && (
          <Button
            onClick={() => {
              checkout(bookingId);
              navigate(-1);
            }}
          >
            Checkin out
          </Button>
        )}
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Chekin in
          </Button>
        )}

        <Modal>
          <Modal.Open open="delete">
            <Button icon={<HiTrash />}>Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => removeBooking(bookingId, navigate(-1))}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
