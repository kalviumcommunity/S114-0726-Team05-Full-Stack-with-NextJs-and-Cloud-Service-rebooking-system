import api from "./api";

export const askAssistant = (message) =>
  api("/ai", {
    method: "POST",
    body: JSON.stringify({
      message,
    }),
  });