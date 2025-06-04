
import React from 'react';
import { 
  Home, 
  Layers, 
  Image, 
  Brush, 
  Download, 
  Settings,
  Plus,
  Sparkles,
  LogIn
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'editor', icon: Layers, label: 'Editor' },
    { id: 'assets', icon: Image, label: 'Assets' },
    { id: 'ai', icon: Sparkles, label: 'AI Panel' },
    { id: 'export', icon: Download, label: 'Export' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleAuthClick = () => {
    window.location.href = '/auth';
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brush className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">DesignStudio</h1>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                activeTab === item.id
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
        <button 
          onClick={handleAuthClick}
          className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
        >
          <LogIn className="w-4 h-4" />
          <span className="font-medium">Login / Sign Up</span>
        </button>
        
        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
          <Plus className="w-4 h-4" />
          <span className="font-medium">New Design</span>
        </button>
      </div>
    </div>
  );
};
