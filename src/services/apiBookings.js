import customFetch from "./axios";

export async function getAllBookings(
  status,
  search,
  page = 1,
  limit = 10,
  date,
) {
  try {
    const params = new URLSearchParams();

    if (status && status !== "") params.append("status", status);
    if (search) params.append("search", search);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (date) params.append("date", `${date}T00:00:00`);

    const queryString = params.toString();
    const api = queryString ? `/bookings?${queryString}` : "/bookings";

    const response = await customFetch.get(api);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch bookings",
    );
  }
}

export async function editBooking({ _id, status }) {
  try {
    const response = await customFetch.patch(`/bookings/${_id}`, {
      status,
    });

    return response.data?.data?.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function getBookingsStats() {
  try {
    const response = await customFetch.get("/bookings/bookings-stats");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch stats");
  }
}
