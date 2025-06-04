
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Download, 
  FileImage, 
  FileText, 
  Video, 
  Settings,
  Check,
  Copy
} from 'lucide-react';

export const ExportPanel = () => {
  const [selectedFormat, setSelectedFormat] = useState('png');
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    { id: 'png', icon: FileImage, label: 'PNG', description: 'High quality with transparency', size: '2.4 MB' },
    { id: 'jpg', icon: FileImage, label: 'JPG', description: 'Compressed for web use', size: '1.2 MB' },
    { id: 'svg', icon: FileText, label: 'SVG', description: 'Vector format, scalable', size: '156 KB' },
    { id: 'pdf', icon: FileText, label: 'PDF', description: 'Print-ready document', size: '892 KB' },
    { id: 'mp4', icon: Video, label: 'MP4', description: 'Animated video export', size: '5.6 MB' },
  ];

  const exportSizes = [
    { id: 'small', label: 'Small', dimensions: '800x600', recommended: false },
    { id: 'medium', label: 'Medium', dimensions: '1200x900', recommended: true },
    { id: 'large', label: 'Large', dimensions: '1920x1080', recommended: false },
    { id: 'custom', label: 'Custom', dimensions: 'Custom size', recommended: false },
  ];

  const recentExports = [
    { id: 1, name: 'Social Media Post.png', format: 'PNG', size: '2.4 MB', date: '2 hours ago' },
    { id: 2, name: 'Business Card.pdf', format: 'PDF', size: '892 KB', date: '1 day ago' },
    { id: 3, name: 'Logo Design.svg', format: 'SVG', size: '156 KB', date: '2 days ago' },
  ];

  const handleExport = () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
    }, 2000);
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Export Design</h1>
          <p className="text-gray-600 dark:text-gray-300">Choose your export format and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Export Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Format Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export Format</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exportFormats.map((format) => (
                  <div
                    key={format.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedFormat === format.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedFormat(format.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <format.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 dark:text-white">{format.label}</h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{format.size}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{format.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Options */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export Size</h2>
              <div className="space-y-3">
                {exportSizes.map((size) => (
                  <div key={size.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <Label className="text-gray-900 dark:text-white font-medium">{size.label}</Label>
                          {size.recommended && (
                            <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{size.dimensions}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Advanced Settings</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-700 dark:text-gray-300">High Quality</Label>
                  <div className="w-10 h-6 bg-blue-500 rounded-full p-1">
                    <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-700 dark:text-gray-300">Include Metadata</Label>
                  <div className="w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded-full p-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview and Export */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h2>
              <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <div className="text-white font-medium">Design Preview</div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Format:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{selectedFormat.toUpperCase()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Size:</span>
                  <span className="text-gray-900 dark:text-white font-medium">1200x900</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">File Size:</span>
                  <span className="text-gray-900 dark:text-white font-medium">2.4 MB</span>
                </div>
              </div>
            </div>

            {/* Export Button */}
            <Button 
              onClick={handleExport}
              disabled={isExporting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export Design
                </>
              )}
            </Button>

            {/* Recent Exports */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Exports</h2>
              <div className="space-y-3">
                {recentExports.map((export_item) => (
                  <div key={export_item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">{export_item.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{export_item.size} • {export_item.date}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
