import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSettng } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting succesfully updated");
      queryClient.invalidateQueries({ queryKey: ["Settings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateSettng, isUpdating };
}
