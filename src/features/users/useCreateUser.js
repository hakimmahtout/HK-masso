import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createUser as createUserApi } from "../../services/apiUsers";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: ({
      name,
      email,
      phone,
      gender,
      role,
      password,
      passwordConfirm,
    }) =>
      createUserApi({
        name,
        email,
        phone,
        gender,
        role,
        password,
        passwordConfirm,
      }),
    onSuccess: () => {
      toast.success("New user successfully created");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createUser };
}
