import customFetch from "./axios";

export async function getAllServices(search) {
  try {
    const response = await customFetch.get(`/services?search=${search}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function editService({ formData, _id }) {
  try {
    const response = await customFetch.patch(`/services/${_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data?.data?.data || response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update service",
    );
  }
}

export async function createService(data) {
  try {
    const response = await customFetch.post("/services", data);
    return response.data?.data?.data || response.data;
  } catch (error) {
    console.log(error.response.data);
    throw new Error(
      error.response?.data?.message || "Failed to create service",
    );
  }
}

export async function deleteService({ _id }) {
  try {
    await customFetch.delete(`/services/${_id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}
