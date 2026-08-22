import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createAvailability as createAvailabilityApi } from "../../services/apiAvailability";

export function useCreateAvailability() {
  const queryClient = useQueryClient();

  const { mutate: createAvailability, isPending: isCreating } = useMutation({
    mutationFn: ({
      worker,
      workerGender,
      dayOfWeek,
      startWorking,
      endWorking,
      isOpen,
    }) =>
      createAvailabilityApi({
        worker,
        workerGender,
        dayOfWeek,
        startWorking,
        endWorking,
        isOpen,
      }),
    onSuccess: () => {
      toast.success("New availability successfully created");
      queryClient.invalidateQueries({ queryKey: ["availability"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createAvailability };
}
