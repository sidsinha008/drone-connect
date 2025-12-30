
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilePlus, Folder } from "lucide-react";

const mockBatches = [
  { id: 'batch1', name: 'Chennai-North Depot Drones', count: 12, criteria: ['Model: X Pro', 'Location: Chennai-North'] },
  { id: 'batch2', name: 'Alpha Test Group', count: 5, criteria: ['Tag: alpha-test'] },
  { id: 'batch3', name: 'Outdated Firmware', count: 23, criteria: ['Firmware < v2.3.0', 'Dynamic'] },
];

const BatchManagement = () => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-center">
        <div>
          <CardTitle className="flex items-center gap-2"><Folder size={20} /> OTA Batches</CardTitle>
          <CardDescription>Manage drone groups for targeted updates.</CardDescription>
        </div>
        <Button size="sm"><FilePlus className="mr-2 h-4 w-4"/>Create Batch</Button>
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      {mockBatches.map(batch => (
        <div key={batch.id} className="p-3 border rounded-lg flex justify-between items-center">
          <div>
            <p className="font-semibold">{batch.name} <span className="text-muted-foreground font-normal">({batch.count} drones)</span></p>
            <div className="flex gap-1 mt-1">
              {batch.criteria.map(c => <Badge key={c} variant="secondary">{c}</Badge>)}
            </div>
          </div>
          <Button variant="outline" size="sm">View</Button>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default BatchManagement;
