
import { Zap, Loader2 } from "lucide-react";

const statusColors = {
  available: "bg-green-500",
  charging: "bg-blue-500",
  occupied: "bg-amber-400"
};

const chargingTypes = {
  "fast": <Zap size={14} className="inline-block mr-1" />,
  "slow": <Loader2 size={14} className="inline-block mr-1" />,
  "battery-swap": <span className="inline-block text-xs px-1 border rounded align-middle mr-1">Swap</span>
};

/**
 * Overlay: show all docking stations on the map.
 * @param dockingStations Array<{id, name, coords, status, chargingType, occupancy}>
 */
const DockingStationOverlay = ({ dockingStations }: { dockingStations: any[] }) => {
  // These would be placed "on the map" at real coordinates.
  return (
    <div className="absolute top-8 left-8 space-y-2 min-w-[200px] z-10">
      {dockingStations.map((dock) => (
        <div
          key={dock.id}
          className={`flex items-center gap-2 px-3 py-2 rounded shadow border bg-background hover:bg-muted transition group cursor-pointer`}
        >
          <span className={`w-3 h-3 rounded-full ${statusColors[dock.status]} inline-block`}/>
          <span className="font-semibold">{dock.name}</span>
          <span className="text-xs text-muted-foreground ml-auto">{chargingTypes[dock.chargingType]}{dock.chargingType.replace("-", " ")}</span>
          <span className="text-xs ml-2">🛩 x{dock.occupancy}</span>
        </div>
      ))}
    </div>
  );
};

export default DockingStationOverlay;
