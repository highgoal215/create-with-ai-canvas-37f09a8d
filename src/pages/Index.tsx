
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { CanvasEditor } from '@/components/CanvasEditor';
import { AssetsPanel } from '@/components/AssetsPanel';
import { AIPanel } from '@/components/AIPanel';
import { ExportPanel } from '@/components/ExportPanel';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'editor':
        return <CanvasEditor />;
      case 'assets':
        return <AssetsPanel />;
      case 'ai':
        return <AIPanel />;
      case 'export':
        return <ExportPanel />;
      case 'settings':
        return (
          <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <p className="text-gray-600 dark:text-gray-300">Settings panel coming soon...</p>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default Index;
