import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
  };

  return (
    <div className="flex justify-between items-center p-4 shadow bg-white dark:bg-slate-800 text-black dark:text-white">
      <h1 className="font-bold text-lg">AuthApp</h1>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-slate-700"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        {user && (
          <>
            <span>{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded text-white"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}