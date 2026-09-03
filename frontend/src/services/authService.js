import api from "./api";

export const loginUser = (data) =>
  api("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const registerUser = (data) =>
  api("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getCurrentUser = () => api("/auth/me");

export const updateProfile = (data) =>
  api("/users/profile", {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const loginWithGoogleUser = (credential) =>
  api("/auth/google", {
    method: "POST",
    body: JSON.stringify({ credential }),
  });