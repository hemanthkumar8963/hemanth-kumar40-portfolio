
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Clock, User } from 'lucide-react';

interface VideoSectionProps {
  selectedTopic: string;
  selectedDifficulty: string;
}

const videoData = {
  strings: {
    beginner: [
      { id: 1, title: "String Basics - Introduction", duration: "15:30", instructor: "freeCodeCamp", thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop", url: "https://www.youtube.com/watch?v=example1" },
      { id: 2, title: "String Operations and Methods", duration: "22:45", instructor: "Coursera", thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop", url: "https://www.youtube.com/watch?v=example2" }
    ],
    medium: [
      { id: 3, title: "String Algorithms - Pattern Matching", duration: "28:15", instructor: "YouTube Tutorial", thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=300&h=200&fit=crop", url: "https://www.youtube.com/watch?v=example3" }
    ]
  },
  sorting: {
    beginner: [
      { id: 4, title: "Bubble Sort Explained", duration: "12:20", instructor: "freeCodeCamp", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop", url: "https://www.youtube.com/watch?v=example4" },
      { id: 5, title: "Selection Sort Algorithm", duration: "18:10", instructor: "Coursera", thumbnail: "https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?w=300&h=200&fit=crop", url: "https://www.youtube.com/watch?v=example5" }
    ]
  }
};

export const VideoSection = ({ selectedTopic, selectedDifficulty }: VideoSectionProps) => {
  const getVideos = () => {
    if (selectedTopic === 'all') {
      const allVideos = [];
      Object.values(videoData).forEach(topicVideos => {
        Object.values(topicVideos).forEach(difficultyVideos => {
          allVideos.push(...difficultyVideos);
        });
      });
      return allVideos;
    }

    const topicVideos = videoData[selectedTopic as keyof typeof videoData];
    if (!topicVideos) return [];

    if (selectedDifficulty === 'all') {
      const allDifficultyVideos = [];
      Object.values(topicVideos).forEach(videos => {
        allDifficultyVideos.push(...videos);
      });
      return allDifficultyVideos;
    }

    return topicVideos[selectedDifficulty as keyof typeof topicVideos] || [];
  };

  const videos = getVideos();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0">
            <div className="relative">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Button size="lg" className="bg-white/90 text-slate-800 hover:bg-white">
                  <Play className="h-5 w-5 mr-2" />
                  Play
                </Button>
              </div>
              <div className="absolute top-2 right-2">
                <Badge className="bg-black/70 text-white">
                  <Clock className="h-3 w-3 mr-1" />
                  {video.duration}
                </Badge>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">{video.title}</h3>
              <div className="flex items-center text-sm text-slate-600 mb-3">
                <User className="h-4 w-4 mr-1" />
                {video.instructor}
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                onClick={() => window.open(video.url, '_blank')}
              >
                Watch Video
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      {videos.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <Play className="h-12 w-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No videos available</h3>
          <p className="text-slate-500">Videos for this topic and difficulty will be added soon!</p>
        </div>
      )}
    </div>
  );
};
