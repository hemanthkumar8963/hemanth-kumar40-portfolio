
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarProps {
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
}

const topics = [
  { id: 'strings', name: 'Strings', icon: '📝' },
  { id: 'basics', name: 'Basics', icon: '🔤' },
  { id: 'bit-manipulation', name: 'Bit Manipulation', icon: '⚡' },
  { id: 'sorting', name: 'Sorting', icon: '🔄' },
  { id: 'searching', name: 'Searching', icon: '🔍' },
  { id: 'hashmaps', name: 'Hashmaps', icon: '🗺️' },
];

const difficulties = [
  { id: 'beginner', name: 'Beginner', color: 'bg-green-100 text-green-800' },
  { id: 'medium', name: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'high', name: 'High', color: 'bg-red-100 text-red-800' },
];

export const Sidebar = ({ selectedTopic, setSelectedTopic, selectedDifficulty, setSelectedDifficulty }: SidebarProps) => {
  const [topicsExpanded, setTopicsExpanded] = useState(true);
  const [difficultyExpanded, setDifficultyExpanded] = useState(true);

  return (
    <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-slate-200 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Topics Section */}
        <Card className="p-4 border-0 shadow-sm bg-white/50">
          <div 
            className="flex items-center justify-between cursor-pointer mb-4"
            onClick={() => setTopicsExpanded(!topicsExpanded)}
          >
            <h3 className="font-semibold text-slate-800">Topics</h3>
            {topicsExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </div>
          
          {topicsExpanded && (
            <div className="space-y-2">
              <button
                onClick={() => setSelectedTopic('all')}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                  selectedTopic === 'all' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' 
                    : 'hover:bg-slate-100'
                }`}
              >
                <span className="mr-2">📚</span>
                All Topics
              </button>
              
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    selectedTopic === topic.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' 
                      : 'hover:bg-slate-100'
                  }`}
                >
                  <span className="mr-2">{topic.icon}</span>
                  {topic.name}
                </button>
              ))}
            </div>
          )}
        </Card>

        {/* Difficulty Section */}
        <Card className="p-4 border-0 shadow-sm bg-white/50">
          <div 
            className="flex items-center justify-between cursor-pointer mb-4"
            onClick={() => setDifficultyExpanded(!difficultyExpanded)}
          >
            <h3 className="font-semibold text-slate-800">Difficulty</h3>
            {difficultyExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </div>
          
          {difficultyExpanded && (
            <div className="space-y-2">
              <button
                onClick={() => setSelectedDifficulty('all')}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                  selectedDifficulty === 'all' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' 
                    : 'hover:bg-slate-100'
                }`}
              >
                All Levels
              </button>
              
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty.id}
                  onClick={() => setSelectedDifficulty(difficulty.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center justify-between ${
                    selectedDifficulty === difficulty.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' 
                      : 'hover:bg-slate-100'
                  }`}
                >
                  <span>{difficulty.name}</span>
                  <Badge className={`${difficulty.color} ${selectedDifficulty === difficulty.id ? 'bg-white/20 text-white' : ''}`}>
                    {difficulty.name.charAt(0)}
                  </Badge>
                </button>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
