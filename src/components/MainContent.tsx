
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoSection } from '@/components/VideoSection';
import { MCQSection } from '@/components/MCQSection';
import { CodingSection } from '@/components/CodingSection';
import { Play, BookOpen, Code } from 'lucide-react';

interface MainContentProps {
  selectedTopic: string;
  selectedDifficulty: string;
  activeTab: 'videos' | 'mcqs' | 'coding';
  setActiveTab: (tab: 'videos' | 'mcqs' | 'coding') => void;
}

export const MainContent = ({ selectedTopic, selectedDifficulty, activeTab, setActiveTab }: MainContentProps) => {
  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          {selectedTopic === 'all' ? 'All Topics' : selectedTopic.charAt(0).toUpperCase() + selectedTopic.slice(1)}
        </h2>
        <p className="text-slate-600">
          {selectedDifficulty === 'all' ? 'All difficulty levels' : `${selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} level`}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/60 backdrop-blur-sm">
          <TabsTrigger value="videos" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
            <Play className="h-4 w-4" />
            <span>Videos</span>
          </TabsTrigger>
          <TabsTrigger value="mcqs" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
            <BookOpen className="h-4 w-4" />
            <span>MCQs</span>
          </TabsTrigger>
          <TabsTrigger value="coding" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
            <Code className="h-4 w-4" />
            <span>Coding</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos">
          <VideoSection selectedTopic={selectedTopic} selectedDifficulty={selectedDifficulty} />
        </TabsContent>

        <TabsContent value="mcqs">
          <MCQSection selectedTopic={selectedTopic} selectedDifficulty={selectedDifficulty} />
        </TabsContent>

        <TabsContent value="coding">
          <CodingSection selectedTopic={selectedTopic} selectedDifficulty={selectedDifficulty} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
