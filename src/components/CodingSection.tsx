
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Code, Trophy, Clock } from 'lucide-react';

interface CodingSectionProps {
  selectedTopic: string;
  selectedDifficulty: string;
}

const codingProblems = {
  strings: {
    beginner: [
      {
        id: 1,
        title: "Valid Anagram",
        platform: "LeetCode",
        difficulty: "Easy",
        tags: ["Hash Table", "String", "Sorting"],
        url: "https://leetcode.com/problems/valid-anagram/",
        description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise."
      },
      {
        id: 2,
        title: "Reverse String",
        platform: "LeetCode",
        difficulty: "Easy",
        tags: ["Two Pointers", "String"],
        url: "https://leetcode.com/problems/reverse-string/",
        description: "Write a function that reverses a string. The input string is given as an array of characters s."
      }
    ],
    medium: [
      {
        id: 3,
        title: "Longest Substring Without Repeating Characters",
        platform: "LeetCode",
        difficulty: "Medium",
        tags: ["Hash Table", "String", "Sliding Window"],
        url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        description: "Given a string s, find the length of the longest substring without repeating characters."
      }
    ]
  },
  sorting: {
    beginner: [
      {
        id: 4,
        title: "Merge Sorted Array",
        platform: "LeetCode",
        difficulty: "Easy",
        tags: ["Array", "Two Pointers", "Sorting"],
        url: "https://leetcode.com/problems/merge-sorted-array/",
        description: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order."
      }
    ],
    medium: [
      {
        id: 5,
        title: "Sort Colors",
        platform: "LeetCode",
        difficulty: "Medium",
        tags: ["Array", "Two Pointers", "Sorting"],
        url: "https://leetcode.com/problems/sort-colors/",
        description: "Given an array nums with n objects colored red, white, or blue, sort them in-place."
      }
    ]
  }
};

const platformColors = {
  LeetCode: "bg-orange-100 text-orange-800",
  HackerRank: "bg-green-100 text-green-800",
  Codeforces: "bg-blue-100 text-blue-800",
  CodeChef: "bg-purple-100 text-purple-800",
  GeeksforGeeks: "bg-emerald-100 text-emerald-800"
};

const difficultyColors = {
  Easy: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Hard: "bg-red-100 text-red-800"
};

export const CodingSection = ({ selectedTopic, selectedDifficulty }: CodingSectionProps) => {
  const getProblems = () => {
    if (selectedTopic === 'all') {
      const allProblems = [];
      Object.values(codingProblems).forEach(topicProblems => {
        Object.values(topicProblems).forEach(difficultyProblems => {
          allProblems.push(...difficultyProblems);
        });
      });
      return allProblems;
    }

    const topicProblems = codingProblems[selectedTopic as keyof typeof codingProblems];
    if (!topicProblems) return [];

    if (selectedDifficulty === 'all') {
      const allDifficultyProblems = [];
      Object.values(topicProblems).forEach(problems => {
        allDifficultyProblems.push(...problems);
      });
      return allDifficultyProblems;
    }

    return topicProblems[selectedDifficulty as keyof typeof topicProblems] || [];
  };

  const problems = getProblems();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Coding Problems</h3>
          <p className="text-slate-600">Curated problems from top coding platforms</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {problems.length} problems found
        </Badge>
      </div>

      <div className="grid gap-4">
        {problems.map((problem) => (
          <Card key={problem.id} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-xl font-semibold text-slate-800">{problem.title}</h4>
                  <Badge className={platformColors[problem.platform as keyof typeof platformColors]}>
                    {problem.platform}
                  </Badge>
                  <Badge className={difficultyColors[problem.difficulty as keyof typeof difficultyColors]}>
                    {problem.difficulty}
                  </Badge>
                </div>
                <p className="text-slate-600 mb-3">{problem.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {problem.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-slate-500">
                <div className="flex items-center">
                  <Code className="h-4 w-4 mr-1" />
                  Problem
                </div>
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 mr-1" />
                  Practice
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  30-45 min
                </div>
              </div>
              
              <Button 
                onClick={() => window.open(problem.url, '_blank')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Solve Problem
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      {problems.length === 0 && (
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
