import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

export function useSingup() {
  const { mutate: singup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("User was succesfully created");
    },
  });
  return { singup, isLoading };
}
