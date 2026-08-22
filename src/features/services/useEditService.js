import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { editService } from "../../services/apiServices";

export function useEditService() {
  const queryClient = useQueryClient();

  const { mutate: updateService, isPending: isEditing } = useMutation({
    mutationFn: ({ formData, _id }) => editService({ formData, _id }),
    onSuccess: () => {
      toast.success("Service updated successfully");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateService, isEditing };
}
