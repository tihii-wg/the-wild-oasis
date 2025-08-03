import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isChecking } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-in",
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data?.id} was succesfully checked in`);
      queryClient.invalidateQueries({ queryKey: "booking" });
      navigate("/");
    },
    onError: () => toast.error("Problem with checkin in  booking"),
  });
  return { checkin, isChecking };
}
