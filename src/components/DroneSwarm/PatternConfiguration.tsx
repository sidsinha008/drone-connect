
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload, 
  Image, 
  Code, 
  Eye, 
  RotateCcw,
  Download,
  Save,
  Grid3X3,
  Rotate3D,
  Palette
} from "lucide-react";

const PatternConfiguration = () => {
  const [selectedTab, setSelectedTab] = useState("image");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [patternSettings, setPatternSettings] = useState({
    threshold: [128],
    scale: [100],
    rotation: [0],
    density: [50],
    height: [20]
  });

  const predefinedPatterns = [
    { id: "helix", name: "Helix Formation", description: "Spiral ascending pattern" },
    { id: "sphere", name: "Sphere", description: "3D spherical formation" },
    { id: "cube", name: "Cube", description: "Cubic grid formation" },
    { id: "wave", name: "Dynamic Wave", description: "Sinusoidal wave motion" },
    { id: "logo", name: "Company Logo", description: "Custom logo formation" }
  ];

  const sampleJsonPattern = `{
  "pattern": {
    "name": "Dynamic Helix",
    "type": "3d_formation",
    "drones": 20,
    "coordinates": [
      {
        "drone_id": 1,
        "path": [
          {"x": 0, "y": 0, "z": 0, "time": 0},
          {"x": 10, "y": 5, "z": 2, "time": 5},
          {"x": 0, "y": 10, "z": 4, "time": 10}
        ]
      }
    ],
    "parameters": {
      "speed": 2.5,
      "formation_tightness": 0.8,
      "communication_range": 50
    }
  }
}`;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageFile(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Advanced Pattern Configuration</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Pattern
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Config
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="image" className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            Image Pattern
          </TabsTrigger>
          <TabsTrigger value="json" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            JSON Template
          </TabsTrigger>
          <TabsTrigger value="predefined" className="flex items-center gap-2">
            <Grid3X3 className="w-4 h-4" />
            Predefined Patterns
          </TabsTrigger>
        </TabsList>

        <TabsContent value="image" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Image Upload
                </CardTitle>
                <CardDescription>
                  Upload a 2D image (JPEG/PNG) for the swarm to form or trace
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {imageFile ? (
                    <div className="space-y-4">
                      <img src={imageFile} alt="Uploaded pattern" className="max-w-full max-h-48 mx-auto rounded" />
                      <div className="flex gap-2 justify-center">
                        <Button variant="outline" onClick={() => setImageFile(null)}>
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Replace
                        </Button>
                        <Button>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview Formation
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-600 mb-4">Drop image here or click to upload</p>
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Label htmlFor="image-upload">
                        <Button variant="outline" className="cursor-pointer">Browse Files</Button>
                      </Label>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Pattern Interpretation</Label>
                    <Select defaultValue="threshold">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="threshold">Light/Dark Threshold</SelectItem>
                        <SelectItem value="edge">Edge Detection</SelectItem>
                        <SelectItem value="outline">Outline Tracing</SelectItem>
                        <SelectItem value="fill">Area Fill</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Threshold: {patternSettings.threshold[0]}</Label>
                    <Slider
                      value={patternSettings.threshold}
                      onValueChange={(value) => setPatternSettings({...patternSettings, threshold: value})}
                      max={255}
                      min={0}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rotate3D className="w-5 h-5" />
                  Pattern Settings
                </CardTitle>
                <CardDescription>
                  Configure how the image translates to drone positions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Scale: {patternSettings.scale[0]}%</Label>
                  <Slider
                    value={patternSettings.scale}
                    onValueChange={(value) => setPatternSettings({...patternSettings, scale: value})}
                    max={500}
                    min={10}
                    step={5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Rotation: {patternSettings.rotation[0]}°</Label>
                  <Slider
                    value={patternSettings.rotation}
                    onValueChange={(value) => setPatternSettings({...patternSettings, rotation: value})}
                    max={360}
                    min={0}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Drone Density: {patternSettings.density[0]}%</Label>
                  <Slider
                    value={patternSettings.density}
                    onValueChange={(value) => setPatternSettings({...patternSettings, density: value})}
                    max={100}
                    min={10}
                    step={5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Formation Height: {patternSettings.height[0]}m</Label>
                  <Slider
                    value={patternSettings.height}
                    onValueChange={(value) => setPatternSettings({...patternSettings, height: value})}
                    max={100}
                    min={5}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="maintain-aspect" defaultChecked />
                  <Label htmlFor="maintain-aspect">Maintain Aspect Ratio</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="3d-extrusion" />
                  <Label htmlFor="3d-extrusion">3D Extrusion</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="json" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  JSON Pattern Editor
                </CardTitle>
                <CardDescription>
                  Define complex 3D patterns and choreographed movements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Pattern Definition</Label>
                  <Textarea
                    value={sampleJsonPattern}
                    className="font-mono text-sm min-h-[300px]"
                    placeholder="Enter JSON pattern definition..."
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload JSON
                  </Button>
                  <Button variant="outline">Validate</Button>
                  <Button>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Pattern
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>JSON Schema Reference</CardTitle>
                <CardDescription>
                  Structure and available parameters for pattern definitions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm space-y-2">
                  <h4 className="font-medium">Required Fields:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li><code>pattern.name</code> - Pattern identifier</li>
                    <li><code>pattern.type</code> - Formation type</li>
                    <li><code>pattern.drones</code> - Number of drones</li>
                    <li><code>coordinates</code> - Position/path arrays</li>
                  </ul>
                  
                  <h4 className="font-medium mt-4">Optional Parameters:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li><code>speed</code> - Movement speed (m/s)</li>
                    <li><code>formation_tightness</code> - Cohesion factor</li>
                    <li><code>communication_range</code> - Range in meters</li>
                    <li><code>timing</code> - Synchronized movements</li>
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Template Library</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Load Helix Template
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Load Formation Template
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Load Choreography Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predefined" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {predefinedPatterns.map((pattern) => (
              <Card key={pattern.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{pattern.name}</CardTitle>
                  <CardDescription>{pattern.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline">
                      Load
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pattern Customization</CardTitle>
              <CardDescription>
                Modify the selected predefined pattern
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="pattern-size">Pattern Size</Label>
                  <Input id="pattern-size" type="number" defaultValue="50" />
                </div>
                <div>
                  <Label htmlFor="drone-count">Drone Count</Label>
                  <Input id="drone-count" type="number" defaultValue="20" />
                </div>
                <div>
                  <Label htmlFor="animation-speed">Animation Speed</Label>
                  <Input id="animation-speed" type="number" defaultValue="1.0" step="0.1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatternConfiguration;
