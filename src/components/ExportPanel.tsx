
import React, { useState } from 'react';
import { Download, FileImage, FileText, Code, Share2, Link, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export const ExportPanel = () => {
  const [quality, setQuality] = useState([80]);
  const [embedCode, setEmbedCode] = useState('');

  const exportFormats = [
    { id: 'png', name: 'PNG', description: 'Best for web graphics with transparency', icon: FileImage },
    { id: 'jpg', name: 'JPEG', description: 'Best for photos and web use', icon: FileImage },
    { id: 'pdf', name: 'PDF', description: 'Best for print and documents', icon: FileText },
    { id: 'svg', name: 'SVG', description: 'Best for scalable vector graphics', icon: Code },
  ];

  const dimensions = [
    { name: 'Original Size', width: 800, height: 600 },
    { name: 'HD (1920x1080)', width: 1920, height: 1080 },
    { name: 'Square (1080x1080)', width: 1080, height: 1080 },
    { name: 'Instagram Story (1080x1920)', width: 1080, height: 1920 },
    { name: 'Facebook Cover (820x312)', width: 820, height: 312 },
    { name: 'Custom', width: 0, height: 0 },
  ];

  const handleExport = (format: string) => {
    toast.success(`Exporting as ${format.toUpperCase()}...`);
    // Simulate export process
    setTimeout(() => {
      toast.success(`Design exported as ${format.toUpperCase()}!`);
    }, 2000);
  };

  const generateEmbedCode = () => {
    const code = `<iframe src="https://designstudio.app/embed/design-123" width="800" height="600" frameborder="0"></iframe>`;
    setEmbedCode(code);
    toast.success('Embed code generated!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Download className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Export & Share</h1>
            <p className="text-gray-600">Download your design or share it with others</p>
          </div>
        </div>

        <Tabs defaultValue="export" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="export">Export Files</TabsTrigger>
            <TabsTrigger value="share">Share & Embed</TabsTrigger>
            <TabsTrigger value="settings">Export Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {exportFormats.map((format) => (
                <Card key={format.id} className="cursor-pointer hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <format.icon className="w-6 h-6 text-blue-600" />
                      <span>{format.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{format.description}</p>
                    <Button 
                      onClick={() => handleExport(format.id)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export as {format.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="share" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Share2 className="w-5 h-5" />
                    <span>Share Link</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="shareLink">Public Share Link</Label>
                    <div className="flex space-x-2 mt-2">
                      <Input
                        id="shareLink"
                        value="https://designstudio.app/share/design-123"
                        readOnly
                        className="flex-1"
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => copyToClipboard('https://designstudio.app/share/design-123')}
                      >
                        <Link className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Social Media
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Code className="w-5 h-5" />
                    <span>Embed Code</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={generateEmbedCode} className="w-full">
                    Generate Embed Code
                  </Button>
                  {embedCode && (
                    <div>
                      <Label htmlFor="embedCode">Embed Code</Label>
                      <div className="flex space-x-2 mt-2">
                        <textarea
                          id="embedCode"
                          value={embedCode}
                          readOnly
                          className="flex-1 p-2 border border-gray-300 rounded-md resize-none"
                          rows={4}
                        />
                        <Button 
                          variant="outline" 
                          onClick={() => copyToClipboard(embedCode)}
                        >
                          <Link className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Export Dimensions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="dimensions">Preset Dimensions</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select dimensions" />
                      </SelectTrigger>
                      <SelectContent>
                        {dimensions.map((dim) => (
                          <SelectItem key={dim.name} value={dim.name}>
                            {dim.name} {dim.width > 0 && `(${dim.width}x${dim.height})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="width">Width (px)</Label>
                      <Input id="width" type="number" placeholder="800" />
                    </div>
                    <div>
                      <Label htmlFor="height">Height (px)</Label>
                      <Input id="height" type="number" placeholder="600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quality Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="quality">Image Quality: {quality[0]}%</Label>
                    <Slider
                      id="quality"
                      min={10}
                      max={100}
                      step={10}
                      value={quality}
                      onValueChange={setQuality}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dpi">DPI (Print Quality)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select DPI" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="72">72 DPI (Web)</SelectItem>
                        <SelectItem value="150">150 DPI (Good Print)</SelectItem>
                        <SelectItem value="300">300 DPI (High Print)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
