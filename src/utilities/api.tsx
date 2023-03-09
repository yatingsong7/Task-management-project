type Method = "GET" | "POST" | "PUT" | "DELETE";

function requestInitMethod(method: Method, data: unknown = {}): RequestInit {
  if (method === "GET") {
    return {
      method: method,
      headers: {
        "Content-type": "application/json",
      },
    };
  }
  return {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
}

export async function api<T>(url: string, method: Method, data: unknown = {}): Promise<T> {
  const response = await fetch("http://localhost:3200" + url, requestInitMethod(method, data));
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return (await response.json()) as Promise<T>;
}
