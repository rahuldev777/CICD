const API_URL = process.env.NEXT_PUBLIC_API_URL

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getTodosApi = async () => {
  const res = await fetch(`${API_URL}/todos`, {
    headers: getHeaders(),
  });
  if (!res.ok) {
     if (res.status === 401) throw new Error("Unauthorized");
     throw new Error("Failed to fetch todos");
  }
  return res.json();
};

export const createTodoApi = async (title: string) => {
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
};

export const toggleTodoCompleteApi = async (id: string, completed: boolean) => {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ completed }),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
};

export const deleteTodoApi = async (id: string) => {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete todo");
  return res.json();
};
