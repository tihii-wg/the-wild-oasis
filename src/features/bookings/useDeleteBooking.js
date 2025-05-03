import toast from "react-hot-toast";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: removeBooking, isLoading: isRemooingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success(`Booking was succesfully deleted`);
      queryClient.invalidateQueries({ queryKey: "bookings" });
    },
    onError: () => toast.error("Problem with delete booking"),
  });
  return { removeBooking, isRemooingBooking };
}
