import React, { useState } from "react";
import {
  Sparkles,
  Type,
  Image as ImageIcon,
  Palette,
  Wand2,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const AIPanel = () => {
  const [textPrompt, setTextPrompt] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [generatedTexts, setGeneratedTexts] = useState<string[]>([]);
  const [aiGeneratedText, setAiGeneratedText] = useState(""); // For API response
  const [aiGeneratedImage, setAiGeneratedImage] = useState(""); // For image API response
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const getText = async (prompt: string) => {

    try {
      const res = await fetch("http://localhost:3000/generate-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data.text;
    } catch (error) {
      console.error("Error generating text:", error);
      throw error;
    }
  };

  const getImage = async (prompt: string) => {
    console.log("Generating image with prompt:", prompt);
    try {
      const res = await fetch("http://localhost:3000/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data.imageUrl || data.image; // Adjust based on your API response structure
    } catch (error) {
      console.error("Error generating image:", error);
      throw error;
    }
  };

  const generateText = async () => {
    if (!textPrompt.trim()) return;

    setIsGenerating(true);

    try {
      // Call the API and get the response
      const apiResponse = await getText(textPrompt);

      // Display the API response in the AI Generated Text section
      setAiGeneratedText(apiResponse);

      // Also keep the existing variation generation for the variations panel
      const generatedOptions = [
        `${textPrompt} - Professional and modern approach`,
        `${textPrompt} - Creative and innovative solution`,
        `${textPrompt} - Bold and engaging message`,
        `${textPrompt} - Clean and minimalist style`,
      ];
      setGeneratedTexts(generatedOptions);

      toast.success("Text generated successfully!");
    } catch (error) {
      toast.error("Failed to generate text. Please try again.");
      console.error("Generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImage = async () => {
    if (!imagePrompt.trim()) return;


    setIsGeneratingImage(true);






    try {
      // Call the API and get the image response
      const apiResponse = await getImage(imagePrompt);

      // Display the API response in the AI Generated Image section
      setAiGeneratedImage(apiResponse);

      toast.success("Image generated successfully!");
    } catch (error) {
      toast.error("Failed to generate image. Please try again.");
      console.error("Image generation error:", error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const layoutSuggestions = [
    {
      name: "Center Focus",
      description: "Main element centered with supporting text",
    },
    {
      name: "Split Layout",
      description: "Two-column design with image and text",
    },
    {
      name: "Magazine Style",
      description: "Multi-column layout with varied text sizes",
    },
    {
      name: "Hero Banner",
      description: "Large headline with background image",
    },
  ];

  const colorPalettes = [
    {
      name: "Modern Blue",
      colors: ["#3B82F6", "#1E40AF", "#93C5FD", "#DBEAFE"],
    },
    {
      name: "Warm Sunset",
      colors: ["#F59E0B", "#EF4444", "#FCD34D", "#FEF3C7"],
    },
    {
      name: "Nature Green",
      colors: ["#10B981", "#059669", "#6EE7B7", "#D1FAE5"],
    },
    {
      name: "Purple Dream",
      colors: ["#8B5CF6", "#7C3AED", "#C4B5FD", "#EDE9FE"],
    },
  ];
  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              AI Design Assistant
            </h1>
            <p className="text-gray-600">
              Generate content and get layout suggestions powered by AI
            </p>
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
            <TabsTrigger
              value="layouts"
              className="flex items-center space-x-2"
            >
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

                  disabled={isGeneratingImage || !imagePrompt.trim()}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >

                  {isGeneratingImage ? (
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



              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layouts" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {layoutSuggestions.map((layout, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-shadow duration-200"
                >
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
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-shadow duration-200"
                >
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



      {/* AI Generated Content Display Section */}
      <div className="max-w-7xl mx-auto p-4 mt-8 space-y-6">
        {/* AI Generated Text Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span>AI Generated Text</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {aiGeneratedText ? (
              <div>
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 mb-4">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
                    {aiGeneratedText}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      navigator.clipboard.writeText(aiGeneratedText)
                    }
                  >
                    Copy Text
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAiGeneratedText("")}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Type className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg mb-2">No AI generated text yet</p>
                <p className="text-sm">
                  Enter a prompt above and click "Generate Text" to see
                  AI-generated content here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
