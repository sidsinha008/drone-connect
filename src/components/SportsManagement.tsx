
import React, { useState } from "react";
import { ArrowLeft, Users, Building2, Package, Eye, TrendingUp, Star, DraftingCompass } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PersonalizedCricketTraining from "./PersonalizedCricketTraining";
import SmartStadiumOperations from "./SmartStadiumOperations";
import DroneEventLogistics from "./DroneEventLogistics";
import DroneCrowdManagement from "./DroneCrowdManagement";
import CricketPerformanceOptimization from "./CricketPerformanceOptimization";
import PrecisionLandMapping from "./PrecisionLandMapping";

interface SportsManagementProps {
  onBack: () => void;
}

const SportsManagement = ({ onBack }: SportsManagementProps) => {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const sportsApps = [
    {
      id: "personalized-training",
      title: "Personalized Cricket Training Regime",
      description: "AI-powered training plans with drone-captured performance analysis and IoT wearables integration",
      icon: Users,
      category: "Training & Performance",
      features: ["Performance Analytics", "Custom Training Plans", "Progress Tracking", "AI Recommendations"]
    },
    {
      id: "smart-stadium",
      title: "Smart Stadium Operations & Security",
      description: "AI-powered digital twin platform with predictive analytics and autonomous drone operations",
      icon: Building2,
      category: "Operations & Security", 
      features: ["3D Digital Twin", "Predictive Maintenance", "Security Surveillance", "Infrastructure Inspection"]
    },
    {
      id: "drone-event-logistics",
      title: "Drone-Enabled Event Logistics & Emergency Delivery",
      description: "Advanced central command hub for comprehensive drone logistics and critical emergency deliveries",
      icon: Package,
      category: "Advanced Logistics & Emergency",
      features: ["Admin Fleet Management", "Booking & Scheduling", "Emergency Command Center", "Real-time Mission Control", "Multi-Role Access"]
    },
    {
      id: "drone-crowd-management",
      title: "Drone System for Smart Crowd Management",
      description: "AI-powered crowd surveillance and flow optimization with intelligent drone network for real-time safety monitoring",
      icon: Eye,
      category: "Crowd Safety & Intelligence",
      features: ["Real-time Crowd Analysis", "Predictive Congestion Detection", "AI-Powered Interventions", "Multi-Drone Surveillance", "Emergency Response Coordination"]
    },
    {
      id: "cricket-performance-optimization",
      title: "Cricket Performance Optimization",
      description: "AI/ML-powered cricket analytics platform with drone-captured bird's-eye view data for advanced athlete training and performance optimization",
      icon: TrendingUp,
      category: "Performance Analytics & AI",
      features: ["Drone Footage Analysis", "AI Performance Insights", "Player Movement Analytics", "Tactical Formation Analysis", "Predictive Coaching"]
    },
    {
      id: "precision-land-mapping",
      title: "Precision Land Mapping & Property Management with Drones",
      description: "High-precision drone solutions for land surveying, boundary mapping, and property management in Chennai.",
      icon: DraftingCompass,
      category: "Land Survey & Management",
      features: ["Cadastral Surveys", "Topographic Mapping", "Property Line Verification", "Volume Calculation", "Encroachment Detection"]
    },
  ];

  const renderSelectedApp = () => {
    if (selectedApp === "personalized-training") {
      return <PersonalizedCricketTraining onBack={() => setSelectedApp(null)} />;
    }

    if (selectedApp === "smart-stadium") {
      return <SmartStadiumOperations onBack={() => setSelectedApp(null)} />;
    }

    if (selectedApp === "drone-event-logistics") {
      return <DroneEventLogistics onBack={() => setSelectedApp(null)} />;
    }

    if (selectedApp === "drone-crowd-management") {
      return <DroneCrowdManagement onBack={() => setSelectedApp(null)} />;
    }

    if (selectedApp === "cricket-performance-optimization") {
      return <CricketPerformanceOptimization onBack={() => setSelectedApp(null)} />;
    }

    if (selectedApp === "precision-land-mapping") {
        return <PrecisionLandMapping onBack={() => setSelectedApp(null)} />;
    }

    return null;
  };

  if (selectedApp) {
    return renderSelectedApp();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">GSIC - UAV Feature Applications</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Advanced drone-powered solutions for sports training, stadium operations, and event management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Star className="w-3 h-3 mr-1" />
            UAV Powered
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sportsApps.map((app) => (
          <Card key={app.id} className="hover:shadow-md transition-shadow cursor-pointer flex flex-col" onClick={() => setSelectedApp(app.id)}>
            <CardHeader className="flex-grow">
              <CardTitle className="flex items-center gap-2">
                {app.icon && <app.icon className="w-5 h-5" />}
                {app.title}
              </CardTitle>
              <CardDescription>{app.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{app.category}</Badge>
                {app.id === "drone-event-logistics" && (
                  <Badge className="bg-green-100 text-green-800">Enhanced</Badge>
                )}
                {["drone-crowd-management", "cricket-performance-optimization", "precision-land-mapping"].includes(app.id) && (
                  <Badge className="bg-purple-100 text-purple-800">New</Badge>
                )}
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                {app.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SportsManagement;
