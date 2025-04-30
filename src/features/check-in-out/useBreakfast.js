import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useBreakfast() {
  const queryClient = useQueryClient();
  const { mutate: addBreakfast, isLoading: isAddingBreakfast } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Breakfast was added in booking ${data.id} `);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
    onError: () => toast.error("Problem with addition breakfast"),
  });
  return { addBreakfast, isAddingBreakfast };
}
