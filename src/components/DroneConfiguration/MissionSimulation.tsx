
import { useState } from "react";
import { MapPin, Play, RotateCcw, Save, Wind, Thermometer, Zap, Timer, Battery, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface MissionSimulationProps {
  droneData: any;
  onSettingsChange: () => void;
}

interface SimulationResult {
  flightTime: number;
  batteryConsumption: number;
  remainingBattery: number;
  roundTripBattery: number;
  canCarryPayload: boolean;
  warnings: string[];
}

export const MissionSimulation = ({ droneData, onSettingsChange }: MissionSimulationProps) => {
  const [sourceLocation, setSourceLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [payloadWeight, setPayloadWeight] = useState([1.5]);
  const [windSpeed, setWindSpeed] = useState([10]);
  const [temperature, setTemperature] = useState([20]);
  const [flightSpeed, setFlightSpeed] = useState([15]);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [savedScenarios, setSavedScenarios] = useState<string[]>([]);

  const payloadPresets = [
    { name: "Light Package", weight: 0.5, description: "Documents, small items" },
    { name: "Standard Package", weight: 1.5, description: "Electronics, books" },
    { name: "Heavy Package", weight: 3.0, description: "Large items, food delivery" },
    { name: "Max Capacity", weight: 5.0, description: "Maximum payload" }
  ];

  const weatherPresets = [
    { name: "Calm", wind: 5, temp: 20, description: "Ideal conditions" },
    { name: "Breezy", wind: 15, temp: 18, description: "Light wind" },
    { name: "Windy", wind: 25, temp: 15, description: "Strong wind" },
    { name: "Hot", wind: 8, temp: 35, description: "High temperature" }
  ];

  const runSimulation = async () => {
    if (!sourceLocation || !destinationLocation) return;
    
    setIsSimulating(true);
    onSettingsChange();

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock simulation calculation
    const distance = Math.random() * 10 + 2; // 2-12 km
    const baseFlightTime = (distance / flightSpeed[0]) * 60; // minutes
    const windFactor = 1 + (windSpeed[0] - 10) / 100;
    const tempFactor = 1 + Math.abs(temperature[0] - 20) / 200;
    const payloadFactor = 1 + payloadWeight[0] / 10;
    
    const adjustedFlightTime = baseFlightTime * windFactor * tempFactor * payloadFactor;
    const batteryConsumption = Math.min(95, adjustedFlightTime * 1.2 + payloadWeight[0] * 2);
    const remainingBattery = Math.max(5, 100 - batteryConsumption);
    const roundTripBattery = Math.max(0, remainingBattery - batteryConsumption);
    
    const warnings = [];
    if (batteryConsumption > 80) warnings.push("High battery consumption - consider lighter payload");
    if (payloadWeight[0] > 4) warnings.push("Payload approaching maximum capacity");
    if (windSpeed[0] > 20) warnings.push("Strong winds may affect flight stability");
    if (roundTripBattery < 20) warnings.push("Insufficient battery for round trip");

    const result: SimulationResult = {
      flightTime: adjustedFlightTime,
      batteryConsumption,
      remainingBattery,
      roundTripBattery,
      canCarryPayload: payloadWeight[0] <= 5 && batteryConsumption <= 90,
      warnings
    };

    setSimulationResult(result);
    setIsSimulating(false);
  };

  const saveScenario = () => {
    const scenarioName = `${sourceLocation} → ${destinationLocation} (${payloadWeight[0]}kg)`;
    setSavedScenarios([...savedScenarios, scenarioName]);
    onSettingsChange();
  };

  return (
    <div className="space-y-6">
      {/* Simulation Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Mission Setup
          </CardTitle>
          <CardDescription>
            Define your delivery mission parameters for simulation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source">Source Location</Label>
              <Input
                id="source"
                placeholder="Enter pickup location or coordinates"
                value={sourceLocation}
                onChange={(e) => setSourceLocation(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination Location</Label>
              <Input
                id="destination"
                placeholder="Enter delivery location or coordinates"
                value={destinationLocation}
                onChange={(e) => setDestinationLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Payload Weight: {payloadWeight[0]} kg</Label>
              <Slider
                value={payloadWeight}
                onValueChange={(value) => {
                  setPayloadWeight(value);
                  onSettingsChange();
                }}
                max={5}
                min={0.1}
                step={0.1}
                className="w-full"
              />
              <div className="flex gap-2 flex-wrap">
                {payloadPresets.map((preset) => (
                  <Button
                    key={preset.name}
                    size="sm"
                    variant="outline"
                    onClick={() => setPayloadWeight([preset.weight])}
                    className="text-xs"
                  >
                    {preset.name} ({preset.weight}kg)
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <Wind className="h-4 w-4" />
                  Wind Speed: {windSpeed[0]} km/h
                </Label>
                <Slider
                  value={windSpeed}
                  onValueChange={(value) => {
                    setWindSpeed(value);
                    onSettingsChange();
                  }}
                  max={40}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <Thermometer className="h-4 w-4" />
                  Temperature: {temperature[0]}°C
                </Label>
                <Slider
                  value={temperature}
                  onValueChange={(value) => {
                    setTemperature(value);
                    onSettingsChange();
                  }}
                  max={45}
                  min={-10}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  Flight Speed: {flightSpeed[0]} m/s
                </Label>
                <Slider
                  value={flightSpeed}
                  onValueChange={(value) => {
                    setFlightSpeed(value);
                    onSettingsChange();
                  }}
                  max={25}
                  min={5}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Weather Presets</Label>
              <div className="flex gap-2 flex-wrap">
                {weatherPresets.map((preset) => (
                  <Button
                    key={preset.name}
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setWindSpeed([preset.wind]);
                      setTemperature([preset.temp]);
                    }}
                    className="text-xs"
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={runSimulation}
              disabled={!sourceLocation || !destinationLocation || isSimulating}
              className="flex-1"
            >
              <Play className="h-4 w-4 mr-2" />
              {isSimulating ? "Running Simulation..." : "Run Simulation"}
            </Button>
            <Button variant="outline" onClick={() => setSimulationResult(null)}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Simulation Progress */}
      {isSimulating && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Simulating mission...</span>
                <span className="text-sm text-muted-foreground">Calculating optimal route</span>
              </div>
              <Progress value={65} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Simulation Results */}
      {simulationResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5" />
              Simulation Results
            </CardTitle>
            <CardDescription>
              Mission performance analysis for {droneData.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <Timer className="h-4 w-4" />
                  <span className="text-sm">Flight Time</span>
                </div>
                <div className="text-2xl font-bold">
                  {Math.round(simulationResult.flightTime)} min
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <Battery className="h-4 w-4" />
                  <span className="text-sm">Battery Used</span>
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(simulationResult.batteryConsumption)}%
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <Battery className="h-4 w-4" />
                  <span className="text-sm">Remaining</span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(simulationResult.remainingBattery)}%
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <Battery className="h-4 w-4" />
                  <span className="text-sm">Round Trip</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(simulationResult.roundTripBattery)}%
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Mission Feasibility</Label>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={simulationResult.canCarryPayload ? "default" : "destructive"}
                  className="flex items-center gap-1"
                >
                  {simulationResult.canCarryPayload ? "✓ Feasible" : "✗ Not Feasible"}
                </Badge>
                {simulationResult.canCarryPayload && (
                  <Badge variant="outline" className="text-green-600">
                    Mission can be completed successfully
                  </Badge>
                )}
              </div>
            </div>

            {simulationResult.warnings.length > 0 && (
              <div className="space-y-2">
                <Label className="flex items-center gap-1 text-orange-600">
                  <AlertTriangle className="h-4 w-4" />
                  Warnings & Recommendations
                </Label>
                <div className="space-y-1">
                  {simulationResult.warnings.map((warning, index) => (
                    <div key={index} className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
                      {warning}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={saveScenario} variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Scenario
              </Button>
              <Button onClick={runSimulation} variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Re-run Simulation
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Saved Scenarios */}
      {savedScenarios.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Saved Scenarios</CardTitle>
            <CardDescription>
              Previously saved simulation scenarios for comparison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {savedScenarios.map((scenario, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">{scenario}</span>
                  <Button size="sm" variant="outline">
                    Load
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
