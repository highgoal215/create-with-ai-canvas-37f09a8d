
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Upload, 
  Search, 
  Image as ImageIcon, 
  Video, 
  Music, 
  File,
  Grid,
  List,
  Filter
} from 'lucide-react';

export const AssetsPanel = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const assetTypes = [
    { id: 'images', icon: ImageIcon, label: 'Images', count: 24 },
    { id: 'videos', icon: Video, label: 'Videos', count: 8 },
    { id: 'audio', icon: Music, label: 'Audio', count: 12 },
    { id: 'documents', icon: File, label: 'Documents', count: 15 },
  ];

  const mockAssets = [
    { id: 1, name: 'hero-image.jpg', type: 'image', size: '2.4 MB', preview: 'bg-gradient-to-br from-blue-400 to-purple-500' },
    { id: 2, name: 'logo-design.svg', type: 'image', size: '156 KB', preview: 'bg-gradient-to-br from-green-400 to-blue-500' },
    { id: 3, name: 'background-video.mp4', type: 'video', size: '15.2 MB', preview: 'bg-gradient-to-br from-red-400 to-pink-500' },
    { id: 4, name: 'brand-guidelines.pdf', type: 'document', size: '892 KB', preview: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
    { id: 5, name: 'product-photo.png', type: 'image', size: '3.1 MB', preview: 'bg-gradient-to-br from-purple-400 to-pink-500' },
    { id: 6, name: 'soundtrack.mp3', type: 'audio', size: '4.7 MB', preview: 'bg-gradient-to-br from-cyan-400 to-blue-500' },
  ];

  return (
    <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Assets Library</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your design assets and media files</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload Assets
          </Button>
        </div>

        {/* Search and Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
            <Input 
              placeholder="Search assets..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="border-gray-300 dark:border-gray-600">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'outline'} 
              size="icon"
              onClick={() => setViewMode('grid')}
              className="border-gray-300 dark:border-gray-600"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'outline'} 
              size="icon"
              onClick={() => setViewMode('list')}
              className="border-gray-300 dark:border-gray-600"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Asset Types */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {assetTypes.map((type) => (
            <div key={type.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <type.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{type.label}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{type.count} files</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Assets Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Assets</h2>
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4' : 'space-y-2'}>
            {mockAssets.map((asset) => (
              <div key={asset.id} className={`group cursor-pointer ${viewMode === 'grid' ? 'bg-gray-50 dark:bg-gray-700 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors' : 'flex items-center space-x-3 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                {viewMode === 'grid' ? (
                  <>
                    <div className={`h-24 ${asset.preview} rounded-md mb-2 flex items-center justify-center`}>
                      <div className="text-white text-xs font-medium opacity-75">{asset.type}</div>
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">{asset.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{asset.size}</p>
                  </>
                ) : (
                  <>
                    <div className={`w-10 h-10 ${asset.preview} rounded flex items-center justify-center flex-shrink-0`}>
                      <div className="text-white text-xs font-medium">{asset.type.charAt(0).toUpperCase()}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">{asset.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{asset.size}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
