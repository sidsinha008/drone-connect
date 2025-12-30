
import React, { useState } from "react";
import { Package, MapPin, Clock, AlertTriangle, Search, Plus, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const DeliveryRequestPortal = () => {
  const [selectedType, setSelectedType] = useState<"emergency" | "logistics">("emergency");
  const [selectedItem, setSelectedItem] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("critical");
  
  const emergencyItems = [
    { id: "aed", name: "AED Unit", description: "Automated External Defibrillator", available: 5 },
    { id: "trauma", name: "Trauma Kit", description: "Complete trauma response kit", available: 8 },
    { id: "oxygen", name: "Oxygen Tank", description: "Portable oxygen supply", available: 3 },
    { id: "stretcher", name: "Emergency Stretcher", description: "Lightweight portable stretcher", available: 2 },
  ];

  const logisticsItems = [
    { id: "concession", name: "Concession Supplies", description: "Food & beverage supplies", available: 15 },
    { id: "equipment", name: "Equipment Parts", description: "Maintenance & repair parts", available: 12 },
    { id: "uniforms", name: "Staff Uniforms", description: "Replacement uniforms", available: 20 },
    { id: "radios", name: "Communication Radios", description: "Two-way radio units", available: 6 },
  ];

  const urgencyLevels = [
    { id: "critical", label: "Critical - Immediate", color: "bg-red-600 text-white", description: "Life-threatening emergency" },
    { id: "urgent", label: "Urgent", color: "bg-orange-500 text-white", description: "Time-sensitive delivery" },
    { id: "standard", label: "Standard Emergency", color: "bg-yellow-500 text-white", description: "Important but not critical" },
  ];

  const timeWindows = [
    { id: "immediate", label: "Immediate (< 5 min)" },
    { id: "urgent", label: "Within 15 minutes" },
    { id: "scheduled", label: "Scheduled delivery" },
  ];

  const quickLocations = [
    "Section 105, Row A", "Medical Tent B", "Gate 7 Entrance", "Concession Stand C",
    "Security Office", "Maintenance Bay 3", "VIP Lounge", "Press Box"
  ];

  const handleSubmitRequest = () => {
    if (!selectedItem || !location) {
      toast.error("Please select an item and location");
      return;
    }

    const requestType = selectedType === "emergency" ? "Emergency Medical" : "Logistics";
    toast.success(`${requestType} Delivery Request Submitted`, {
      description: `${selectedItem} to ${location} - Drone dispatch initiated`,
    });
  };

  const currentItems = selectedType === "emergency" ? emergencyItems : logisticsItems;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Delivery Request Portal
          </CardTitle>
          <CardDescription>
            Streamlined interface for emergency medical and logistics delivery requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as "emergency" | "logistics")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="emergency" className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Emergency Medical
              </TabsTrigger>
              <TabsTrigger value="logistics" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Standard Logistics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="emergency" className="space-y-6">
              {/* Emergency Urgency Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Emergency Priority Level</Label>
                <div className="grid gap-2">
                  {urgencyLevels.map((level) => (
                    <div
                      key={level.id}
                      className={`p-3 rounded-lg cursor-pointer border-2 transition-all ${
                        urgency === level.id 
                          ? `border-red-500 ${level.color}` 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setUrgency(level.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-medium ${urgency === level.id ? 'text-white' : ''}`}>
                            {level.label}
                          </p>
                          <p className={`text-sm ${urgency === level.id ? 'text-gray-100' : 'text-gray-600'}`}>
                            {level.description}
                          </p>
                        </div>
                        {urgency === level.id && <CheckCircle className="w-5 h-5 text-white" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="logistics" className="space-y-6">
              {/* Logistics Time Window */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Delivery Time Window</Label>
                <div className="grid gap-2">
                  {timeWindows.map((window) => (
                    <div
                      key={window.id}
                      className={`p-3 rounded-lg cursor-pointer border-2 transition-all ${
                        urgency === window.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setUrgency(window.id)}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{window.label}</p>
                        {urgency === window.id && <CheckCircle className="w-5 h-5 text-blue-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Item Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Select Item for Delivery</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search items..."
                className="pl-10"
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
              />
            </div>
            <div className="grid gap-2 max-h-60 overflow-y-auto">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg cursor-pointer border-2 transition-all ${
                    selectedItem === item.name 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedItem(item.name)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={item.available > 5 ? "default" : "destructive"}>
                        {item.available} available
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Delivery Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter precise location (e.g., Section 112, Row 5, Seat 10)"
                className="pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickLocations.map((loc) => (
                <Button
                  key={loc}
                  variant="outline"
                  size="sm"
                  onClick={() => setLocation(loc)}
                  className="justify-start"
                >
                  {loc}
                </Button>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Special Instructions (Optional)</Label>
            <Input placeholder="Any special handling or delivery instructions..." />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Contact Person</Label>
              <Input placeholder="Name of person receiving delivery" />
            </div>
            <div className="space-y-2">
              <Label>Contact Number</Label>
              <Input placeholder="Phone number" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              onClick={handleSubmitRequest}
              className={`w-full ${
                selectedType === 'emergency' 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
              size="lg"
            >
              {selectedType === 'emergency' ? (
                <>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Submit Emergency Request
                </>
              ) : (
                <>
                  <Package className="w-4 h-4 mr-2" />
                  Submit Logistics Request
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryRequestPortal;
