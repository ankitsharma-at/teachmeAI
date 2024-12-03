import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, MessageSquare, Brain, Trophy } from 'lucide-react';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">PDF Learner</span>
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <NavLink to="/" active={isActive('/')}>
              <BookOpen className="h-5 w-5" />
              <span>Upload</span>
            </NavLink>
            
            <NavLink to="/chat" active={isActive('/chat')}>
              <MessageSquare className="h-5 w-5" />
              <span>Chat</span>
            </NavLink>
            
            <NavLink to="/quiz" active={isActive('/quiz')}>
              <Brain className="h-5 w-5" />
              <span>Quiz</span>
            </NavLink>
            
            
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
        active
          ? 'bg-indigo-100 text-indigo-700'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {children}
    </Link>
  );
}

export default Navbar;