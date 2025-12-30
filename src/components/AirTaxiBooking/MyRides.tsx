
import { Clock, MapPin, Plane, Star, Navigation, Phone, MessageSquare, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MyRides = () => {
  const currentRides = [
    {
      id: "SR2024001",
      pickup: "Hitech City Vertiport",
      destination: "Rajiv Gandhi Airport",
      evtol: "AeroSwift",
      pilot: "Captain Suresh Kumar",
      pilotRating: 4.9,
      status: "In Flight",
      estimatedArrival: "2 min",
      altitude: "2,100 ft",
      speed: "195 mph",
      currentLocation: "Over Gachibowli",
      weather: "Clear skies",
      emergencyContact: "+91-9876543210"
    }
  ];

  const upcomingRides = [
    {
      id: "SR2024002", 
      pickup: "Rajiv Gandhi Airport",
      destination: "Banjara Hills Vertiport",
      evtol: "SkyPod",
      date: "Today, 6:30 PM",
      status: "Confirmed",
      pilot: "Captain Priya Sharma",
      pilotRating: 4.8,
      checkInTime: "6:15 PM",
      gateInfo: "Gate A-3, Level 2",
      weatherAlert: "Light winds expected"
    }
  ];

  const pastRides = [
    {
      id: "SR2024000",
      pickup: "Jubilee Hills",
      destination: "Gachibowli Tech Park",
      evtol: "LuxuryCruiser",
      date: "Yesterday",
      rating: 5,
      fare: "₹7,840",
      pilot: "Captain Ravi Teja",
      duration: "7 minutes",
      savedTime: "35 minutes vs ground transport"
    },
    {
      id: "SR2023999",
      pickup: "Madhapur",
      destination: "Kondapur Metro", 
      evtol: "AeroSwift",
      date: "Dec 20",
      rating: 4,
      fare: "₹4,704",
      pilot: "Captain Lakshmi Devi",
      duration: "5 minutes",
      savedTime: "25 minutes vs ground transport"
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-center">My SkyRides</h2>

      {/* Current Rides */}
      {currentRides.length > 0 && (
        <div>
          <h3 className="font-medium mb-2 text-green-600">Current Flight</h3>
          {currentRides.map((ride) => (
            <Card key={ride.id} className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-green-500">
                    <Plane className="w-3 h-3 mr-1" />
                    {ride.status}
                  </Badge>
                  <span className="text-sm text-gray-600">#{ride.id}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{ride.pickup} → {ride.destination}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>eVTOL: {ride.evtol}</span>
                    <span>Pilot: {ride.pilot} ⭐{ride.pilotRating}</span>
                  </div>
                  
                  <div className="bg-white p-2 rounded text-sm">
                    <div className="flex justify-between mb-1">
                      <span>Current Location:</span>
                      <span className="font-medium text-green-600">{ride.currentLocation}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Altitude: {ride.altitude}</span>
                      <span>Speed: {ride.speed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weather: {ride.weather}</span>
                      <span className="text-green-600 font-medium">ETA: {ride.estimatedArrival}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    <Navigation className="w-3 h-3 mr-1" />
                    Track Live
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="w-3 h-3 mr-1" />
                    Call Pilot
                  </Button>
                  <Button variant="outline" size="sm">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Emergency
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upcoming Rides */}
      {upcomingRides.length > 0 && (
        <div>
          <h3 className="font-medium mb-2 text-blue-600">Upcoming</h3>
          {upcomingRides.map((ride) => (
            <Card key={ride.id} className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="border-blue-300 text-blue-600">
                    <Clock className="w-3 h-3 mr-1" />
                    {ride.status}
                  </Badge>
                  <span className="text-sm text-gray-600">#{ride.id}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{ride.pickup} → {ride.destination}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>eVTOL: {ride.evtol}</span>
                    <span>{ride.date}</span>
                  </div>

                  <div className="bg-white p-2 rounded text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Pilot: {ride.pilot} ⭐{ride.pilotRating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check-in: {ride.checkInTime}</span>
                      <span>{ride.gateInfo}</span>
                    </div>
                    <div className="text-amber-600">
                      ⚠️ {ride.weatherAlert}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Check-in
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Modify
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Past Rides */}
      <div>
        <h3 className="font-medium mb-2 text-gray-600">Past Rides</h3>
        <div className="space-y-2">
          {pastRides.map((ride) => (
            <Card key={ride.id} className="bg-gray-50">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">#{ride.id}</span>
                  <span className="text-sm font-medium">{ride.fare}</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{ride.pickup} → {ride.destination}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{ride.evtol} • {ride.duration}</span>
                    <span>{ride.date}</span>
                  </div>

                  <div className="text-xs text-green-600 font-medium">
                    ⚡ Saved {ride.savedTime}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < ride.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({ride.rating}/5)</span>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
                  Rebook This Route
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyRides;
