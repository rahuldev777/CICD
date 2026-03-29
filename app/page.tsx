import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 px-4 text-white text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
        Todo App.
      </h1>
      <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mb-12 drop-shadow-sm">
        Manage your tasks simply and elegantly.
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
