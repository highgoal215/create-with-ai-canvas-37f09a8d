
import React, { useRef, useState } from 'react';
import { Upload, Search, Filter, Grid, List, Image as ImageIcon, Type, Shapes } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const AssetsPanel = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const stockImages = [
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop',
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedImages(prev => [...prev, e.target.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Assets</h1>
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Assets
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search assets..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="icon">
            <Grid className="w-4 h-4" />
          </Button>
        </div>

        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="images" className="flex items-center space-x-2">
              <ImageIcon className="w-4 h-4" />
              <span>Images</span>
            </TabsTrigger>
            <TabsTrigger value="uploads" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Uploads</span>
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center space-x-2">
              <Type className="w-4 h-4" />
              <span>Text</span>
            </TabsTrigger>
            <TabsTrigger value="shapes" className="flex items-center space-x-2">
              <Shapes className="w-4 h-4" />
              <span>Shapes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {stockImages.map((image, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer">
                  <img 
                    src={image} 
                    alt={`Stock image ${index + 1}`}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3">
                    <p className="text-sm text-gray-600">Stock Image {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="uploads" className="mt-6">
            {uploadedImages.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No uploaded images</h3>
                <p className="text-gray-600 mb-4">Upload your own images to use in your designs</p>
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Images
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer">
                    <img 
                      src={image} 
                      alt={`Uploaded image ${index + 1}`}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-3">
                      <p className="text-sm text-gray-600">Uploaded Image {index + 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="text" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Heading 1', 'Heading 2', 'Body Text', 'Caption', 'Quote', 'Button Text'].map((textType) => (
                <div key={textType} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{textType}</span>
                    <Type className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mt-2">Click to add {textType.toLowerCase()}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shapes" className="mt-6">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Rectangle', shape: 'bg-blue-500' },
                { name: 'Circle', shape: 'bg-red-500 rounded-full' },
                { name: 'Triangle', shape: 'bg-green-500' },
                { name: 'Star', shape: 'bg-yellow-500' },
                { name: 'Arrow', shape: 'bg-purple-500' },
                { name: 'Line', shape: 'bg-pink-500' },
              ].map((shape) => (
                <div key={shape.name} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer text-center">
                  <div className={`w-12 h-12 ${shape.shape} mx-auto mb-2`}></div>
                  <p className="text-sm text-gray-600">{shape.name}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
