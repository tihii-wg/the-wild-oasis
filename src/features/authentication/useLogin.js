import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.log("ERROR", error);
      toast.error("Incorrect login and passwort");
    },
  });
  return { login, isLoading };
}
