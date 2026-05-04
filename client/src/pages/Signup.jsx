import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6)
});

export default function Signup() {
  const { signup } = useAuth();
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
      await signup(data);
      toast.success("Account created!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input {...register("name")} placeholder="Name" className="p-3 rounded bg-gray-100 dark:bg-slate-700" />
          <p className="text-red-400 text-sm">{errors.name?.message}</p>

          <input {...register("email")} placeholder="Email" className="p-3 rounded bg-gray-100 dark:bg-slate-700" />
          <p className="text-red-400 text-sm">{errors.email?.message}</p>

          <input type="password" {...register("password")} placeholder="Password" className="p-3 rounded bg-gray-100 dark:bg-slate-700" />
          <p className="text-red-400 text-sm">{errors.password?.message}</p>

          <button disabled={isSubmitting} className="bg-green-500 p-3 rounded text-white">
            {isSubmitting ? "Creating..." : "Signup"}
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account? <Link to="/" className="text-blue-400">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}