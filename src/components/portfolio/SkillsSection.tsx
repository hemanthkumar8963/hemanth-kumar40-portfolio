
import { Code, Shield, Brain, Globe, Database, Server } from 'lucide-react';

export const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Globe className="h-8 w-8" />,
      skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Interactive Web Design"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Backend Development", 
      icon: <Server className="h-8 w-8" />,
      skills: ["Node.js", "Express.js", "Python", "RESTful APIs", "Authentication"],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Database & Tools",
      icon: <Database className="h-8 w-8" />,
      skills: ["MongoDB", "MySQL", "SQL", "Git", "GitHub", "VS Code"],
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Machine Learning",
      icon: <Brain className="h-8 w-8" />,
      skills: ["Python", "TensorFlow", "Scikit-learn", "Data Analysis", "Pandas", "NumPy"],
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Cybersecurity",
      icon: <Shield className="h-8 w-8" />,
      skills: ["Threat Detection", "Incident Response", "Risk Management", "Security Analysis", "Vulnerability Assessment"],
      color: "from-red-500 to-pink-500"
    },
    {
      title: "Data Structures & Algorithms",
      icon: <Code className="h-8 w-8" />,
      skills: ["Problem Solving", "Algorithm Design", "Time Complexity", "Space Complexity", "Coding Challenges"],
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white mb-4`}>
                  {category.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{category.title}</h3>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
