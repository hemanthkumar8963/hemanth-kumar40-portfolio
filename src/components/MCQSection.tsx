
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface MCQSectionProps {
  selectedTopic: string;
  selectedDifficulty: string;
}

const mcqData = {
  strings: {
    beginner: [
      {
        id: 1,
        question: "What is the time complexity of accessing a character in a string by index?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correct: 0,
        explanation: "Accessing a character by index in a string is a constant time operation O(1)."
      },
      {
        id: 2,
        question: "Which method is used to find the length of a string in most programming languages?",
        options: ["size()", "length()", "count()", "len()"],
        correct: 1,
        explanation: "The length() method is commonly used to find string length in many languages."
      }
    ]
  },
  sorting: {
    beginner: [
      {
        id: 3,
        question: "What is the time complexity of Bubble Sort in the worst case?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"],
        correct: 2,
        explanation: "Bubble Sort has O(n²) time complexity in the worst case when the array is reverse sorted."
      }
    ]
  }
};

export const MCQSection = ({ selectedTopic, selectedDifficulty }: MCQSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const getMCQs = () => {
    if (selectedTopic === 'all') {
      const allMCQs = [];
      Object.values(mcqData).forEach(topicMCQs => {
        Object.values(topicMCQs).forEach(difficultyMCQs => {
          allMCQs.push(...difficultyMCQs);
        });
      });
      return allMCQs;
    }

    const topicMCQs = mcqData[selectedTopic as keyof typeof mcqData];
    if (!topicMCQs) return [];

    if (selectedDifficulty === 'all') {
      const allDifficultyMCQs = [];
      Object.values(topicMCQs).forEach(mcqs => {
        allDifficultyMCQs.push(...mcqs);
      });
      return allDifficultyMCQs;
    }

    return topicMCQs[selectedDifficulty as keyof typeof topicMCQs] || [];
  };

  const questions = getMCQs();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizStarted && timeLeft > 0 && !quizCompleted) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setQuizCompleted(true);
    }
    return () => clearInterval(interval);
  }, [quizStarted, timeLeft, quizCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setShowResult(false);
    setSelectedAnswer(null);
    
    if (currentQuestion + 1 >= questions.length) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const showAnswer = () => {
    setShowResult(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(300);
    setQuizStarted(false);
    setQuizCompleted(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">No MCQs available</h3>
        <p className="text-slate-500">MCQs for this topic and difficulty will be added soon!</p>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border-0">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Ready to test your knowledge?</h2>
        <p className="text-slate-600 mb-6">
          This quiz contains {questions.length} questions and has a 5-minute time limit.
        </p>
        <Button 
          onClick={startQuiz}
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          Start Quiz
        </Button>
      </Card>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border-0">
        <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
          percentage >= 70 ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {percentage >= 70 ? 
            <CheckCircle className="h-12 w-12 text-green-500" /> : 
            <XCircle className="h-12 w-12 text-red-500" />
          }
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Quiz Completed!</h2>
        <p className="text-lg text-slate-600 mb-4">
          You scored {score} out of {questions.length} ({percentage}%)
        </p>
        <div className="mb-6">
          <Progress value={percentage} className="w-full max-w-md mx-auto" />
        </div>
        <Button 
          onClick={restartQuiz}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Retake Quiz
        </Button>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="space-y-6">
      {/* Timer and Progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-lg px-3 py-1">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          <Progress value={(currentQuestion / questions.length) * 100} className="w-48" />
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-slate-600" />
          <span className={`font-mono ${timeLeft < 60 ? 'text-red-500' : 'text-slate-600'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-0">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">{currentQ.question}</h3>
        
        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                selectedAnswer === index
                  ? showResult
                    ? index === currentQ.correct
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : 'bg-red-100 border-red-500 text-red-800'
                    : 'bg-blue-100 border-blue-500 text-blue-800'
                  : showResult && index === currentQ.correct
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
              disabled={showResult}
            >
              <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>

        {showResult && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
            <p className="text-blue-700">{currentQ.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          {!showResult ? (
            <Button 
              onClick={showAnswer}
              disabled={selectedAnswer === null}
              variant="outline"
            >
              Show Answer
            </Button>
          ) : (
            <div />
          )}
          
          {showResult && (
            <Button 
              onClick={handleNextQuestion}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {currentQuestion + 1 >= questions.length ? 'Finish Quiz' : 'Next Question'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
