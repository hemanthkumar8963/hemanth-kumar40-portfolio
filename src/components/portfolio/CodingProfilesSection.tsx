
import { ExternalLink, Code, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CodingProfilesSection = () => {
  const codingProfiles = [
    {
      platform: "Smart Interviews",
      description: "Comprehensive coding interview preparation platform with structured learning paths and practice problems.",
      profileImage: "https://media.licdn.com/dms/image/v2/D560BAQGhGl9gZ5NfjA/company-logo_200_200/company-logo_200_200/0/1692156655367?e=2147483647&v=beta&t=FTd01Jk64RhzHAE99gFBAXqLvKvdcwSaxWsncunqhZo",
      profileLink: "https://smartinterviews.in/profile/hemanthkumar40",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      platform: "LeetCode",
      description: "Popular coding platform for practicing algorithmic problems and preparing for technical interviews.",
      profileImage: "https://img.icons8.com/?size=100&id=wDGo581Ea5Nf&format=png&color=000000",
      profileLink: "https://leetcode.com/u/SOMANA_HEMANTH_KUMAR/",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      platform: "HackerRank",
      description: "Technical skills assessment platform with coding challenges and competitive programming contests.",
      profileImage: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/hackerrank.svg",
      profileLink: "https://www.hackerrank.com/profile/22311a05fy1",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section id="coding-profiles" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Coding Profiles
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {codingProfiles.map((profile, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${profile.gradient} flex items-center justify-center p-2`}>
                      <img 
                        src={profile.profileImage} 
                        alt={`${profile.platform} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{profile.platform}</h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Trophy className="h-4 w-4" />
                        <span>Coding Platform</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{profile.description}</p>
                  
                  <Button 
                    asChild 
                    className={`w-full bg-gradient-to-r ${profile.gradient} hover:opacity-90 transition-opacity`}
                  >
                    <a href={profile.profileLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2">
                      <Code className="h-4 w-4" />
                      <span>View Profile</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Problem Solving & Competitive Programming</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                I actively practice coding problems and participate in competitive programming to enhance my algorithmic thinking and problem-solving skills. 
                These platforms help me stay sharp and improve my coding efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
