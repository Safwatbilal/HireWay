import Link from "next/link";
import { motion } from "framer-motion";

const ApplyJobItem = ({ name, Id, status }) => {
  const borderColor = status === "Panding" ? "border-black" : status === "Accepted" ? "border-green-500" : "border-red-500";

  return (
    <motion.div
      className={`bg-bgSecond px-4 py-2 rounded-lg shadow-lg w-full max-w-md border-2 ${borderColor}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between">
        <strong className="text-second">Name:</strong>
        <p className="text-gray-300 text-base px-4 py-2">{name}</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href={`/details/${Id}`} className="buttonHeader text-white">
            More Details
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ApplyJobItem;
