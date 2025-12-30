import { useState } from "react";
import { Link } from "react-router-dom";
import { Package, Truck, Plane, BarChart3, Settings, Monitor, Zap, CreditCard, Users, Battery, MapPin, Smartphone, Gamepad2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import DroneConfiguration from "./DroneConfiguration";
import IntelligentSwarmMission from "./IntelligentSwarmMission";
import ChargingInfrastructure from "./ChargingInfrastructure";
import VertiportVertiHub from "./VertiportVertiHub";
import AirTaxiBooking from "./AirTaxiBooking";
import DroneFlightController from "./DroneFlightController";

const appWidgets = [
  {
    id: 1,
    title: "Drone Payload Monitoring & Detection",
    description: "Real-time monitoring of drone deliveries, payload tracking, and fleet management",
    icon: Package,
    path: "/fleet/payload-monitoring",
    color: "bg-blue-500",
    featured: true
  },
  {
    id: 2,
    title: "Route Optimization",
    description: "AI-powered route planning and optimization for maximum efficiency",
    icon: BarChart3,
    path: "/fleet/route-optimization",
    color: "bg-green-500",
    featured: false
  },
  {
    id: 3,
    title: "Drone Swarm Simulation",
    description: "Advanced simulation platform for drone swarm behavior and performance analysis",
    icon: Zap,
    path: "/fleet/drone-swarm",
    color: "bg-purple-500",
    featured: false
  },
  {
    id: 4,
    title: "Fleet Analytics",
    description: "Comprehensive analytics and reporting for fleet performance",
    icon: Monitor,
    path: "/fleet/analytics",
    color: "bg-orange-500",
    featured: false
  },
  {
    id: 5,
    title: "Maintenance Scheduler",
    description: "Automated maintenance scheduling and tracking system",
    icon: Settings,
    path: "/fleet/maintenance",
    color: "bg-red-500",
    featured: false
  },
  {
    id: 6,
    title: "Delivery Management",
    description: "End-to-end delivery tracking and customer communication",
    icon: Truck,
    path: "/fleet/delivery",
    color: "bg-teal-500",
    featured: false
  },
  {
    id: 7,
    title: "UAM Configuration",
    description: "Configure and customize drone settings and parameters",
    icon: Plane,
    path: "/fleet/configuration",
    color: "bg-indigo-500",
    featured: false,
    component: true
  },
  {
    id: 8,
    title: "Drone Subscription Management",
    description: "Manage drone fleet subscriptions, variants, and activations for dark store operations",
    icon: CreditCard,
    path: "/fleet/subscription-management",
    color: "bg-emerald-500",
    featured: false
  },
  {
    id: 9,
    title: "Intelligent Swarm Mission Configuration & Orchestration",
    description: "Configure complex swarm missions with autonomous conflict resolution and advanced safety features",
    icon: Users,
    path: "/fleet/intelligent-swarm",
    color: "bg-violet-500",
    featured: false,
    component: true
  },
  {
    id: 10,
    title: "Charging Infrastructure",
    description: "SkyCharge: Intelligent energy management for connected drone & eVTOL operations with smart grid integration",
    icon: Battery,
    path: "/fleet/charging-infrastructure",
    color: "bg-cyan-500",
    featured: false,
    component: true
  },
  {
    id: 11,
    title: "Vertiport & VertiHub",
    description: "SkyPort Connect: Integrated vertiport & airspace management for eVTOL operations in Chennai with FAA compliance",
    icon: MapPin,
    path: "/fleet/vertiport-vertihub",
    color: "bg-rose-500",
    featured: false,
    component: true
  },
  {
    id: 12,
    title: "Air Taxi Booking",
    description: "SkyRide Air Taxi: Interactive mobile booking experience for urban air mobility with eVTOL selection and real-time tracking",
    icon: Smartphone,
    path: "/fleet/air-taxi-booking",
    color: "bg-sky-500",
    featured: false,
    component: true
  },
  {
    id: 13,
    title: "Drone Flight Controller Application",
    description: "SkyPilot: Professional flight control interface with live video streaming, mission planning, and real-time telemetry for field operators",
    icon: Gamepad2,
    path: "/fleet/drone-flight-controller",
    color: "bg-slate-700",
    featured: false,
    component: true
  }
];

const FleetManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDroneConfiguration, setShowDroneConfiguration] = useState(false);
  const [showIntelligentSwarm, setShowIntelligentSwarm] = useState(false);
  const [showChargingInfrastructure, setShowChargingInfrastructure] = useState(false);
  const [showVertiportVertiHub, setShowVertiportVertiHub] = useState(false);
  const [showAirTaxiBooking, setShowAirTaxiBooking] = useState(false);
  const [showDroneFlightController, setShowDroneFlightController] = useState(false);

  const categories = [
    { id: "all", name: "All Apps", count: appWidgets.length },
    { id: "monitoring", name: "Monitoring", count: 2 },
    { id: "analytics", name: "Analytics", count: 2 },
    { id: "management", name: "Management", count: 5 }
  ];

  const handleWidgetClick = (widget: typeof appWidgets[0]) => {
    if (widget.component && widget.title === "UAM Configuration") {
      setShowDroneConfiguration(true);
    }
    if (widget.component && widget.title === "Intelligent Swarm Mission Configuration & Orchestration") {
      setShowIntelligentSwarm(true);
    }
    if (widget.component && widget.title === "Charging Infrastructure") {
      setShowChargingInfrastructure(true);
    }
    if (widget.component && widget.title === "Vertiport & VertiHub") {
      setShowVertiportVertiHub(true);
    }
    if (widget.component && widget.title === "Air Taxi Booking") {
      setShowAirTaxiBooking(true);
    }
    if (widget.component && widget.title === "Drone Flight Controller Application") {
      setShowDroneFlightController(true);
    }
  };

  if (showDroneConfiguration) {
    return <DroneConfiguration onBack={() => setShowDroneConfiguration(false)} />;
  }

  if (showIntelligentSwarm) {
    return <IntelligentSwarmMission onBack={() => setShowIntelligentSwarm(false)} />;
  }

  if (showChargingInfrastructure) {
    return <ChargingInfrastructure onBack={() => setShowChargingInfrastructure(false)} />;
  }

  if (showVertiportVertiHub) {
    return <VertiportVertiHub onBack={() => setShowVertiportVertiHub(false)} />;
  }

  if (showAirTaxiBooking) {
    return <AirTaxiBooking onBack={() => setShowAirTaxiBooking(false)} />;
  }

  if (showDroneFlightController) {
    return <DroneFlightController onBack={() => setShowDroneFlightController(false)} />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Fleet Management Apps</h1>
        <p className="text-muted-foreground">
          Comprehensive suite of applications for managing your drone fleet operations
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Featured Widget */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Featured Application</h2>
        {appWidgets
          .filter(widget => widget.featured)
          .map((widget) => (
            <Link key={widget.id} to={widget.path}>
              <Card className="glass-card hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <div className={cn("p-3 rounded-lg text-white", widget.color)}>
                      <widget.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{widget.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {widget.description}
                      </CardDescription>
                    </div>
                    <div className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                      Featured
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
      </div>

      {/* All Apps Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Applications</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {appWidgets
            .filter(widget => !widget.featured)
            .map((widget) => {
              if (widget.component) {
                return (
                  <div key={widget.id} onClick={() => handleWidgetClick(widget)} className="cursor-pointer">
                    <Card className="glass-card hover:shadow-lg transition-all duration-300 h-full">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={cn("p-2 rounded-lg text-white", widget.color)}>
                            <widget.icon size={20} />
                          </div>
                          <CardTitle className="text-lg">{widget.title}</CardTitle>
                        </div>
                        <CardDescription>
                          {widget.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          Click to access application
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              }

              return (
                <Link key={widget.id} to={widget.path}>
                  <Card className="glass-card hover:shadow-lg transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={cn("p-2 rounded-lg text-white", widget.color)}>
                          <widget.icon size={20} />
                        </div>
                        <CardTitle className="text-lg">{widget.title}</CardTitle>
                      </div>
                      <CardDescription>
                        {widget.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        Click to access application
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FleetManagement;
