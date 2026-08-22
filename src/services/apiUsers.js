import customFetch from "./axios";

export async function getAllUsers(search, page, limit) {
  try {
    const response = await customFetch.get(
      `/users?search=${search}&page=${page}&limit=${limit}`,
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function createUser({
  name,
  email,
  phone,
  gender,
  role,
  password,
  passwordConfirm,
}) {
  try {
    const response = await customFetch.post("/users", {
      name,
      email,
      phone,
      gender,
      role,
      password,
      passwordConfirm,
    });

    return response.data?.data?.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function editUser({ _id, name, email, phone, role, active }) {
  try {
    const response = await customFetch.patch(`/users/${_id}`, {
      name,
      email,
      phone,
      role,
      active,
    });

    return response.data?.data?.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function deleteUser({ _id }) {
  try {
    await customFetch.delete(`/users/${_id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function editMe(formData) {
  try {
    const response = await customFetch.patch(`/users/updateMe`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data?.data?.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Could not update user details",
    );
  }
}

export async function deleteMe() {
  try {
    await customFetch.delete("/users/deleteMe");
  } catch (error) {
    console.log(error.response?.data);
    throw new Error(
      error.response?.data?.message || "Could not delete your account",
    );
  }
}
