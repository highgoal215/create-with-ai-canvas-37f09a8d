
import React, { useState } from 'react';
import { Sparkles, Type, Image as ImageIcon, Palette, Wand2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export const AIPanel = () => {
  const [textPrompt, setTextPrompt] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedTexts, setGeneratedTexts] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateText = async () => {
    if (!textPrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI text generation
    setTimeout(() => {
      const generatedOptions = [
        `${textPrompt} - Professional and modern approach`,
        `${textPrompt} - Creative and innovative solution`,
        `${textPrompt} - Bold and engaging message`,
        `${textPrompt} - Clean and minimalist style`,
      ];
      setGeneratedTexts(generatedOptions);
      setIsGenerating(false);
      toast.success('Text variations generated!');
    }, 2000);
  };

  const generateImage = async () => {
    if (!imagePrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI image generation
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Image generation coming soon!');
    }, 2000);
  };

  const layoutSuggestions = [
    { name: 'Center Focus', description: 'Main element centered with supporting text' },
    { name: 'Split Layout', description: 'Two-column design with image and text' },
    { name: 'Magazine Style', description: 'Multi-column layout with varied text sizes' },
    { name: 'Hero Banner', description: 'Large headline with background image' },
  ];

  const colorPalettes = [
    { name: 'Modern Blue', colors: ['#3B82F6', '#1E40AF', '#93C5FD', '#DBEAFE'] },
    { name: 'Warm Sunset', colors: ['#F59E0B', '#EF4444', '#FCD34D', '#FEF3C7'] },
    { name: 'Nature Green', colors: ['#10B981', '#059669', '#6EE7B7', '#D1FAE5'] },
    { name: 'Purple Dream', colors: ['#8B5CF6', '#7C3AED', '#C4B5FD', '#EDE9FE'] },
  ];

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Design Assistant</h1>
            <p className="text-gray-600">Generate content and get layout suggestions powered by AI</p>
          </div>
        </div>

        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="text" className="flex items-center space-x-2">
              <Type className="w-4 h-4" />
              <span>Text Generation</span>
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center space-x-2">
              <ImageIcon className="w-4 h-4" />
              <span>Image AI</span>
            </TabsTrigger>
            <TabsTrigger value="layouts" className="flex items-center space-x-2">
              <Wand2 className="w-4 h-4" />
              <span>Layout Ideas</span>
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span>Color Palettes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Type className="w-5 h-5" />
                    <span>Generate Text</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Describe what you need
                    </label>
                    <Textarea
                      placeholder="e.g., Write a catchy headline for a fitness app..."
                      value={textPrompt}
                      onChange={(e) => setTextPrompt(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button 
                    onClick={generateText} 
                    disabled={isGenerating || !textPrompt.trim()}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Generate Text
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Generated Variations</CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedTexts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Generated text variations will appear here
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {generatedTexts.map((text, index) => (
                        <div 
                          key={index} 
                          className="p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          <p className="text-sm text-gray-800">{text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="images" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5" />
                  <span>AI Image Generation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe the image you want
                  </label>
                  <Textarea
                    placeholder="e.g., A modern office space with plants and natural lighting..."
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button 
                  onClick={generateImage}
                  disabled={isGenerating || !imagePrompt.trim()}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>
                <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                  Generated images will appear here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layouts" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {layoutSuggestions.map((layout, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Wand2 className="w-5 h-5" />
                      <span>{layout.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{layout.description}</p>
                    <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Layout Preview</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="colors" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {colorPalettes.map((palette, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Palette className="w-5 h-5" />
                      <span>{palette.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2 mb-4">
                      {palette.colors.map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="w-16 h-16 rounded-lg shadow-sm"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full">
                      Apply Palette
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
