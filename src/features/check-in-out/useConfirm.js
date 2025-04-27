import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useConfirm() {
  const queryClient = useQueryClient();
  const { mutate: confirm, isLoading: isConfirming } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        isPaid: true,
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} has been confirmed.`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("Error on confirming booking"),
  });

  return { confirm, isConfirming };
}
