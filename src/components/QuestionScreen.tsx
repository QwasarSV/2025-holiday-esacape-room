import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuizCard from "./QuizCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { checkAnswer } from "@/lib/hashAnswer";
import { CheckCircle, XCircle } from "lucide-react";

interface QuestionScreenProps {
  questionNumber: number;
  riddle: string;
  questionKey: "question1" | "question2";
  onCorrect: () => void;
}

const QuestionScreen = ({ questionNumber, riddle, questionKey, onCorrect }: QuestionScreenProps) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (checkAnswer(answer, questionKey)) {
      setFeedback("correct");
      setTimeout(() => {
        onCorrect();
      }, 1500);
    } else {
      setFeedback("incorrect");
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setFeedback(null);
      }, 1500);
    }
  };

  return (
    <QuizCard>
      <div className="text-center">
        <span className="inline-block px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-body mb-4">
          Riddle {questionNumber} of 2
        </span>
        
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-8 leading-relaxed">
          "{riddle}"
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="text-center text-lg font-body bg-muted border-border focus:border-primary h-14"
              autoComplete="off"
            />
          </motion.div>
          
          <Button
            type="submit"
            size="lg"
            className="w-full font-body text-lg py-6 glow-gold"
            disabled={!answer.trim() || feedback === "correct"}
          >
            Submit Answer
          </Button>
        </form>
        
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-6 flex items-center justify-center gap-2 ${
                feedback === "correct" ? "text-green-400" : "text-destructive"
              }`}
            >
              {feedback === "correct" ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-body">Correct! Well done!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5" />
                  <span className="font-body">Not quite right. Try again!</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </QuizCard>
  );
};

export default QuestionScreen;
