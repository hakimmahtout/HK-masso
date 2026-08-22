import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { editBooking as editBookingApi } from "../../services/apiBookings";

export function useEditBooking() {
  const queryClient = useQueryClient();

  const { mutate: editBooking, isPending: isEditing } = useMutation({
    mutationFn: ({ _id, status }) => editBookingApi({ _id, status }),
    onSuccess: () => {
      toast.success("Booking successfully edited");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editBooking };
}
