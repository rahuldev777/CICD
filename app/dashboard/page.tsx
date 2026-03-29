"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTodosApi, createTodoApi, toggleTodoCompleteApi, deleteTodoApi } from "../../apis/todos";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setUserName(localStorage.getItem("userName") || "User");
    fetchTodos(token);
  }, [router]);

  const fetchTodos = async (token: string) => {
    try {
      const data = await getTodosApi();
      setTodos(data);
    } catch (err) {
      console.error(err);
      localStorage.removeItem("token");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const data = await createTodoApi(newTodo);
      setTodos([data, ...todos]);
      setNewTodo("");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      await toggleTodoCompleteApi(id, !completed);
      setTodos(todos.map(t => t._id === id ? { ...t, completed: !completed } : t));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteTodoApi(id);
      setTodos(todos.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    router.push("/login");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {userName}!</h1>
            <p className="text-sm text-gray-500">Here are your tasks for today.</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex-1 flex flex-col max-h-[70vh]">
          <div className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
            <form onSubmit={handleAddTodo} className="flex gap-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 appearance-none rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
              />
              <button
                type="submit"
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
              >
                Add Task
              </button>
            </form>
          </div>

          <ul className="divide-y divide-gray-100 overflow-y-auto">
            {todos.length === 0 ? (
              <li className="p-8 text-center text-gray-500">
                No tasks yet. Add one above!
              </li>
            ) : (
              todos.map((todo) => (
                <li
                  key={todo._id}
                  className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => toggleComplete(todo._id, todo.completed)}
                      className={`h-6 w-6 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${todo.completed
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 hover:border-blue-500"
                        }`}
                    >
                      {todo.completed && (
                        <svg className="w-4 h-4 text-white hover:scale-110 active:scale-95 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <span
                      className={`text-lg transition-all ${todo.completed ? "text-gray-400 line-through" : "text-gray-700"
                        }`}
                    >
                      {todo.title}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all focus:opacity-100"
                    aria-label="Delete todo"
                  >
                    <svg className="w-5 h-5 hover:scale-110 active:scale-95" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
