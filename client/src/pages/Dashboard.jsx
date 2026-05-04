import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[90vh]">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow text-center"
        >
          <h1 className="text-2xl font-bold">Welcome {user?.name}</h1>
          <p className="text-gray-500">{user?.email}</p>
        </motion.div>
      </div>
    </>
  );
}