import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteMe as deleteMeApi } from "../../services/apiUsers";
import { useNavigate } from "react-router-dom";

export function useDeleteMe() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteMe, isPending: isDeleting } = useMutation({
    mutationFn: deleteMeApi,
    onSuccess: () => {
      queryClient.removeQueries();

      toast.success("User successfully deleted");

      navigate("/login", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteMe };
}
