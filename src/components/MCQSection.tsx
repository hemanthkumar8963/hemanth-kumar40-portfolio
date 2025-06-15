
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MCQSectionProps {
  selectedTopic: string;
  selectedDifficulty: string;
}

interface MCQ {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation: string;
  topic: string;
  difficulty: string;
}

export const MCQSection = ({ selectedTopic, selectedDifficulty }: MCQSectionProps) => {
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchMCQs();
  }, [selectedTopic, selectedDifficulty]);

  const fetchMCQs = async () => {
    try {
      setLoading(true);
      let query = supabase.from('mcqs').select('*');

      if (selectedTopic !== 'all') {
        query = query.eq('topic', selectedTopic);
      }

      if (selectedDifficulty !== 'all') {
        query = query.eq('difficulty', selectedDifficulty);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setMcqs(data || []);
    } catch (error) {
      console.error('Error fetching MCQs:', error);
      toast({
        title: "Error",
        description: "Failed to load MCQs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (mcqId: string, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [mcqId]: answer }));
  };

  const handleSubmitAnswer = (mcqId: string) => {
    setShowResults(prev => ({ ...prev, [mcqId]: true }));
  };

  const resetMCQ = (mcqId: string) => {
    setSelectedAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[mcqId];
      return newAnswers;
    });
    setShowResults(prev => {
      const newResults = { ...prev };
      delete newResults[mcqId];
      return newResults;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="grid gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm border-0">
            <div className="space-y-4">
              <div className="h-6 bg-slate-200 rounded animate-pulse" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-10 bg-slate-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {mcqs.map((mcq) => {
        const selectedAnswer = selectedAnswers[mcq.id];
        const showResult = showResults[mcq.id];
        const isCorrect = selectedAnswer === mcq.correct_answer;

        return (
          <Card key={mcq.id} className="p-6 bg-white/80 backdrop-blur-sm border-0 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-slate-800 flex-1">{mcq.question}</h3>
                <Badge className={getDifficultyColor(mcq.difficulty)}>
                  {mcq.difficulty.charAt(0).toUpperCase() + mcq.difficulty.slice(1)}
                </Badge>
              </div>

              <div className="space-y-2">
                {[
                  { key: 'A', value: mcq.option_a },
                  { key: 'B', value: mcq.option_b },
                  { key: 'C', value: mcq.option_c },
                  { key: 'D', value: mcq.option_d }
                ].map((option) => {
                  let buttonClass = "w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ";
                  
                  if (showResult) {
                    if (option.key === mcq.correct_answer) {
                      buttonClass += "border-green-500 bg-green-50 text-green-800";
                    } else if (option.key === selectedAnswer && !isCorrect) {
                      buttonClass += "border-red-500 bg-red-50 text-red-800";
                    } else {
                      buttonClass += "border-slate-200 bg-slate-50 text-slate-600";
                    }
                  } else if (selectedAnswer === option.key) {
                    buttonClass += "border-blue-500 bg-blue-50 text-blue-800";
                  } else {
                    buttonClass += "border-slate-200 hover:border-blue-300 hover:bg-blue-50";
                  }

                  return (
                    <button
                      key={option.key}
                      onClick={() => !showResult && handleAnswerSelect(mcq.id, option.key)}
                      disabled={showResult}
                      className={buttonClass}
                    >
                      <span className="font-semibold mr-2">{option.key}.</span>
                      {option.value}
                      {showResult && option.key === mcq.correct_answer && (
                        <CheckCircle className="h-5 w-5 text-green-600 inline ml-2" />
                      )}
                      {showResult && option.key === selectedAnswer && !isCorrect && (
                        <XCircle className="h-5 w-5 text-red-600 inline ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {!showResult ? (
                <Button
                  onClick={() => handleSubmitAnswer(mcq.id)}
                  disabled={!selectedAnswer}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  Submit Answer
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-center mb-2">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mr-2" />
                      )}
                      <span className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                      </span>
                    </div>
                    {mcq.explanation && (
                      <p className="text-slate-700 text-sm">{mcq.explanation}</p>
                    )}
                  </div>
                  <Button
                    onClick={() => resetMCQ(mcq.id)}
                    variant="outline"
                    className="border-slate-300"
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </div>
          </Card>
        );
      })}

      {mcqs.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No MCQs available</h3>
          <p className="text-slate-500">MCQs for this topic and difficulty will be added soon!</p>
        </div>
      )}
    </div>
  );
};
