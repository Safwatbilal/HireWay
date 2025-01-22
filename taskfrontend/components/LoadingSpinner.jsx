import { motion } from "framer-motion";

const LoadingSpinner = ({isCheck=false}) => {
  return (
    <div className="flex items-center justify-center  ">
      <motion.div
        className={`${isCheck?'w-4 h-4 border-2':'w-6 h-6 border-4'}  border-[#F39C12] border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
