import customFetch from "./axios";

export async function getAllAvailability(search, page, limit) {
  try {
    const response = await customFetch.get(
      `/availability?search=${search}&page=${page}&limit=${limit}`,
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function createAvailability({
  worker,
  workerGender,
  dayOfWeek,
  startWorking,
  endWorking,
  isOpen,
}) {
  try {
    const response = await customFetch.post("/availability", {
      worker,
      workerGender,
      dayOfWeek,
      startWorking,
      endWorking,
      isOpen,
    });

    return response.data?.data?.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function editAvailability({
  _id,
  worker,
  workerGender,
  dayOfWeek,
  startWorking,
  endWorking,
  isOpen,
}) {
  try {
    const response = await customFetch.patch(`/availability/${_id}`, {
      worker,
      workerGender,
      dayOfWeek,
      startWorking,
      endWorking,
      isOpen,
    });

    return response.data?.data?.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function deleteAvailability({ _id }) {
  try {
    await customFetch.delete(`/availability/${_id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}
