import Button from "../../ui/Button";
import { useCheckout } from "../check-in-out/useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingout } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckingout}
      onClick={() => {
        checkout(bookingId);
      }}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
