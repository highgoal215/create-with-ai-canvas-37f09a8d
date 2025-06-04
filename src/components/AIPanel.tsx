
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Sparkles, 
  Send, 
  Image as ImageIcon, 
  Type, 
  Palette, 
  Magic,
  Download,
  RefreshCw
} from 'lucide-react';

export const AIPanel = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const aiFeatures = [
    { id: 'text', icon: Type, label: 'Generate Text', description: 'Create compelling copy and content' },
    { id: 'image', icon: ImageIcon, label: 'Generate Images', description: 'Create stunning visuals from descriptions' },
    { id: 'color', icon: Palette, label: 'Color Palettes', description: 'Generate harmonious color schemes' },
    { id: 'enhance', icon: Magic, label: 'Enhance Design', description: 'Improve existing designs with AI' },
  ];

  const recentGenerations = [
    { id: 1, type: 'image', prompt: 'Modern minimalist logo for tech startup', preview: 'bg-gradient-to-br from-blue-400 to-purple-500' },
    { id: 2, type: 'text', prompt: 'Marketing copy for new product launch', preview: 'bg-gradient-to-br from-green-400 to-blue-500' },
    { id: 3, type: 'color', prompt: 'Color palette for wellness brand', preview: 'bg-gradient-to-br from-pink-400 to-red-500' },
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setPrompt('');
    }, 3000);
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI Design Assistant</h1>
          <p className="text-gray-600 dark:text-gray-300">Harness the power of AI to create amazing designs</p>
        </div>

        {/* AI Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {aiFeatures.map((feature) => (
            <div key={feature.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.label}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Prompt Input */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="space-y-4">
            <div>
              <Label className="text-gray-700 dark:text-gray-300 font-medium">Describe what you want to create</Label>
              <div className="mt-2 flex space-x-3">
                <Input
                  placeholder="e.g., Create a modern logo for a coffee shop with warm colors..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="flex-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                />
                <Button 
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                >
                  {isGenerating ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {isGenerating ? 'Generating...' : 'Generate'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Generations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Generations</h2>
          <div className="space-y-4">
            {recentGenerations.map((generation) => (
              <div key={generation.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className={`w-16 h-16 ${generation.preview} rounded-lg flex items-center justify-center`}>
                  <div className="text-white font-medium text-xs">{generation.type}</div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-medium mb-1">{generation.prompt}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Generated 2 hours ago</p>
                </div>
                <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600">
                  <Download className="w-4 h-4 mr-1" />
                  Use
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
