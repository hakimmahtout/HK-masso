import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteService as deleteServiceApi } from "../../services/apiServices";
import { toast } from "sonner";

export function useDeleteService() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteService } = useMutation({
    mutationFn: deleteServiceApi,
    onSuccess: () => {
      toast.success("Service successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteService };
}
