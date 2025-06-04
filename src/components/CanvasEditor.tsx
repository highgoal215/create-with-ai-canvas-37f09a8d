
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Square, 
  Circle, 
  Type, 
  Image as ImageIcon, 
  Move, 
  RotateCw,
  Trash2,
  Download
} from 'lucide-react';

export const CanvasEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState('select');
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  const tools = [
    { id: 'select', icon: Move, label: 'Select' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'image', icon: ImageIcon, label: 'Image' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas and set background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [canvasSize]);

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900 h-screen flex">
      {/* Toolbar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tools</h2>
        
        <div className="space-y-2 mb-6">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={selectedTool === tool.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedTool(tool.id)}
            >
              <tool.icon className="w-4 h-4 mr-2" />
              {tool.label}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-gray-700 dark:text-gray-300">Canvas Size</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                type="number"
                placeholder="Width"
                value={canvasSize.width}
                onChange={(e) => setCanvasSize(prev => ({ ...prev, width: parseInt(e.target.value) || 800 }))}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
              <Input
                type="number"
                placeholder="Height"
                value={canvasSize.height}
                onChange={(e) => setCanvasSize(prev => ({ ...prev, height: parseInt(e.target.value) || 600 }))}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <RotateCw className="w-4 h-4 mr-1" />
              Rotate
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>

          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Download className="w-4 h-4 mr-2" />
            Export Design
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-center">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <canvas
              ref={canvasRef}
              className="border border-gray-300 dark:border-gray-600 rounded cursor-crosshair"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
