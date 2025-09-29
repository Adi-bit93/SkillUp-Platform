const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function apiRequest(
  endpoint,
  method = "GET",
  body = null,
  token = null
) {
  // ✅ Always pull token from localStorage as fallback
  const authToken = token || localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  };

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, config);

    // ✅ Always check if response is JSON before parsing
    let data;
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text(); // fallback for non-JSON responses
    }

    if (!res.ok) {
      let errorMessage;

      if (typeof data === "object" && data.message) {
        errorMessage = data.message;
      } else if (typeof data === "string") {
        if (data.includes("MongoServerError: E11000 duplicate key error")) {
          if (data.includes("username_1 dup key")) {
            errorMessage =
              "Username already exists. Please choose a different username.";
          } else if (data.includes("email_1 dup key")) {
            errorMessage =
              "Email already exists. Please use a different email address.";
          } else {
            errorMessage =
              "This account already exists. Please try different details.";
          }
        } else if (data.includes("<html>") || data.includes("<!DOCTYPE")) {
          errorMessage = "Server error occurred. Please try again later.";
        } else {
          errorMessage = data;
        }
      } else {
        errorMessage = `HTTP ${res.status}: ${res.statusText}`;
      }

      throw new Error(errorMessage);
    }

    return data;
  } catch (err) {
    throw err;
  }
}
