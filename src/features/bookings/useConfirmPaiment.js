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
      toast.success(`Booking ${data.id} was succesfully paid`);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
    onError: () => toast.error("Error with paing booking "),
  });
  return { confirm, isConfirming };
}
