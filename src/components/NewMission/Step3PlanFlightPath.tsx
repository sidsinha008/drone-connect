
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface Step3Props {
  onNext: (data: any) => void;
  onBack: () => void;
  missionData: any;
}

export const Step3PlanFlightPath = ({ onNext, onBack, missionData }: Step3Props) => {
    const [altitude, setAltitude] = useState([60]);
    const [frontOverlap, setFrontOverlap] = useState([85]);
    const [sideOverlap, setSideOverlap] = useState([75]);

    const handleNext = () => {
        onNext({ flightParams: { altitude: altitude[0], frontOverlap: frontOverlap[0], sideOverlap: sideOverlap[0] } });
    }

    const gsd = (2.5 * (altitude[0] / 100)).toFixed(2);

    return (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Plan Flight Path</CardTitle>
                        <CardDescription>AI-assisted flight planning for optimal data capture at {missionData.stadium}.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="bg-muted aspect-video w-full rounded-md flex items-center justify-center">
                            <p className="text-muted-foreground">Map with Generated Flight Path Overlay</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Flight Parameters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Label htmlFor="altitude">Altitude: {altitude[0]}m</Label>
                            <Slider id="altitude" value={altitude} onValueChange={setAltitude} max={120} min={30} step={1} />
                            <p className="text-sm text-muted-foreground font-bold">Estimated GSD: {gsd} cm/pixel</p>
                        </div>
                        <div>
                            <Label htmlFor="front-overlap">Front Overlap: {frontOverlap[0]}%</Label>
                            <Slider id="front-overlap" value={frontOverlap} onValueChange={setFrontOverlap} max={95} min={60} step={1} />
                        </div>
                        <div>
                            <Label htmlFor="side-overlap">Side Overlap: {sideOverlap[0]}%</Label>
                            <Slider id="side-overlap" value={sideOverlap} onValueChange={setSideOverlap} max={95} min={60} step={1} />
                        </div>
                        
                        <div className="space-y-2 border-t pt-4">
                            <h4 className="font-semibold">Expected Accuracy</h4>
                            <p className="font-bold">Predicted XY Accuracy: +/- 2 cm</p>
                            <p className="font-bold">Predicted Z Accuracy: +/- 3 cm</p>
                        </div>

                         <div className="space-y-2 border-t pt-4">
                            <h4 className="font-semibold">Estimated Mission Summary</h4>
                            <p>Flight Duration: <strong>45 min</strong></p>
                            <p>Battery Cycles: <strong>2</strong></p>
                            <p>Image Count: <strong>1,800</strong></p>
                            <p>Data Volume: <strong>25 GB</strong></p>
                        </div>
                        
                        <div className="space-y-2 border-t pt-4">
                             <h4 className="font-semibold">Compliance & Warnings</h4>
                             <div className="flex items-center gap-2 text-green-600"><CheckCircle size={16} /> Airspace Status: Clear</div>
                             <div className="flex items-center gap-2 text-orange-600"><AlertTriangle size={16} /> Remember to notify local authorities.</div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={onBack}>Back</Button>
                            <Button onClick={handleNext}>Next: Review & Launch</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
