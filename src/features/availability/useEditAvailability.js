import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { editAvailability as editAvailabilityApi } from "../../services/apiAvailability";

export function useEditAvailability() {
  const queryClient = useQueryClient();

  const { mutate: editAvailability, isPending: isEditing } = useMutation({
    mutationFn: ({
      _id,
      worker,
      workerGender,
      dayOfWeek,
      startWorking,
      endWorking,
      isOpen,
    }) =>
      editAvailabilityApi({
        _id,
        worker,
        workerGender,
        dayOfWeek,
        startWorking,
        endWorking,
        isOpen,
      }),
    onSuccess: () => {
      toast.success("Availability successfully edited");
      queryClient.invalidateQueries({ queryKey: ["availability"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editAvailability };
}
