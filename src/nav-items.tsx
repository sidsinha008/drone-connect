
import { HomeIcon, Download, Cpu, MapPin, Truck, Gamepad2, Zap, Plane, Users, ShoppingCart } from "lucide-react";
import Index from "./pages/Index";
import OTAUpdates from "./components/OTAUpdates";
import DeviceManagement from "./components/DeviceManagement";
import FleetManagement from "./components/FleetManagement";
import SportsManagement from "./components/SportsManagement";
import DroneSwarm from "./components/DroneSwarm";
import DroneSubscriptionManagement from "./components/DroneSubscriptionManagement";
import DroneConfiguration from "./components/DroneConfiguration";
import RouteOptimization from "./components/RouteOptimization";
import MapTrafficPage from "./pages/MapTrafficPage";
import IntelligentSwarmMission from "./components/IntelligentSwarmMission";
import QuickCommerceDashboard from "./components/QuickCommerceDashboard";

export const navItems = [
  {
    title: "Dashboard",
    to: "/",
    icon: HomeIcon,
    page: <Index />,
  },
  {
    title: "OTA Updates",
    to: "/ota",
    icon: Download,
    page: <OTAUpdates />,
  },
  {
    title: "Device Management",
    to: "/devices",
    icon: Cpu,
    page: <DeviceManagement />,
  },
  {
    title: "Map Traffic",
    to: "/map",
    icon: MapPin,
    page: <MapTrafficPage />,
  },
  {
    title: "Fleet Management",
    to: "/fleet",
    icon: Truck,
    page: <FleetManagement />,
  },
  {
    title: "Quick Commerce",
    to: "/quick-commerce",
    icon: ShoppingCart,
    page: <QuickCommerceDashboard />,
  },
  {
    title: "Route Optimization", // <-- Add this route for the widget
    to: "/fleet/route-optimization",
    icon: Truck,
    page: <RouteOptimization />,
  },
  {
    title: "Drone Swarm Simulation",
    to: "/fleet/drone-swarm",
    icon: Zap,
    page: <DroneSwarm />,
  },
  {
    title: "Drone Subscription Management",
    to: "/fleet/subscription-management",
    icon: Truck,
    page: <DroneSubscriptionManagement />,
  },
  {
    title: "Intelligent Swarm Mission",
    to: "/fleet/intelligent-swarm",
    icon: Users,
    page: <IntelligentSwarmMission onBack={() => {}} />,
  },
  {
    title: "GSIC - UAV Feature",
    to: "/sports",
    icon: Gamepad2,
    page: <SportsManagement onBack={() => {}} />,
  },
  {
    title: "Drone Configuration",
    to: "/fleet/configuration",
    icon: Plane,
    page: <DroneConfiguration onBack={() => {}} />,
  },
];
