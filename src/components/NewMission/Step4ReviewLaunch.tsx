
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Step4Props {
  onFinish: () => void;
  onBack: () => void;
  missionData: any;
}

export const Step4ReviewLaunch = ({ onFinish, onBack, missionData }: Step4Props) => {
    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Review & Launch</CardTitle>
                    <CardDescription>Final confirmation before generating the flight plan.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4 rounded-lg border p-4">
                        <h3 className="font-semibold text-lg">Mission Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div><strong>Mission Name:</strong> {missionData.stadium} Survey - {new Date().toLocaleDateString()}</div>
                            <div><strong>Stadium:</strong> {missionData.stadium}</div>
                            <div><strong>Mission Area:</strong> {missionData.missionArea}</div>
                            <div><strong>Mission Type:</strong> {missionData.missionType}</div>
                            <div><strong>Altitude:</strong> {missionData.flightParams.altitude}m</div>
                            <div><strong>Overlap:</strong> {missionData.flightParams.frontOverlap}% Front / {missionData.flightParams.sideOverlap}% Side</div>
                            <div><strong>Estimated GSD:</strong> {(2.5 * (missionData.flightParams.altitude / 100)).toFixed(2)} cm/pixel</div>
                            <div><strong>Expected Accuracy:</strong> XY: +/- 2cm, Z: +/- 3cm</div>
                        </div>
                    </div>
                     <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={onBack}>Back</Button>
                        <Button variant="secondary">Save as Draft</Button>
                        <Button onClick={onFinish}>Generate Flight Plan File</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
