import { ReactNode } from "react";
import { motion } from "framer-motion";

interface QuizCardProps {
  children: ReactNode;
  className?: string;
}

const QuizCard = ({ children, className = "" }: QuizCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`glass rounded-2xl p-8 md:p-12 max-w-2xl w-full mx-4 glow-ice ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default QuizCard;
