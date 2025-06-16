
import { Code2, Heart } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">👋</span>
                <h3 className="text-2xl font-semibold text-gray-800">Hello! I'm Hemanth Kumar Somana</h3>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                A passionate developer with hands-on experience in diverse domains including 
                <span className="font-semibold text-blue-600"> Cybersecurity</span>, 
                <span className="font-semibold text-purple-600"> Machine Learning</span>, and the 
                <span className="font-semibold text-green-600"> MERN stack</span>. 
                I enjoy exploring new technologies and turning ideas into impactful solutions.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Currently, I'm actively learning <span className="font-semibold text-orange-600">Data Structures and Algorithms (DSA)</span> to 
                strengthen my problem-solving abilities. I love working on challenging coding problems and 
                contributing to projects that push my technical boundaries.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Hackathons and real-world projects excite me—they're the perfect playground for 
                <span className="font-semibold text-pink-600"> innovation</span> and 
                <span className="font-semibold text-indigo-600"> rapid learning</span>.
              </p>
              
              <div className="flex items-center space-x-2 text-gray-700">
                <Heart className="h-5 w-5 text-red-500" />
                <span>Passionate about creating meaningful solutions</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <Code2 className="h-32 w-32 text-blue-600" />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                <span className="text-xl">💡</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
