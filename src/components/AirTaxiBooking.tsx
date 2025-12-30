
import { useState } from "react";
import { ArrowLeft, MapPin, Clock, Users, Smartphone, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import BookingInterface from "./AirTaxiBooking/BookingInterface";
import MyRides from "./AirTaxiBooking/MyRides";
import UserProfile from "./AirTaxiBooking/UserProfile";

interface AirTaxiBookingProps {
  onBack: () => void;
}

const AirTaxiBooking = ({ onBack }: AirTaxiBookingProps) => {
  const [activeTab, setActiveTab] = useState("book");

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="hover:bg-white/50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500 text-white rounded-lg">
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SkyRide Air Taxi</h1>
              <p className="text-gray-600">Urban Air Mobility for Hyderabad</p>
              <Badge className="bg-green-500 text-white text-xs mt-1">
                <Shield className="w-3 h-3 mr-1" />
                OTP Secured
              </Badge>
            </div>
          </div>
        </div>

        {/* Mobile App Simulator */}
        <div className="max-w-sm mx-auto">
          <Card className="bg-white shadow-2xl rounded-[2.5rem] p-6 border-8 border-gray-800">
            {/* Status Bar */}
            <div className="flex justify-between items-center mb-4 text-xs text-gray-600">
              <span>9:41</span>
              <span>SkyRide</span>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                <span>100%</span>
              </div>
            </div>

            {/* App Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="book" className="text-xs">Book</TabsTrigger>
                <TabsTrigger value="rides" className="text-xs">My Rides</TabsTrigger>
                <TabsTrigger value="profile" className="text-xs">Profile</TabsTrigger>
              </TabsList>

              <TabsContent value="book" className="mt-0">
                <BookingInterface />
              </TabsContent>

              <TabsContent value="rides" className="mt-0">
                <MyRides />
              </TabsContent>

              <TabsContent value="profile" className="mt-0">
                <UserProfile />
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Enhanced Feature Highlights */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Card className="bg-white/80 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-sky-500" />
                Hyderabad Routes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Optimized routes connecting major Hyderabad landmarks: Hitech City, Gachibowli, Banjara Hills, and Airport with smart vertiport integration.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5 text-sky-500" />
                OTP Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Enhanced security with mobile OTP verification, real-time pilot verification, and emergency contact features for safe urban air travel.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5 text-sky-500" />
                Live Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Real-time 3D flight tracking with altitude monitoring, weather updates, and seamless last-mile connectivity to Hyderabad's transport network.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Hyderabad Service Areas */}
        <div className="mt-6">
          <Card className="bg-gradient-to-r from-blue-500 to-sky-500 text-white">
            <CardHeader>
              <CardTitle className="text-center">Now Serving Hyderabad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium">Tech Corridors</h4>
                  <ul className="space-y-1 text-xs opacity-90">
                    <li>• Hitech City</li>
                    <li>• Gachibowli</li>
                    <li>• Madhapur</li>
                    <li>• Kondapur</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Key Destinations</h4>
                  <ul className="space-y-1 text-xs opacity-90">
                    <li>• Rajiv Gandhi Airport</li>
                    <li>• Banjara Hills</li>
                    <li>• Jubilee Hills</li>
                    <li>• Begumpet Airport</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AirTaxiBooking;
