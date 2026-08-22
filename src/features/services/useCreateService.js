import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createService } from "../../services/apiServices";
import { toast } from "sonner";

export function useCreateService() {
  const queryClient = useQueryClient();

  const { mutate: createNewService, isPending: isCreating } = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      toast.success("New service created successfully");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createNewService, isCreating };
}
