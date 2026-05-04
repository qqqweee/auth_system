import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className="p-3 rounded bg-gray-100 dark:bg-slate-700 w-full"
            />
            <p className="text-red-400 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="p-3 rounded bg-gray-100 dark:bg-slate-700 w-full"
            />
            <p className="text-red-400 text-sm">{errors.password?.message}</p>
          </div>

          <button
            disabled={isSubmitting}
            className="bg-blue-500 p-3 rounded text-white"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          No account? <Link to="/signup" className="text-blue-400">Signup</Link>
        </p>
      </motion.div>
    </div>
  );
}