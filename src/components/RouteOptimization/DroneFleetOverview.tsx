
/**
 * Drone Fleet Overview: Table of all drones, filter/search, show key specs and states.
 * Placeholder with sample data.
 */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MOCK_DRONES = [
  { id: "DR-001", model: "X Pro", battery: "91%", status: "online", health: "Good", lastSeen: "Docking@OMR" },
  { id: "DR-002", model: "Y Cargo", battery: "78%", status: "charging", health: "OK", lastSeen: "OMR Dock" },
  { id: "DR-003", model: "X Pro LongRange", battery: "12%", status: "offline", health: "ATTN", lastSeen: "Lost comms" },
  { id: "DR-004", model: "Testbench Mini", battery: "100%", status: "maintenance", health: "OK", lastSeen: "Chennai Hangar" },
];

const DroneFleetOverview = () => {
  const [search, setSearch] = useState("");

  const filtered = search
    ? MOCK_DRONES.filter(
        d =>
          d.id.toLowerCase().includes(search.toLowerCase()) ||
          d.model.toLowerCase().includes(search.toLowerCase())
      )
    : MOCK_DRONES;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">Drone Fleet Overview</h2>
      <input
        type="text"
        placeholder="Search drone ID/model..."
        className="mb-4 px-4 py-2 border rounded shadow-sm min-w-[290px]"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Registered Drones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="px-2 py-1">ID</th>
                  <th>Model</th>
                  <th>Status</th>
                  <th>Battery</th>
                  <th>Health</th>
                  <th>Last Seen</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(d => (
                  <tr key={d.id} className="border-b">
                    <td className="px-2 py-1">{d.id}</td>
                    <td>{d.model}</td>
                    <td>
                      <Badge
                        className={
                          d.status === "online"
                            ? "bg-green-500 text-white"
                            : d.status === "charging"
                            ? "bg-blue-500 text-white"
                            : d.status === "offline"
                            ? "bg-red-500 text-white"
                            : ""
                        }
                      >
                        {d.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td>{d.battery}</td>
                    <td>
                      <Badge
                        className={
                          d.health === "Good"
                            ? "bg-green-300 text-black"
                            : d.health === "ATTN"
                            ? "bg-orange-400 text-black"
                            : ""
                        }
                      >
                        {d.health}
                      </Badge>
                    </td>
                    <td>{d.lastSeen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      {/* TODO: Add filter by variant, location, health, status. Support more columns or export. */}
    </div>
  );
};

export default DroneFleetOverview;
