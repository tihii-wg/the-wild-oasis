import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCreateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: editCreateCabin,
    onSuccess: () => {
      toast.success("Cabin just added!");
      queryClient.invalidateQueries({
        queryKey: ["Cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message, {
        duration: 5000,
      });
    },
  });
  return { createCabin, isCreating };
}
