
import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, Textbox, Rect, Circle } from 'fabric';
import { 
  Type, 
  Square, 
  Circle as CircleIcon, 
  Image as ImageIcon, 
  Undo, 
  Redo, 
  Trash2,
  Copy,
  Lock,
  Unlock,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const CanvasEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [layers, setLayers] = useState<any[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    });

    // Enable object controls
    canvas.selection = true;
    canvas.preserveObjectStacking = true;

    // Handle object selection
    canvas.on('selection:created', (e) => {
      setSelectedObject(e.selected?.[0] || null);
    });

    canvas.on('selection:updated', (e) => {
      setSelectedObject(e.selected?.[0] || null);
    });

    canvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    // Update layers when objects change
    canvas.on('object:added', updateLayers);
    canvas.on('object:removed', updateLayers);

    setFabricCanvas(canvas);

    function updateLayers() {
      const objects = canvas.getObjects();
      setLayers(objects.map((obj, index) => ({
        id: index,
        name: obj.type || 'Object',
        visible: obj.visible !== false,
        locked: !obj.selectable,
        object: obj
      })));
    }

    return () => {
      canvas.dispose();
    };
  }, []);

  const addText = () => {
    if (!fabricCanvas) return;
    
    const text = new Textbox('Click to edit text', {
      left: 100,
      top: 100,
      fontFamily: 'Arial',
      fontSize: 24,
      fill: '#000000',
    });
    
    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
  };

  const addRectangle = () => {
    if (!fabricCanvas) return;
    
    const rect = new Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: '#3b82f6',
    });
    
    fabricCanvas.add(rect);
    fabricCanvas.setActiveObject(rect);
  };

  const addCircle = () => {
    if (!fabricCanvas) return;
    
    const circle = new Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: '#ef4444',
    });
    
    fabricCanvas.add(circle);
    fabricCanvas.setActiveObject(circle);
  };

  const deleteSelected = () => {
    if (!fabricCanvas || !selectedObject) return;
    fabricCanvas.remove(selectedObject);
  };

  const duplicateSelected = () => {
    if (!fabricCanvas || !selectedObject) return;
    selectedObject.clone((cloned: any) => {
      cloned.set({
        left: cloned.left + 10,
        top: cloned.top + 10,
      });
      fabricCanvas.add(cloned);
      fabricCanvas.setActiveObject(cloned);
    });
  };

  const toggleLayerVisibility = (layer: any) => {
    layer.object.visible = !layer.object.visible;
    fabricCanvas?.renderAll();
  };

  const toggleLayerLock = (layer: any) => {
    layer.object.selectable = !layer.object.selectable;
    layer.object.evented = layer.object.selectable;
    fabricCanvas?.renderAll();
  };

  return (
    <div className="flex-1 flex bg-gray-50">
      {/* Toolbar */}
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-4">
        <Button variant="ghost" size="icon" onClick={addText} title="Add Text">
          <Type className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={addRectangle} title="Add Rectangle">
          <Square className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={addCircle} title="Add Circle">
          <CircleIcon className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" title="Add Image">
          <ImageIcon className="w-5 h-5" />
        </Button>
        <div className="border-t border-gray-200 pt-4">
          <Button variant="ghost" size="icon" title="Undo">
            <Undo className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" title="Redo">
            <Redo className="w-5 h-5" />
          </Button>
        </div>
        {selectedObject && (
          <div className="border-t border-gray-200 pt-4">
            <Button variant="ghost" size="icon" onClick={duplicateSelected} title="Duplicate">
              <Copy className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={deleteSelected} title="Delete">
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <canvas ref={canvasRef} className="border border-gray-200" />
        </div>
      </div>

      {/* Properties Panel */}
      <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
        {/* Layers Panel */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Layers</h3>
          <div className="space-y-2">
            {layers.map((layer) => (
              <div key={layer.id} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6"
                  onClick={() => toggleLayerVisibility(layer)}
                >
                  {layer.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6"
                  onClick={() => toggleLayerLock(layer)}
                >
                  {layer.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                </Button>
                <span className="text-sm flex-1">{layer.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Properties Panel */}
        {selectedObject && (
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Properties</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="opacity">Opacity</Label>
                <Slider
                  id="opacity"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[selectedObject.opacity || 1]}
                  onValueChange={([value]) => {
                    selectedObject.set('opacity', value);
                    fabricCanvas?.renderAll();
                  }}
                  className="mt-2"
                />
              </div>
              
              {selectedObject.type === 'textbox' && (
                <div>
                  <Label htmlFor="fontSize">Font Size</Label>
                  <Input
                    id="fontSize"
                    type="number"
                    value={selectedObject.fontSize || 24}
                    onChange={(e) => {
                      selectedObject.set('fontSize', parseInt(e.target.value));
                      fabricCanvas?.renderAll();
                    }}
                    className="mt-2"
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="fill">Fill Color</Label>
                <Input
                  id="fill"
                  type="color"
                  value={selectedObject.fill || '#000000'}
                  onChange={(e) => {
                    selectedObject.set('fill', e.target.value);
                    fabricCanvas?.renderAll();
                  }}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
