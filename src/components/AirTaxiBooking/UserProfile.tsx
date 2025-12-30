
import { User, CreditCard, Bell, Shield, MapPin, Star, Settings, Phone, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const UserProfile = () => {
  const userStats = {
    totalFlights: 47,
    totalDistance: "2,340 km",
    averageRating: 4.8,
    memberSince: "Jan 2024",
    skyMiles: 12840,
    tier: "Silver",
    timeSaved: "18.5 hours",
    carbonSaved: "245 kg CO₂",
    favoriteRoute: "Hitech City ↔ Airport"
  };

  const savedLocations = [
    { name: "Home", address: "Banjara Hills, Hyderabad", icon: "🏠", vertiport: "Banjara Hills Vertiport" },
    { name: "Office", address: "Hitech City, Hyderabad", icon: "🏢", vertiport: "Hitech City Vertiport" },
    { name: "Airport", address: "Rajiv Gandhi Intl Airport", icon: "✈️", vertiport: "Airport Vertiport" }
  ];

  const emergencyContacts = [
    { name: "Rajesh Sharma", relation: "Spouse", phone: "+91-9876543210" },
    { name: "Dr. Priya Kumar", relation: "Emergency Contact", phone: "+91-9123456789" }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-center">Profile</h2>

      {/* User Info */}
      <Card className="bg-gradient-to-r from-sky-500 to-blue-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Rahul Sharma</h3>
              <p className="text-sm opacity-90">+91-9876543210</p>
              <p className="text-xs opacity-75">rahul.sharma@email.com</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Badge className="bg-white/20 text-white border-white/30">
                {userStats.tier} Member
              </Badge>
              <p className="text-xs mt-1 opacity-75">Member since {userStats.memberSince}</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">{userStats.skyMiles.toLocaleString()}</div>
              <div className="text-xs opacity-75">SkyMiles</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Flight Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Flight Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-sky-500">{userStats.totalFlights}</div>
              <div className="text-xs text-gray-600">Total Flights</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-sky-500">{userStats.totalDistance}</div>
              <div className="text-xs text-gray-600">Distance Traveled</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-green-500">{userStats.timeSaved}</div>
              <div className="text-xs text-gray-600">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-500">{userStats.carbonSaved}</div>
              <div className="text-xs text-gray-600">Carbon Saved</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium">{userStats.averageRating}</span>
            <span className="text-sm text-gray-600">Average Rating</span>
          </div>

          <div className="text-center p-2 bg-blue-50 rounded">
            <div className="text-sm font-medium text-blue-700">Favorite Route</div>
            <div className="text-xs text-blue-600">{userStats.favoriteRoute}</div>
          </div>
        </CardContent>
      </Card>

      {/* Saved Locations */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Saved Vertiports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {savedLocations.map((location, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
              <span className="text-xl">{location.icon}</span>
              <div className="flex-1">
                <div className="font-medium text-sm">{location.name}</div>
                <div className="text-xs text-gray-600">{location.address}</div>
                <div className="text-xs text-blue-600">{location.vertiport}</div>
              </div>
              <MapPin className="w-4 h-4 text-gray-400" />
            </div>
          ))}
          <Button variant="ghost" size="sm" className="w-full text-sky-500">
            + Add Vertiport Location
          </Button>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="w-4 h-4 text-red-500" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-red-50">
              <Phone className="w-4 h-4 text-red-500" />
              <div className="flex-1">
                <div className="font-medium text-sm">{contact.name}</div>
                <div className="text-xs text-gray-600">{contact.relation}</div>
              </div>
              <div className="text-xs text-gray-600">{contact.phone}</div>
            </div>
          ))}
          <Button variant="ghost" size="sm" className="w-full text-red-500">
            + Add Emergency Contact
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="space-y-2">
        <h3 className="font-medium">Settings & Security</h3>
        
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start h-10" size="sm">
            <CreditCard className="w-4 h-4 mr-3" />
            Payment Methods & UPI
          </Button>
          
          <Button variant="ghost" className="w-full justify-start h-10" size="sm">
            <Bell className="w-4 h-4 mr-3" />
            Flight Notifications
          </Button>
          
          <Button variant="ghost" className="w-full justify-start h-10" size="sm">
            <Shield className="w-4 h-4 mr-3" />
            OTP & Security Settings
          </Button>
          
          <Button variant="ghost" className="w-full justify-start h-10" size="sm">
            <Clock className="w-4 h-4 mr-3" />
            Booking Preferences
          </Button>

          <Button variant="ghost" className="w-full justify-start h-10" size="sm">
            <Zap className="w-4 h-4 mr-3" />
            eVTOL Preferences
          </Button>
          
          <Button variant="ghost" className="w-full justify-start h-10" size="sm">
            <Settings className="w-4 h-4 mr-3" />
            App Settings
          </Button>
        </div>
      </div>

      {/* Hyderabad Service Info */}
      <Card className="bg-gradient-to-r from-orange-100 to-yellow-100">
        <CardContent className="p-3">
          <div className="text-center">
            <h4 className="font-medium text-orange-800">SkyRide Hyderabad</h4>
            <p className="text-xs text-orange-700 mt-1">
              Currently serving 12 vertiports across Greater Hyderabad
            </p>
            <div className="flex items-center justify-center gap-4 mt-2 text-xs text-orange-600">
              <span>24/7 Support</span>
              <span>•</span>
              <span>Emergency Ready</span>
              <span>•</span>
              <span>Weather Monitored</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
