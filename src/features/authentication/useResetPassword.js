import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../services/apiAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useResetPassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data.user);
      toast.success("Welcome back!");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { resetPassword, isPending };
}
