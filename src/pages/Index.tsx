import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Snowfall from "@/components/Snowfall";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuestionScreen from "@/components/QuestionScreen";
import CompletionScreen from "@/components/CompletionScreen";

type Screen = "welcome" | "question1" | "question2" | "complete";

const RIDDLES = {
  question1: "Drift downward through the page like a snowfall. When you reach the place where it settles, the final section will reveal what you seek.",
  question2: "Head to the workshop, where winter games await. Complete the matching puzzle, only when every pair is found will the next secret reveal itself.",
};

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");

  const handleStart = () => setCurrentScreen("question1");
  const handleQuestion1Complete = () => setCurrentScreen("question2");
  const handleQuestion2Complete = () => setCurrentScreen("complete");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <Snowfall />
      
      <div className="relative z-10 w-full flex items-center justify-center py-8">
        <AnimatePresence mode="wait">
          {currentScreen === "welcome" && (
            <WelcomeScreen key="welcome" onStart={handleStart} />
          )}
          
          {currentScreen === "question1" && (
            <QuestionScreen
              key="q1"
              questionNumber={1}
              riddle={RIDDLES.question1}
              questionKey="question1"
              onCorrect={handleQuestion1Complete}
            />
          )}
          
          {currentScreen === "question2" && (
            <QuestionScreen
              key="q2"
              questionNumber={2}
              riddle={RIDDLES.question2}
              questionKey="question2"
              onCorrect={handleQuestion2Complete}
            />
          )}
          
          {currentScreen === "complete" && (
            <CompletionScreen key="complete" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
