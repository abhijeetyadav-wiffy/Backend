export const apiRequest = async ({
  basePath,
  path = "",
  method = "GET",
  headers = {},
  body,
  auth = false,
  token = "",
}) => {
  const requestHeaders = { ...headers };

  if (auth && token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${basePath}${path}`, {
    method,
    headers: requestHeaders,
    body,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : {};

  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }

  return data;
};
