
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, ExternalLink, Tag } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CodingSectionProps {
  selectedTopic: string;
  selectedDifficulty: string;
}

interface CodingProblem {
  id: string;
  title: string;
  description: string;
  platform: string;
  problem_url: string;
  topic: string;
  difficulty: string;
  tags: string[];
}

export const CodingSection = ({ selectedTopic, selectedDifficulty }: CodingSectionProps) => {
  const [problems, setProblems] = useState<CodingProblem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCodingProblems();
  }, [selectedTopic, selectedDifficulty]);

  const fetchCodingProblems = async () => {
    try {
      setLoading(true);
      let query = supabase.from('coding_problems').select('*');

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

      setProblems(data || []);
    } catch (error) {
      console.error('Error fetching coding problems:', error);
      toast({
        title: "Error",
        description: "Failed to load coding problems. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'leetcode': return 'bg-orange-100 text-orange-800';
      case 'hackerrank': return 'bg-green-100 text-green-800';
      case 'geeksforgeeks': return 'bg-purple-100 text-purple-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm border-0">
            <div className="space-y-4">
              <div className="h-6 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
              <div className="flex gap-2">
                <div className="h-6 bg-slate-200 rounded animate-pulse w-16" />
                <div className="h-6 bg-slate-200 rounded animate-pulse w-20" />
              </div>
              <div className="h-10 bg-slate-200 rounded animate-pulse" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {problems.map((problem) => (
          <Card key={problem.id} className="p-6 bg-white/80 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-slate-800 flex-1">{problem.title}</h3>
                <div className="flex gap-2">
                  <Badge className={getDifficultyColor(problem.difficulty)}>
                    {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                  </Badge>
                  <Badge className={getPlatformColor(problem.platform)}>
                    {problem.platform}
                  </Badge>
                </div>
              </div>

              {problem.description && (
                <p className="text-slate-600 text-sm line-clamp-3">{problem.description}</p>
              )}

              {problem.tags && problem.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {problem.tags.slice(0, 3).map((tag, index) => (
                    <div key={index} className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-md text-xs text-slate-600">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </div>
                  ))}
                  {problem.tags.length > 3 && (
                    <div className="px-2 py-1 bg-slate-100 rounded-md text-xs text-slate-600">
                      +{problem.tags.length - 3} more
                    </div>
                  )}
                </div>
              )}

              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                onClick={() => window.open(problem.problem_url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Solve Problem
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {problems.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <Code className="h-12 w-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No coding problems available</h3>
          <p className="text-slate-500">Coding problems for this topic and difficulty will be added soon!</p>
        </div>
      )}
    </div>
  );
};
