
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Clock, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VideoSectionProps {
  selectedTopic: string;
  selectedDifficulty: string;
}

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  topic: string;
  difficulty: string;
  platform: string;
  duration_minutes: number;
}

export const VideoSection = ({ selectedTopic, selectedDifficulty }: VideoSectionProps) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchVideos();
  }, [selectedTopic, selectedDifficulty]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      let query = supabase.from('videos').select('*');

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

      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
      toast({
        title: "Error",
        description: "Failed to load videos. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden bg-white/80 backdrop-blur-sm border-0">
            <div className="w-full h-48 bg-slate-200 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 bg-slate-200 rounded animate-pulse w-3/4" />
              <div className="h-8 bg-slate-200 rounded animate-pulse" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0">
            <div className="relative">
              <img 
                src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop&seed=${video.id}`}
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
                  {video.duration_minutes}m
                </Badge>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">{video.title}</h3>
              <p className="text-sm text-slate-600 mb-3 line-clamp-2">{video.description}</p>
              <div className="flex items-center text-sm text-slate-600 mb-3">
                <User className="h-4 w-4 mr-1" />
                {video.platform}
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
      
      {videos.length === 0 && !loading && (
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
