import customFetch from "./axios";

export async function login({ email, password }) {
  try {
    const response = await customFetch.post("/users/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function signup({
  name,
  email,
  gender,
  password,
  passwordConfirm,
}) {
  try {
    const response = await customFetch.post("/users/signup", {
      name,
      email,
      gender,
      password,
      passwordConfirm,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function logout() {
  try {
    const response = await customFetch.post("/users/logout");

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function forgotPassword({ email }) {
  try {
    const response = await customFetch.post("/users/forgotPassword", {
      email,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function resetPassword({ password, passwordConfirm, resetToken }) {
  try {
    const response = await customFetch.patch(
      `/users/resetPassword/${resetToken}`,
      {
        password,
        passwordConfirm,
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function getCurrentUser() {
  try {
    const response = await customFetch.get("/users/me");
    return response.data?.data?.data;
  } catch (error) {
    // If unauthenticated (401), return null so app knows user is logged out
    if (error.response?.status === 401) {
      return null;
    }
    // Re-throw network / server errors so React Query sets isError = true
    throw new Error(error.response?.data?.message || "Network error");
  }
}
