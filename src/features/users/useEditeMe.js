import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { editMe as editMeApi } from "../../services/apiUsers";

export function useEditMe() {
  const queryClient = useQueryClient();

  const { mutate: editMe, isPending: isEditing } = useMutation({
    mutationFn: editMeApi,
    onSuccess: () => {
      toast.success("User successfully edited");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editMe };
}
