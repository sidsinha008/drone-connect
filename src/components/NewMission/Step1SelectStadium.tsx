
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Step1Props {
  onNext: (data: any) => void;
  onCancel: () => void;
}

export const Step1SelectStadium = ({ onNext, onCancel }: Step1Props) => {
    const [stadium, setStadium] = useState('');

    const handleNext = () => {
        if(stadium){
            onNext({ stadium });
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Select Stadium / Site</CardTitle>
                        <CardDescription>Choose a pre-configured stadium or draw a new site on the map.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Input placeholder="Search for location or stadium... (e.g. Chepauk)" className="mb-4" />
                        <div className="bg-muted aspect-video w-full rounded-md flex items-center justify-center">
                            <p className="text-muted-foreground">Interactive Map of Chennai</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Selection Panel</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Select Existing Stadium</Label>
                            <Select onValueChange={setStadium} value={stadium}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a stadium" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MA Chidambaram Stadium (Chepauk)">MA Chidambaram Stadium (Chepauk)</SelectItem>
                                    <SelectItem value="Jawaharlal Nehru Stadium">Jawaharlal Nehru Stadium</SelectItem>
                                    <SelectItem value="MGR Race Course Stadium">MGR Race Course Stadium</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {stadium && (
                            <div className="space-y-4 animate-fade-in">
                                <img src="https://images.unsplash.com/photo-1579952516518-64904a135679?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Stadium Preview" className="rounded-md object-cover" />
                                <div>
                                    <h4 className="font-semibold">Site Information</h4>
                                    <p className="text-sm text-muted-foreground">Address: Wallajah Road, Chepauk, Chennai</p>
                                    <p className="text-sm text-muted-foreground">Last Mapped: June 2024</p>
                                </div>
                            </div>
                        )}
                         <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={onCancel}>Cancel</Button>
                            <Button onClick={handleNext} disabled={!stadium}>Next: Define Mission</Button>
                        </div>
                    </CardContent>
                </Card>
                 <Button variant="outline" className="w-full mt-4">Draw New Site</Button>
            </div>
        </div>
    );
};
