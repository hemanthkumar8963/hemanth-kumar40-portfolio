
import { Code2, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Coding Profiles', id: 'coding-profiles' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <div className="p-4">
      <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50 rounded-lg">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code2 className="h-5 w-5 text-white" />
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-slate-300 hover:text-white transition-colors duration-200 font-medium px-3 py-1 rounded-lg hover:bg-slate-800 text-sm"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                  {navItems.map((item) => (
                    <DropdownMenuItem key={item.id} onClick={() => scrollToSection(item.id)} className="text-slate-300 hover:text-white hover:bg-slate-700">
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
