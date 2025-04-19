import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCreateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCabinValue, id }) => editCreateCabin(newCabinValue, id),
    onSuccess: () => {
      toast.success("Cabin just update!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message, {
        duration: 5000,
      });
    },
  });

  return { updateCabin, isUpdating };
}
