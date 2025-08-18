// src/lib/api.ts
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
      options.body = JSON.stringify(options.body);
      if (!headers.has('Content-Type')) {
          headers.append('Content-Type', 'application/json');
      }
  }


  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers,
  });

  return response;
};

export const fetchApi = async (url: string, options: RequestInit = {}) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const headers = new Headers(options.headers || {});

  if (options.body && typeof options.body === "object" && !(options.body instanceof FormData)) {
    options.body = JSON.stringify(options.body);
    if (!headers.has("Content-Type")) {
      headers.append("Content-Type", "application/json");
    }
  }

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers,
  });

  return response;
};
