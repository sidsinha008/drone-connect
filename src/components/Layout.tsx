import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Download, 
  Layers, 
  MapPin, 
  Menu, 
  X,
  Gauge,
  Cpu,
  Truck,
  Gamepad2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type MenuItem = {
  name: string;
  path: string;
  icon: React.ElementType;
};

const menuItems: MenuItem[] = [
  { name: "Dashboard", path: "/", icon: Gauge },
  { name: "OTA Updates", path: "/ota", icon: Download },
  { name: "Device Management", path: "/devices", icon: Cpu },
  { name: "Map Traffic", path: "/map", icon: MapPin },
  { name: "Fleet Management", path: "/fleet", icon: Truck },
  { name: "GSIC - UAV Feature", path: "/sports", icon: Gamepad2 },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Open sidebar by default on desktop
  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed md:sticky top-0 left-0 z-50 h-screen transition-all duration-300 ease-in-out",
          "flex flex-col bg-sidebar border-r border-sidebar-border shadow-sm",
          sidebarOpen ? "w-64" : "w-0 md:w-20",
          "overflow-y-auto md:overflow-visible"
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo area */}
          <div className="flex items-center justify-between mb-8 h-12">
            <h1 
              className={cn(
                "font-semibold text-xl flex items-center gap-2 transition-opacity duration-300",
                !sidebarOpen && "md:opacity-0"
              )}
            >
              <Layers className="text-primary" />
              <span className={cn(sidebarOpen ? "opacity-100" : "opacity-0 invisible md:hidden")}>
                DroneConnect
              </span>
            </h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "p-1 rounded-full hover:bg-sidebar-accent transition-opacity",
                sidebarOpen ? "opacity-100" : "opacity-0 hidden"
              )}
            >
              <X size={18} />
            </button>
          </div>

          {/* Menu items */}
          <nav className="flex flex-col gap-2 flex-grow">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                  "hover:bg-sidebar-accent group",
                  location.pathname === item.path 
                    ? "bg-primary text-primary-foreground" 
                    : "text-sidebar-foreground"
                )}
              >
                <item.icon 
                  size={20} 
                  className={cn(
                    "min-w-5 transition-all",
                    location.pathname === item.path 
                      ? "" 
                      : "text-muted-foreground group-hover:text-sidebar-foreground"
                  )}
                />
                <span 
                  className={cn(
                    "transition-all whitespace-nowrap",
                    !sidebarOpen && "opacity-0 invisible md:hidden"
                  )}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Bottom section */}
          <div className="pt-4 mt-auto border-t border-sidebar-border">
            <div 
              className={cn(
                "text-xs text-muted-foreground transition-opacity duration-300",
                !sidebarOpen && "opacity-0 md:hidden"
              )}
            >
              DroneConnect Platform v1.0
            </div>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 border-b border-border bg-background/80 backdrop-blur-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className={cn(
              "p-2 rounded-md hover:bg-muted transition-all",
              sidebarOpen && "opacity-0 invisible md:opacity-100 md:visible"
            )}
          >
            <Menu size={20} />
          </button>

          <div className="text-sm text-muted-foreground">
            Connected Drone Platform
          </div>
        </header>

        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
