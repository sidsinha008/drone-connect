
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from "@/lib/utils";

interface Step2Props {
  onNext: (data: any) => void;
  onBack: () => void;
  missionData: any;
}

const missionTypes = [
  { id: '3D Infrastructure Model', title: '3D Infrastructure Model', description: 'Create a detailed 3D digital twin of all stadium structures.'},
  { id: 'High-Res Topographic Survey', title: 'High-Res Topographic Survey', description: 'Generate precise ground elevation maps and contour lines.' },
  { id: 'Land Boundary Verification', title: 'Land Boundary Verification', description: 'Capture data for highly accurate property line confirmation.' },
  { id: 'Specific Asset Inspection', title: 'Specific Asset Inspection', description: 'Focused, very high-detail capture of specific assets.' },
];

export const Step2DefineMission = ({ onNext, onBack, missionData }: Step2Props) => {
    const [missionArea, setMissionArea] = useState('Full Stadium Complex');
    const [missionType, setMissionType] = useState('');

    const handleNext = () => {
        if(missionArea && missionType) {
            onNext({missionArea, missionType});
        }
    }
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Define Mission Area at {missionData.stadium}</CardTitle>
                        <CardDescription>Draw a polygon on the map or use a preset to define your mission area.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-muted aspect-video w-full rounded-md flex items-center justify-center mb-4">
                            <p className="text-muted-foreground">Interactive Map of {missionData.stadium}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant={missionArea === 'Full Stadium Complex' ? 'default' : 'outline'} onClick={() => setMissionArea('Full Stadium Complex')}>Full Stadium Complex</Button>
                            <Button variant={missionArea === 'Pitch Only' ? 'default' : 'outline'} onClick={() => setMissionArea('Pitch Only')}>Pitch Only</Button>
                            <Button variant={missionArea === 'Anna Pavilion Stand' ? 'default' : 'outline'} onClick={() => setMissionArea('Anna Pavilion Stand')}>Anna Pavilion Stand</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Mission Type</CardTitle>
                        <CardDescription>What type of data do you need?</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            {missionTypes.map((type) => (
                                <div key={type.id} onClick={() => setMissionType(type.id)} className={cn("p-4 border rounded-md cursor-pointer hover:border-primary", missionType === type.id && "border-primary bg-muted")}>
                                    <Label className="font-bold cursor-pointer">{type.title}</Label>
                                    <p className="text-sm text-muted-foreground cursor-pointer">{type.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-2 pt-4">
                             <Label>Input for Existing Legal Boundaries (Optional)</Label>
                             <Button variant="outline" className="w-full">Upload legal land records (DXF, KML)</Button>
                        </div>

                         <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={onBack}>Back</Button>
                            <Button onClick={handleNext} disabled={!missionArea || !missionType}>Next: Plan Flight Path</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
