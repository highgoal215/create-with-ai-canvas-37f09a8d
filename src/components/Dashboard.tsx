
import React from 'react';
import { Plus, Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Dashboard = () => {
  const templates = [
    { id: 1, name: 'Social Media Post', category: 'Social', preview: 'bg-gradient-to-br from-pink-400 to-red-500' },
    { id: 2, name: 'Business Card', category: 'Print', preview: 'bg-gradient-to-br from-blue-400 to-blue-600' },
    { id: 3, name: 'Instagram Story', category: 'Social', preview: 'bg-gradient-to-br from-purple-400 to-pink-500' },
    { id: 4, name: 'Flyer Design', category: 'Print', preview: 'bg-gradient-to-br from-green-400 to-blue-500' },
    { id: 5, name: 'YouTube Thumbnail', category: 'Social', preview: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
    { id: 6, name: 'Logo Design', category: 'Branding', preview: 'bg-gradient-to-br from-indigo-400 to-purple-600' },
  ];

  const recentDesigns = [
    { id: 1, name: 'Summer Campaign', modified: '2 hours ago', preview: 'bg-gradient-to-br from-orange-400 to-pink-500' },
    { id: 2, name: 'Product Launch', modified: '1 day ago', preview: 'bg-gradient-to-br from-cyan-400 to-blue-500' },
    { id: 3, name: 'Brand Guidelines', modified: '3 days ago', preview: 'bg-gradient-to-br from-violet-400 to-purple-600' },
  ];

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
            <p className="text-gray-600">Create amazing designs with AI-powered tools</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Create New Design
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search templates and designs..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="icon">
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <List className="w-4 h-4" />
          </Button>
        </div>

        {/* Recent Designs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Designs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentDesigns.map((design) => (
              <div key={design.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <div className={`h-32 ${design.preview}`}></div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">{design.name}</h3>
                  <p className="text-sm text-gray-500">Modified {design.modified}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Templates */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <div className={`h-32 ${template.preview} flex items-center justify-center`}>
                  <div className="text-white font-medium">{template.name}</div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-500">{template.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
