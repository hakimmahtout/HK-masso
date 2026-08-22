import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAvailability as deleteAvailabilityApi } from "../../services/apiAvailability";
import { toast } from "sonner";

export function useDeleteAvailability() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteAvailability } = useMutation({
    mutationFn: deleteAvailabilityApi,
    onSuccess: () => {
      toast.success("User successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["availability"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteAvailability };
}
