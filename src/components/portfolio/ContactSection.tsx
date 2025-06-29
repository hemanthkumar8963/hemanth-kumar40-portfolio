
import { Mail, Github, ExternalLink, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ContactSection = () => {
  const contactInfo = [
    {
      label: "Email",
      value: "hemanthkumarsomana@gmail.com",
      href: "mailto:hemanthkumarsomana@gmail.com",
      icon: <Mail className="h-5 w-5" />,
      color: "from-red-500 to-pink-500"
    },
    {
      label: "WhatsApp",
      value: "Chat on WhatsApp",
      href: "https://wa.me/919398756712",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "from-green-500 to-green-600"
    },
    {
      label: "LinkedIn",
      value: "Connect with me",
      href: "https://www.linkedin.com/in/hemanth-kumar-somana-2029b5212/",
      icon: <ExternalLink className="h-5 w-5" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      label: "GitHub",
      value: "View my repositories",
      href: "https://github.com/Hemanth-Kumar-Somana",
      icon: <Github className="h-5 w-5" />,
      color: "from-gray-700 to-gray-900"
    },
    {
      label: "Resume",
      value: "Download Resume",
      href: "https://drive.google.com/drive/folders/1UNQzAjpEFmiSDNKKjK1dDo6AJVDOk7ce?usp=drive_link",
      icon: <ExternalLink className="h-5 w-5" />,
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          
          <div className="text-center mb-12">
            <p className="text-xl text-gray-600 mb-6">
              I'm always open to discussing new opportunities, collaborations, or just having a chat about technology!
            </p>
            <p className="text-lg text-gray-500">
              Feel free to reach out through any of the channels below.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${contact.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    {contact.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                      {contact.label}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                      {contact.value}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </a>
            ))}
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border-2 border-blue-100 hover:border-blue-200 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ready to collaborate?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Whether you have a project in mind, want to discuss opportunities, or just want to connect, 
                I'd love to hear from you. Let's build something amazing together!
              </p>
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <a href="mailto:hemanthkumarsomana@gmail.com" className="flex items-center space-x-2">
                  <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  <span>Send me an email</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
