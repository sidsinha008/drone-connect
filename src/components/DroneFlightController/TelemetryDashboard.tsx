
import { Battery, Navigation, Wifi, Thermometer, Clock, MapPin, Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TelemetryData {
  altitude: number;
  speed: number;
  battery: number;
  gpsSignal: number;
  distance: number;
  flightTime: string;
  signalStrength: number;
  temperature: number;
}

interface TelemetryDashboardProps {
  data: TelemetryData;
}

const TelemetryDashboard = ({ data }: TelemetryDashboardProps) => {
  const getBatteryColor = (percentage: number) => {
    if (percentage > 50) return "text-green-400";
    if (percentage > 25) return "text-yellow-400";
    return "text-red-400";
  };

  const getSignalColor = (strength: number) => {
    if (strength > 75) return "text-green-400";
    if (strength > 50) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <Card className="bg-slate-800 border-slate-600">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <Gauge className="h-5 w-5" />
          Live Telemetry
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Primary Flight Data */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{data.altitude}m</div>
            <div className="text-xs text-slate-400">Altitude AGL</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{data.speed}m/s</div>
            <div className="text-xs text-slate-400">Ground Speed</div>
          </div>
        </div>

        {/* Battery Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Battery className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-300">Battery</span>
            </div>
            <span className={`text-sm font-bold ${getBatteryColor(data.battery)}`}>
              {data.battery}%
            </span>
          </div>
          <Progress 
            value={data.battery} 
            className="h-2"
          />
          <div className="text-xs text-slate-400 text-center">
            Est. Flight Time: ~{Math.floor((data.battery / 100) * 25)} min
          </div>
        </div>

        {/* Signal Strength */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-300">Signal</span>
            </div>
            <span className={`text-sm font-bold ${getSignalColor(data.signalStrength)}`}>
              {data.signalStrength}%
            </span>
          </div>
          <Progress 
            value={data.signalStrength} 
            className="h-2"
          />
        </div>

        {/* Additional Telemetry */}
        <div className="space-y-3 pt-2 border-t border-slate-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-300">GPS Satellites</span>
            </div>
            <span className="text-sm text-white font-mono">{data.gpsSignal}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-300">Distance</span>
            </div>
            <span className="text-sm text-white font-mono">{data.distance}m</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-300">Flight Time</span>
            </div>
            <span className="text-sm text-white font-mono">{data.flightTime}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-300">Temperature</span>
            </div>
            <span className="text-sm text-white font-mono">{data.temperature}°C</span>
          </div>
        </div>

        {/* System Status */}
        <div className="pt-2 border-t border-slate-600">
          <div className="text-xs text-slate-400 mb-2">System Status</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-slate-300">IMU</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-slate-300">GPS</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-slate-300">Compass</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-xs text-slate-300">Vision</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TelemetryDashboard;
