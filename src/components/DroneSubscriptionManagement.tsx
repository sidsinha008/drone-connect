
import React, { useState } from "react";
import { ArrowLeft, MapPin, Plane, CreditCard, Shield, AlertCircle, CheckCircle, Info, Settings, Calendar, Star, Zap, Package, Clock, Users, Award, Search, Filter, Plus, Minus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface DarkStore {
  id: string;
  name: string;
  location: string;
  pincode: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'No Subscription';
  activeDrones: number;
  nextRenewal?: string;
  currentPlan?: string;
}

interface DroneVariant {
  id: string;
  name: string;
  payload: string;
  range: string;
  speed: string;
  batteryLife: string;
  useCase: string;
  image: string;
  monthlyCostPerUnit: number;
  maxPerStore: number;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  basePrice: number;
  deliveries: string;
  support: string;
  features: string[];
  recommended?: boolean;
  tier: string;
  optimalDroneRange: string;
}

interface FleetConfiguration {
  [droneId: string]: number;
}

const DroneSubscriptionManagement = () => {
  const { toast } = useToast();
  const [selectedStore, setSelectedStore] = useState<DarkStore | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [fleetConfig, setFleetConfig] = useState<FleetConfiguration>({});
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [showActivationModal, setShowActivationModal] = useState(false);

  // Mock data for dark stores
  const darkStores: DarkStore[] = [
    {
      id: "store1",
      name: "Xrili Chennai - Anna Nagar",
      location: "Anna Nagar",
      pincode: "600040",
      status: "Active",
      activeDrones: 5,
      nextRenewal: "July 15, 2026",
      currentPlan: "Pro"
    },
    {
      id: "store2",
      name: "Xrili Chennai - Velachery",
      location: "Velachery",
      pincode: "600042",
      status: "Inactive",
      activeDrones: 0
    },
    {
      id: "store3",
      name: "Xrili Mumbai - Andheri",
      location: "Andheri West",
      pincode: "400053",
      status: "Pending",
      activeDrones: 2,
      currentPlan: "Essential"
    },
    {
      id: "store4",
      name: "Xrili Bangalore - Koramangala",
      location: "Koramangala",
      pincode: "560034",
      status: "No Subscription",
      activeDrones: 0
    }
  ];

  const droneVariants: DroneVariant[] = [
    {
      id: "swift",
      name: "Xrili Swift",
      payload: "2kg",
      range: "15km",
      speed: "45 km/h",
      batteryLife: "45 min",
      useCase: "Small Packages",
      image: "🚁",
      monthlyCostPerUnit: 2000,
      maxPerStore: 10
    },
    {
      id: "hauler",
      name: "Xrili Hauler",
      payload: "5kg",
      range: "20km",
      speed: "35 km/h",
      batteryLife: "60 min",
      useCase: "Medium Parcels",
      image: "🚁",
      monthlyCostPerUnit: 3500,
      maxPerStore: 8
    },
    {
      id: "rapid",
      name: "Xrili Rapid",
      payload: "1kg",
      range: "25km",
      speed: "60 km/h",
      batteryLife: "30 min",
      useCase: "Emergency Deliveries",
      image: "🚁",
      monthlyCostPerUnit: 4000,
      maxPerStore: 6
    }
  ];

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: "essential",
      name: "Essential",
      basePrice: 10000,
      deliveries: "Up to 500 deliveries/month",
      support: "Standard Support",
      features: ["Email Support", "Standard SLA", "Basic Analytics"],
      tier: "Good",
      optimalDroneRange: "3-5 drones"
    },
    {
      id: "pro",
      name: "Pro",
      basePrice: 18000,
      deliveries: "Up to 1000 deliveries/month",
      support: "Priority Support",
      features: ["24/7 Phone Support", "Enhanced SLA", "Advanced Analytics", "Fleet Optimization"],
      recommended: true,
      tier: "Better",
      optimalDroneRange: "5-12 drones"
    },
    {
      id: "enterprise",
      name: "Enterprise",
      basePrice: 35000,
      deliveries: "Unlimited deliveries",
      support: "24/7 Dedicated Support",
      features: ["Dedicated Account Manager", "Custom SLA", "White-label Options", "AI-Powered Insights"],
      tier: "Best",
      optimalDroneRange: "12+ drones"
    }
  ];

  const fleetPresets = {
    starter: { swift: 3, hauler: 1, rapid: 0 },
    balanced: { swift: 4, hauler: 3, rapid: 1 },
    heavy: { swift: 2, hauler: 4, rapid: 2 }
  };

  const filteredStores = darkStores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.pincode.includes(searchTerm)
  );

  const updateDroneQuantity = (droneId: string, change: number) => {
    const drone = droneVariants.find(d => d.id === droneId);
    if (!drone) return;

    const currentQuantity = fleetConfig[droneId] || 0;
    const newQuantity = Math.max(0, Math.min(drone.maxPerStore, currentQuantity + change));
    
    setFleetConfig(prev => ({
      ...prev,
      [droneId]: newQuantity
    }));
  };

  const applyFleetPreset = (preset: keyof typeof fleetPresets) => {
    setFleetConfig(fleetPresets[preset]);
  };

  const calculateTotalCost = () => {
    const planCost = subscriptionPlans.find(plan => plan.id === selectedPlan)?.basePrice || 0;
    const droneCost = Object.entries(fleetConfig).reduce((total, [droneId, quantity]) => {
      const drone = droneVariants.find(d => d.id === droneId);
      return total + (drone ? drone.monthlyCostPerUnit * quantity : 0);
    }, 0);
    
    return planCost + droneCost;
  };

  const getTotalDroneCount = () => {
    return Object.values(fleetConfig).reduce((total, quantity) => total + quantity, 0);
  };

  const getSelectedPlan = () => subscriptionPlans.find(plan => plan.id === selectedPlan);

  const handleSubscribe = () => {
    if (!selectedStore || !selectedPlan || getTotalDroneCount() === 0) {
      toast({
        title: "Configuration Required",
        description: "Please select a store, configure your drone fleet, and choose a subscription plan.",
        variant: "destructive"
      });
      return;
    }

    setShowActivationModal(true);
  };

  const handleActivateFleet = () => {
    setShowActivationModal(false);
    toast({
      title: "Fleet Activated!",
      description: `Drone fleet for ${selectedStore?.name} is now active and ready for deliveries.`,
    });
  };

  const getStatusBadgeVariant = (status: DarkStore['status']) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Pending': return 'secondary';
      case 'Inactive': return 'outline';
      case 'No Subscription': return 'destructive';
      default: return 'outline';
    }
  };

  const ActivationModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="max-w-3xl w-full mx-4 animate-scale-in">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl text-green-600">
            🎉 Fleet Update Successful for {selectedStore?.name}!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium">Dark Store:</p>
                  <p className="text-lg font-bold">{selectedStore?.name} ({selectedStore?.pincode})</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="font-medium">Active Until:</p>
                  <p className="text-lg font-bold text-green-600">July 15, 2026, 11:59 PM IST</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium">Subscription Plan:</p>
                  <p className="text-lg font-bold">{getSelectedPlan()?.name} Plan</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">Subscribed Drones & Quantities:</p>
                <div className="space-y-2">
                  {Object.entries(fleetConfig).map(([droneId, quantity]) => {
                    if (quantity === 0) return null;
                    const drone = droneVariants.find(d => d.id === droneId);
                    return (
                      <div key={droneId} className="flex justify-between items-center bg-blue-50 px-3 py-2 rounded">
                        <span className="flex items-center gap-2">
                          <span>{drone?.image}</span>
                          <span>{drone?.name}</span>
                        </span>
                        <Badge variant="secondary">{quantity} Units</Badge>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium">Monthly Commitment:</p>
                  <p className="text-lg font-bold">₹{calculateTotalCost().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Today: Activation</span>
              <div className="flex-1 mx-4 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded"></div>
              <span className="text-sm text-muted-foreground">Next Renewal: July 15, 2026</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            <Button onClick={handleActivateFleet} className="w-full">
              <Zap className="w-4 h-4 mr-2" />
              Go to {selectedStore?.name}'s Dashboard
            </Button>
            <Button variant="outline" className="w-full" onClick={() => setSelectedStore(null)}>
              <Settings className="w-4 h-4 mr-2" />
              Configure Another Store
            </Button>
            <Button variant="outline" className="w-full">
              <Info className="w-4 h-4 mr-2" />
              View All Fleet Subscriptions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Global Navigation Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Button variant="outline" onClick={() => window.history.back()} className="mb-3 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Fleet Management
            </Button>
            <h1 className="text-3xl font-bold">Xrili Global Fleet Manager</h1>
            <p className="text-blue-100 mt-2">
              Manage drone subscriptions across all your dark stores
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Logged in as:</p>
            <p className="font-bold text-lg">Multi-Store Admin</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-sm text-blue-100">Overall Fleet Status:</p>
            <p className="font-bold text-lg">3/4 Stores Active</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-sm text-blue-100">Total Active Drones:</p>
            <p className="font-bold text-lg">7 Drones</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-sm text-blue-100">Pending Actions:</p>
            <p className="font-bold text-lg">1 Store Pending</p>
          </div>
        </div>
      </div>

      {!selectedStore ? (
        // Store Selection View
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-6 h-6" />
                    Your Xrili Dark Stores
                  </CardTitle>
                  <CardDescription>
                    Select a dark store to manage its drone fleet subscription
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Dark Store
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="Search by store name, ID, or pin code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {filteredStores.map((store) => (
                  <Card key={store.id} className="cursor-pointer hover:shadow-md transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{store.name}</h3>
                          <p className="text-muted-foreground">Pin Code: {store.pincode}</p>
                        </div>
                        <Badge variant={getStatusBadgeVariant(store.status)}>
                          {store.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Active Drones</p>
                          <p className="font-bold">{store.activeDrones} Drones</p>
                        </div>
                        {store.nextRenewal && (
                          <div>
                            <p className="text-sm text-muted-foreground">Next Renewal</p>
                            <p className="font-bold text-sm">{store.nextRenewal}</p>
                          </div>
                        )}
                      </div>

                      <Button 
                        onClick={() => setSelectedStore(store)}
                        className="w-full"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Manage Fleet
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        // Fleet Configuration View
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Store Configuration Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      Configuring Fleet for: {selectedStore.name}
                    </CardTitle>
                    <CardDescription>
                      {selectedStore.pincode} • {selectedStore.location}
                    </CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedStore(null)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Stores
                  </Button>
                </div>
              </CardHeader>
              {selectedStore.currentPlan && (
                <CardContent>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Current Plan:</span>
                        <span className="ml-2 font-medium">{selectedStore.currentPlan}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Active Until:</span>
                        <span className="ml-2 font-medium">{selectedStore.nextRenewal}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Active Drones:</span>
                        <span className="ml-2 font-medium">{selectedStore.activeDrones}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Drone Variants & Quantity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5" />
                  Choose Your Drone Variants & Quantity
                </CardTitle>
                <CardDescription>
                  Configure the number of each drone variant for this dark store
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Fleet Presets */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Quick Fleet Presets</h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => applyFleetPreset('starter')}
                      className="text-left justify-start"
                    >
                      <div>
                        <p className="font-medium">Starter Fleet</p>
                        <p className="text-xs text-muted-foreground">3 Swift, 1 Hauler</p>
                      </div>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => applyFleetPreset('balanced')}
                      className="text-left justify-start"
                    >
                      <div>
                        <p className="font-medium">Balanced Fleet</p>
                        <p className="text-xs text-muted-foreground">4 Swift, 3 Hauler, 1 Rapid</p>
                      </div>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => applyFleetPreset('heavy')}
                      className="text-left justify-start"
                    >
                      <div>
                        <p className="font-medium">Heavy Fleet</p>
                        <p className="text-xs text-muted-foreground">2 Swift, 4 Hauler, 2 Rapid</p>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Individual Drone Configuration */}
                <div className="space-y-4">
                  {droneVariants.map((drone) => (
                    <Card key={drone.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">{drone.image}</span>
                          <div>
                            <h4 className="font-medium">{drone.name}</h4>
                            <p className="text-sm text-muted-foreground">{drone.useCase}</p>
                            <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                              <span>Payload: {drone.payload}</span>
                              <span>Range: {drone.range}</span>
                              <span>₹{drone.monthlyCostPerUnit.toLocaleString()}/unit</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateDroneQuantity(drone.id, -1)}
                            disabled={(fleetConfig[drone.id] || 0) === 0}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <div className="w-12 text-center font-bold">
                            {fleetConfig[drone.id] || 0}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateDroneQuantity(drone.id, 1)}
                            disabled={(fleetConfig[drone.id] || 0) >= drone.maxPerStore}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <div className="text-xs text-muted-foreground ml-2">
                            Max: {drone.maxPerStore}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subscription Plans */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Select Your Subscription Plan
                </CardTitle>
                <CardDescription>
                  Choose a plan that matches your delivery volume and drone count
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {subscriptionPlans.map((plan) => (
                    <Card 
                      key={plan.id}
                      className={`cursor-pointer transition-all ${
                        selectedPlan === plan.id 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{plan.name}</CardTitle>
                            <Badge variant={plan.tier === 'Best' ? 'default' : 'outline'} className="mt-1">
                              {plan.tier}
                            </Badge>
                          </div>
                          {plan.recommended && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500">
                              <Star className="w-3 h-3 mr-1" />
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <div className="text-2xl font-bold">₹{plan.basePrice.toLocaleString()}</div>
                        <p className="text-sm text-muted-foreground">base price/month</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">{plan.deliveries}</p>
                          <p className="text-sm text-muted-foreground">{plan.support}</p>
                          <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            Optimal for {plan.optimalDroneRange}
                          </div>
                          <ul className="text-xs space-y-1">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fleet Configuration Summary Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Current Fleet Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Dark Store</p>
                  <p className="font-medium">{selectedStore.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedStore.pincode}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Drones in Configuration</p>
                  {Object.entries(fleetConfig).some(([, quantity]) => quantity > 0) ? (
                    <div className="space-y-2">
                      {Object.entries(fleetConfig).map(([droneId, quantity]) => {
                        if (quantity === 0) return null;
                        const drone = droneVariants.find(d => d.id === droneId);
                        return (
                          <div key={droneId} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <span>{drone?.image}</span>
                              <span>{drone?.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{quantity} units</div>
                              <div className="text-xs text-muted-foreground">
                                ₹{((drone?.monthlyCostPerUnit || 0) * quantity).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No drones configured</p>
                  )}
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Selected Plan</p>
                  <p className="font-medium">
                    {selectedPlan ? getSelectedPlan()?.name : "None selected"}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Total Monthly Cost</span>
                    <span className="font-bold text-xl text-green-600">₹{calculateTotalCost().toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>Base plan cost:</span>
                      <span>₹{(getSelectedPlan()?.basePrice || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Drone costs:</span>
                      <span>₹{(calculateTotalCost() - (getSelectedPlan()?.basePrice || 0)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total drones:</span>
                      <span>{getTotalDroneCount()} units</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    onClick={handleSubscribe} 
                    className="w-full text-lg py-3"
                    disabled={!selectedPlan || getTotalDroneCount() === 0}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Subscribe & Activate
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Info className="w-5 h-5 mr-2" />
                    Cost Calculator Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Activation Modal */}
      {showActivationModal && <ActivationModal />}
    </div>
  );
};

export default DroneSubscriptionManagement;
