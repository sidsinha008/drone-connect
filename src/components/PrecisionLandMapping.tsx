
import React, { useState } from "react";
import { ArrowLeft, Plus, Building2, Download, Eye, Bot, Sigma, AreaChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { NewMissionWizard } from "./NewMission/NewMissionWizard";

interface PrecisionLandMappingProps {
  onBack: () => void;
}

const PrecisionLandMapping = ({ onBack }: PrecisionLandMappingProps) => {
    const [isCreatingMission, setIsCreatingMission] = useState(false);

    if (isCreatingMission) {
        return <NewMissionWizard onBack={() => setIsCreatingMission(false)} />;
    }

    const projects = [
        {
            name: "Chepauk Modernization - Phase 1",
            stadium: "MA Chidambaram Stadium",
            lastUpdated: "2 days ago",
            status: "Ready for Review",
            thumbnail: "https://images.unsplash.com/photo-1579952516518-64904a135679?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            name: "Pre-Season Pitch Analysis",
            stadium: "MA Chidambaram Stadium",
            lastUpdated: "1 week ago",
            status: "Completed",
            thumbnail: "https://images.unsplash.com/photo-1594424390549-3a8a33379538?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            name: "Boundary Wall Verification",
            stadium: "Jawaharlal Nehru Stadium",
            lastUpdated: "3 weeks ago",
            status: "Data Collected",
            thumbnail: "https://images.unsplash.com/photo-1562071247-363c3d4ac97b?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }
    ];

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "Ready for Review": return "default";
            case "Completed": return "outline";
            case "Data Collected": return "secondary";
            default: return "secondary";
        }
    };

    const quickInsights = {
        totalArea: 75, // acres
        totalDefects: 42,
        avgAccuracy: 2.5, // cm
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" onClick={onBack}>
                            <ArrowLeft />
                            Back
                        </Button>
                        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                            <Building2 className="text-primary" size={32} />
                            Stadium Digital Twin Hub
                        </h1>
                    </div>
                    <p className="text-muted-foreground mt-2">
                        Manage, map, and analyze infrastructure of large sports stadiums.
                    </p>
                </div>
                <Button onClick={() => setIsCreatingMission(true)}>
                    <Plus />
                    New Mission
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
                <div className="lg:col-span-3 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Stadium Projects</CardTitle>
                            <CardDescription>
                                Overview of all ongoing and completed stadium infrastructure projects.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2">
                            {projects.map((project, index) => (
                                <Card key={index} className="hover:shadow-lg transition-shadow flex flex-col">
                                    <CardHeader>
                                        <div className="w-full mb-4">
                                            <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
                                                <img
                                                    src={project.thumbnail}
                                                    alt={project.name}
                                                    className="object-cover w-full h-full rounded-md"
                                                />
                                            </AspectRatio>
                                        </div>
                                        <CardTitle>{project.name}</CardTitle>
                                        <CardDescription className="flex items-center gap-1 pt-1"><Building2 className="w-4 h-4"/> {project.stadium}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3 mt-auto">
                                        <div className="flex justify-between items-center text-sm">
                                            <span>Status:</span>
                                            <Badge variant={getStatusVariant(project.status) as "default" | "secondary" | "outline" | "destructive" | null | undefined}>{project.status}</Badge>
                                        </div>
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <span>Last Updated:</span>
                                            <span className="font-medium">{project.lastUpdated}</span>
                                        </div>
                                        <div className="pt-4 flex gap-2">
                                            <Button variant="outline" size="sm" className="w-full">
                                                <Eye />
                                                View Digital Twin
                                            </Button>
                                            <Button variant="secondary" size="sm" className="w-full">
                                                <Download />
                                                Report
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Insights</CardTitle>
                            <CardDescription>AI-driven platform metrics.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg border">
                                <div className="flex items-center gap-3">
                                    <AreaChart className="w-5 h-5 text-primary" />
                                    <span className="text-sm font-medium">Total Area Mapped</span>
                                </div>
                                <span className="font-bold">{quickInsights.totalArea} acres</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg border">
                                <div className="flex items-center gap-3">
                                    <Bot className="w-5 h-5 text-primary" />
                                    <span className="text-sm font-medium">Total Defects Detected</span>
                                </div>
                                <span className="font-bold">{quickInsights.totalDefects}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg border">
                                <div className="flex items-center gap-3">
                                    <Sigma className="w-5 h-5 text-primary" />
                                    <span className="text-sm font-medium">Avg. Data Accuracy</span>
                                </div>
                                <span className="font-bold">+/- {quickInsights.avgAccuracy} cm</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default PrecisionLandMapping;
