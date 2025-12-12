import { motion } from "framer-motion";
import QuizCard from "./QuizCard";
import { Sparkles } from "lucide-react";

const CompletionScreen = () => {
  return (
    <QuizCard>
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-block mb-6"
        >
          <Sparkles className="w-20 h-20 text-gold" />
        </motion.div>
        
        <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-4">
          Quest Complete!
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-lg font-body"
        >
          Congratulations! You've solved all the winter riddles and completed your magical journey through the snow.
        </motion.p>
      </div>
    </QuizCard>
  );
};

export default CompletionScreen;
