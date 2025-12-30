
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  Plane, 
  Users, 
  Cloud, 
  Target, 
  Settings, 
  RotateCcw
} from "lucide-react";

const SimulationConfiguration = () => {
  const [swarmSize, setSwarmSize] = useState([20]);
  const [maxSpeed, setMaxSpeed] = useState([15]);
  const [communicationRange, setCommunicationRange] = useState([100]);
  const [batteryLife, setBatteryLife] = useState([30]);
  const [collisionAvoidance, setCollisionAvoidance] = useState(true);
  const [formation, setFormation] = useState("random");
  const [environment, setEnvironment] = useState("open");
  const [weatherConditions, setWeatherConditions] = useState("clear");

  const resetToDefaults = () => {
    setSwarmSize([20]);
    setMaxSpeed([15]);
    setCommunicationRange([100]);
    setBatteryLife([30]);
    setCollisionAvoidance(true);
    setFormation("random");
    setEnvironment("open");
    setWeatherConditions("clear");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Simulation Configuration</h2>
        <Button onClick={resetToDefaults} variant="outline" className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset to Defaults
        </Button>
      </div>

      <Tabs defaultValue="individual" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="individual" className="flex items-center gap-2">
            <Plane className="w-4 h-4" />
            Individual Drones
          </TabsTrigger>
          <TabsTrigger value="swarm" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Swarm Parameters
          </TabsTrigger>
          <TabsTrigger value="environment" className="flex items-center gap-2">
            <Cloud className="w-4 h-4" />
            Environment
          </TabsTrigger>
          <TabsTrigger value="mission" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Mission/Scenario
          </TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Individual Drone Parameters</CardTitle>
              <CardDescription>
                Configure the physical and performance characteristics of individual drones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="drone-type">Drone Type</Label>
                    <Select defaultValue="quadcopter">
                      <SelectTrigger>
                        <SelectValue placeholder="Select drone type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quadcopter">Quadcopter</SelectItem>
                        <SelectItem value="hexacopter">Hexacopter</SelectItem>
                        <SelectItem value="fixed-wing">Fixed Wing</SelectItem>
                        <SelectItem value="hybrid">Hybrid VTOL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Max Speed: {maxSpeed[0]} m/s</Label>
                    <Slider
                      value={maxSpeed}
                      onValueChange={setMaxSpeed}
                      max={30}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Battery Life: {batteryLife[0]} minutes</Label>
                    <Slider
                      value={batteryLife}
                      onValueChange={setBatteryLife}
                      max={120}
                      min={5}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="payload-weight">Payload Weight (kg)</Label>
                    <Input id="payload-weight" type="number" defaultValue="0.5" step="0.1" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="sensor-range">Sensor Range (m)</Label>
                    <Input id="sensor-range" type="number" defaultValue="50" />
                  </div>

                  <div>
                    <Label>Communication Range: {communicationRange[0]} m</Label>
                    <Slider
                      value={communicationRange}
                      onValueChange={setCommunicationRange}
                      max={500}
                      min={10}
                      step={10}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="collision-avoidance" 
                      checked={collisionAvoidance}
                      onCheckedChange={setCollisionAvoidance}
                    />
                    <Label htmlFor="collision-avoidance">Collision Avoidance</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="gps-enabled" defaultChecked />
                    <Label htmlFor="gps-enabled">GPS Enabled</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="swarm" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Swarm-Level Parameters</CardTitle>
              <CardDescription>
                Configure swarm behavior, formation, and coordination settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Swarm Size: {swarmSize[0]} drones</Label>
                    <Slider
                      value={swarmSize}
                      onValueChange={setSwarmSize}
                      max={100}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="formation-type">Formation Type</Label>
                    <Select value={formation} onValueChange={setFormation}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="random">Random</SelectItem>
                        <SelectItem value="line">Line Formation</SelectItem>
                        <SelectItem value="v-shape">V-Shape</SelectItem>
                        <SelectItem value="circle">Circle</SelectItem>
                        <SelectItem value="grid">Grid</SelectItem>
                        <SelectItem value="sphere">Sphere</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="separation-distance">Minimum Separation (m)</Label>
                    <Input id="separation-distance" type="number" defaultValue="3" step="0.5" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="coordination-algorithm">Coordination Algorithm</Label>
                    <Select defaultValue="reynolds">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reynolds">Reynolds Flocking</SelectItem>
                        <SelectItem value="pso">Particle Swarm Optimization</SelectItem>
                        <SelectItem value="consensus">Consensus-based</SelectItem>
                        <SelectItem value="leader-follower">Leader-Follower</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="dynamic-formation" defaultChecked />
                    <Label htmlFor="dynamic-formation">Dynamic Formation</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="fault-tolerance" defaultChecked />
                    <Label htmlFor="fault-tolerance">Fault Tolerance</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Parameters</CardTitle>
              <CardDescription>
                Configure the simulation environment and external conditions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="environment-type">Environment Type</Label>
                    <Select value={environment} onValueChange={setEnvironment}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open Field</SelectItem>
                        <SelectItem value="urban">Urban Environment</SelectItem>
                        <SelectItem value="forest">Forest</SelectItem>
                        <SelectItem value="indoor">Indoor Space</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="simulation-area">Simulation Area (m²)</Label>
                    <Input id="simulation-area" defaultValue="1000x1000" />
                  </div>

                  <div>
                    <Label htmlFor="altitude-range">Altitude Range (m)</Label>
                    <Input id="altitude-range" defaultValue="10-200" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="weather">Weather Conditions</Label>
                    <Select value={weatherConditions} onValueChange={setWeatherConditions}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clear">Clear</SelectItem>
                        <SelectItem value="windy">Windy</SelectItem>
                        <SelectItem value="rainy">Rainy</SelectItem>
                        <SelectItem value="foggy">Foggy</SelectItem>
                        <SelectItem value="stormy">Stormy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="wind-speed">Wind Speed (m/s)</Label>
                    <Input id="wind-speed" type="number" defaultValue="2" step="0.5" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="obstacles" defaultChecked />
                    <Label htmlFor="obstacles">Include Obstacles</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mission" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mission/Scenario Parameters</CardTitle>
              <CardDescription>
                Define the mission objectives and scenario settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mission-type">Mission Type</Label>
                  <Select defaultValue="patrol">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patrol">Area Patrol</SelectItem>
                      <SelectItem value="search-rescue">Search & Rescue</SelectItem>
                      <SelectItem value="surveillance">Surveillance</SelectItem>
                      <SelectItem value="delivery">Package Delivery</SelectItem>
                      <SelectItem value="mapping">Area Mapping</SelectItem>
                      <SelectItem value="formation-flight">Formation Flight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="mission-duration">Mission Duration (minutes)</Label>
                  <Input id="mission-duration" type="number" defaultValue="15" />
                </div>

                <div>
                  <Label htmlFor="target-coordinates">Target Coordinates</Label>
                  <Input id="target-coordinates" defaultValue="0,0,50" placeholder="x,y,z" />
                </div>

                <div>
                  <Label htmlFor="mission-description">Mission Description</Label>
                  <Textarea 
                    id="mission-description" 
                    placeholder="Describe the mission objectives and requirements..."
                    className="min-h-[100px]"
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Advanced Scenario Settings</h4>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="dynamic-targets" />
                    <Label htmlFor="dynamic-targets">Dynamic Target Movement</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="communication-failures" />
                    <Label htmlFor="communication-failures">Simulate Communication Failures</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="emergency-scenarios" />
                    <Label htmlFor="emergency-scenarios">Include Emergency Scenarios</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulationConfiguration;
