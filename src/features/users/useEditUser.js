import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { editUser as editUserApi } from "../../services/apiUsers";

export function useEditUser() {
  const queryClient = useQueryClient();

  const { mutate: editUser, isPending: isEditing } = useMutation({
    mutationFn: ({ _id, name, email, phone, role, active }) =>
      editUserApi({ _id, name, email, phone, role, active }),
    onSuccess: () => {
      toast.success("User successfully edited");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editUser };
}
