import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Snowfall from "@/components/Snowfall";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuestionScreen from "@/components/QuestionScreen";
import CompletionScreen from "@/components/CompletionScreen";

type Screen = "welcome" | "question1" | "question2" | "question3" | "question4" | "question5" | "question6" | "question7" | "question8" | "question9" | "complete";

const RIDDLES = {
  question1: "Drift downward through the page like a snowfall. When you reach the place where it settles, the final section will reveal what you seek.",
  question2: "Head to the workshop, where winter games await. Complete the matching puzzle, only when every pair is found will the next secret reveal itself.",
  question3: "Begin where commands guide you through frosty paths. A hidden trail leads to a deeper challenge; finish the test, and the next message will emerge.",
  question4: "A thousand buttons rest in the archives. One shifts its color when you draw near.\n\nIf the blizzard feels endless, try some ice dust; the secret lies close by.",
  question5: "A wintery chatbot waits, the Wizard of address keeping. It won't give up its secret easily; only those who ask the right question will hear the hidden message.",
  question6: "The clock tower keeps time even in the deepest winter. A distant recording echoes through its halls; follow the link, listen closely, and let the sound reveal its message once it's turned in reverse. ALL CAPS answer.",
  question7: "The stable hides its secret from those traveling heavy paths. Visit on a smaller device,\n\nand a message in a different color will finally step into the light.",
  question8: "On the snowy path ahead lies a strange, frozen string. A nearby note reads, \"64 reindeer eat 64 carrots.\" Use this hint to thaw the symbols and transform them—and the hidden message will reveal itself.",
  question9: "Beyond the snowy Village page lies a trail to a distant chatbot source code; but first, you must follow the commits. In the repository's messages is a hidden clue.",
};

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");

  const handleStart = () => setCurrentScreen("question1");

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
              onCorrect={() => setCurrentScreen("question2")}
            />
          )}
          
          {currentScreen === "question2" && (
            <QuestionScreen
              key="q2"
              questionNumber={2}
              riddle={RIDDLES.question2}
              questionKey="question2"
              onCorrect={() => setCurrentScreen("question3")}
            />
          )}
          
          {currentScreen === "question3" && (
            <QuestionScreen
              key="q3"
              questionNumber={3}
              riddle={RIDDLES.question3}
              questionKey="question3"
              onCorrect={() => setCurrentScreen("question4")}
            />
          )}
          
          {currentScreen === "question4" && (
            <QuestionScreen
              key="q4"
              questionNumber={4}
              riddle={RIDDLES.question4}
              questionKey="question4"
              onCorrect={() => setCurrentScreen("question5")}
            />
          )}
          
          {currentScreen === "question5" && (
            <QuestionScreen
              key="q5"
              questionNumber={5}
              riddle={RIDDLES.question5}
              questionKey="question5"
              onCorrect={() => setCurrentScreen("question6")}
            />
          )}
          
          {currentScreen === "question6" && (
            <QuestionScreen
              key="q6"
              questionNumber={6}
              riddle={RIDDLES.question6}
              questionKey="question6"
              onCorrect={() => setCurrentScreen("question7")}
            />
          )}
          
          {currentScreen === "question7" && (
            <QuestionScreen
              key="q7"
              questionNumber={7}
              riddle={RIDDLES.question7}
              questionKey="question7"
              onCorrect={() => setCurrentScreen("question8")}
            />
          )}
          
          {currentScreen === "question8" && (
            <QuestionScreen
              key="q8"
              questionNumber={8}
              riddle={RIDDLES.question8}
              questionKey="question8"
              onCorrect={() => setCurrentScreen("question9")}
            />
          )}
          
          {currentScreen === "question9" && (
            <QuestionScreen
              key="q9"
              questionNumber={9}
              riddle={RIDDLES.question9}
              questionKey="question9"
              onCorrect={() => setCurrentScreen("complete")}
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
