import { motion } from "framer-motion";
import QuizCard from "./QuizCard";
import { Button } from "./ui/button";
import { Snowflake } from "lucide-react";
interface WelcomeScreenProps {
  onStart: () => void;
}
const WelcomeScreen = ({
  onStart
}: WelcomeScreenProps) => {
  return <QuizCard>
      <div className="text-center">
        <motion.div initial={{
        rotate: 0
      }} animate={{
        rotate: 360
      }} transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }} className="inline-block mb-6">
          <Snowflake className="w-16 h-16 text-ice" />
        </motion.div>
        
        <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-4">Qwasar Holiday Escape Game</h1>
        
        <p className="text-muted-foreground text-lg mb-6 font-body">
          Embark on a magical journey through the winter wonderland. 
          Solve the riddles to uncover hidden secrets.
        </p>
        
        <p className="text-sm text-muted-foreground mb-8 font-body">
          Begin your adventure at{" "}
          <a href="https://santa-s-winter-web-quest.lovable.app" target="_blank" rel="noopener noreferrer" className="text-ice hover:text-gold transition-colors underline underline-offset-4">
            Santa's Winter Web Quest
          </a>
        </p>
        
        <Button onClick={onStart} size="lg" className="font-body text-lg px-8 py-6 glow-gold">
          Begin Your Quest
        </Button>
      </div>
    </QuizCard>;
};
export default WelcomeScreen;
