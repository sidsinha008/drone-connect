
import { useState } from "react";
import { MapPin, Calendar, Users, ArrowRight, Zap, Star, Shield, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const BookingInterface = () => {
  const [step, setStep] = useState(1);
  const [otpValue, setOtpValue] = useState("");
  const [bookingData, setBookingData] = useState({
    pickup: "",
    destination: "",
    passengers: 1,
    selectedEvtol: null as any,
    bookingId: ""
  });

  const hyderabadLocations = [
    { name: "Hitech City", type: "vertiport", eta: "Available" },
    { name: "Gachibowli", type: "vertiport", eta: "5 min wait" },
    { name: "Banjara Hills", type: "vertiport", eta: "Available" },
    { name: "Rajiv Gandhi Airport", type: "vertiport", eta: "Available" },
    { name: "Begumpet Airport", type: "vertiport", eta: "Available" },
    { name: "Jubilee Hills", type: "vertiport", eta: "10 min wait" }
  ];

  const evtolVariants = [
    {
      id: 1,
      name: "SkyPod",
      type: "Economy",
      price: 2500,
      capacity: 4,
      altitude: "1,000 ft",
      speed: "150 mph",
      amenities: ["Wi-Fi", "Climate Control"],
      image: "🚁",
      recommended: false,
      flightTime: "8 min",
      groundComparison: "vs 45 min by car"
    },
    {
      id: 2,
      name: "AeroSwift", 
      type: "Premium",
      price: 4200,
      capacity: 6,
      altitude: "2,500 ft",
      speed: "200 mph",
      amenities: ["Premium Seating", "Wi-Fi", "Refreshments", "Noise-Cancelling"],
      image: "✈️",
      recommended: true,
      flightTime: "6 min",
      groundComparison: "vs 50 min by car"
    },
    {
      id: 3,
      name: "LuxuryCruiser",
      type: "Luxury",
      price: 7500,
      capacity: 4,
      altitude: "3,000 ft", 
      speed: "180 mph",
      amenities: ["Luxury Seating", "Wi-Fi", "Premium Refreshments", "Entertainment System", "Extra Luggage"],
      image: "🛩️",
      recommended: false,
      flightTime: "7 min",
      groundComparison: "vs 45 min by car"
    }
  ];

  const handleEvtolSelect = (evtol: any) => {
    setBookingData(prev => ({ ...prev, selectedEvtol: evtol }));
    setStep(3);
  };

  const handleBookingConfirm = () => {
    const bookingId = "SR" + Date.now().toString().slice(-6);
    setBookingData(prev => ({ ...prev, bookingId }));
    setStep(4);
  };

  const handleOtpSubmit = () => {
    if (otpValue.length === 6) {
      setStep(5);
    }
  };

  if (step === 1) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-center">Where to in Hyderabad?</h2>
        
        <div className="space-y-3">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Pickup vertiport"
              className="pl-10"
              value={bookingData.pickup}
              onChange={(e) => setBookingData(prev => ({ ...prev, pickup: e.target.value }))}
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-sky-500" />
            <Input 
              placeholder="Destination vertiport"
              className="pl-10"
              value={bookingData.destination}
              onChange={(e) => setBookingData(prev => ({ ...prev, destination: e.target.value }))}
            />
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Now" className="pl-10" />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                type="number" 
                value={bookingData.passengers}
                onChange={(e) => setBookingData(prev => ({ ...prev, passengers: parseInt(e.target.value) }))}
                className="pl-10 w-20"
                min="1"
                max="6"
              />
            </div>
          </div>
        </div>

        <Button 
          className="w-full bg-sky-500 hover:bg-sky-600"
          onClick={() => setStep(2)}
          disabled={!bookingData.pickup || !bookingData.destination}
        >
          Find Air Taxis
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <div className="mt-6">
          <h3 className="font-medium mb-2">Popular Vertiports</h3>
          <div className="grid grid-cols-2 gap-2">
            {hyderabadLocations.slice(0, 6).map((location, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded text-xs">
                <div className="font-medium">{location.name}</div>
                <div className="text-gray-500">{location.eta}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
            ← Back
          </Button>
          <h2 className="font-bold">Choose eVTOL</h2>
          <div></div>
        </div>

        <div className="text-center text-sm text-gray-600 mb-4">
          {bookingData.pickup} → {bookingData.destination}
          <br />
          {bookingData.passengers} passenger{bookingData.passengers > 1 ? 's' : ''}
        </div>

        <div className="space-y-3">
          {evtolVariants.map((evtol) => (
            <Card 
              key={evtol.id} 
              className={`cursor-pointer transition-all ${evtol.recommended ? 'ring-2 ring-sky-500' : ''}`}
              onClick={() => handleEvtolSelect(evtol)}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{evtol.image}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{evtol.name}</span>
                        {evtol.recommended && (
                          <Badge className="bg-sky-500 text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Best Value
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">{evtol.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">₹{evtol.price.toLocaleString()}</div>
                    <div className="text-xs text-green-600">{evtol.flightTime}</div>
                    <div className="text-xs text-gray-500">{evtol.groundComparison}</div>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>{evtol.capacity} seats</span>
                  <span>{evtol.altitude}</span>
                  <span>{evtol.speed}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {evtol.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {evtol.amenities.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{evtol.amenities.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (step === 3 && bookingData.selectedEvtol) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
            ← Back
          </Button>
          <h2 className="font-bold">Confirm Booking</h2>
          <div></div>
        </div>

        <Card className="bg-sky-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{bookingData.selectedEvtol.image}</span>
              <div>
                <div className="font-medium">{bookingData.selectedEvtol.name}</div>
                <div className="text-sm text-gray-600">{bookingData.selectedEvtol.type}</div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Route:</span>
                <span>{bookingData.pickup} → {bookingData.destination}</span>
              </div>
              <div className="flex justify-between">
                <span>Passengers:</span>
                <span>{bookingData.passengers}</span>
              </div>
              <div className="flex justify-between">
                <span>Flight Time:</span>
                <span>{bookingData.selectedEvtol.flightTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Altitude:</span>
                <span>{bookingData.selectedEvtol.altitude}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <h3 className="font-medium">Pricing Breakdown</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Base Fare:</span>
              <span>₹{bookingData.selectedEvtol.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & Fees:</span>
              <span>₹{(bookingData.selectedEvtol.price * 0.12).toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-1">
              <span>Total:</span>
              <span>₹{(bookingData.selectedEvtol.price * 1.12).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-blue-500" />
            <span className="font-medium text-blue-700">Secure Booking Process</span>
          </div>
          <p className="text-xs text-blue-600 mt-1">
            You'll receive an OTP on your registered mobile number to confirm this booking
          </p>
        </div>

        <Button className="w-full bg-sky-500 hover:bg-sky-600" onClick={handleBookingConfirm}>
          <Zap className="mr-2 h-4 w-4" />
          Proceed to Secure Booking
        </Button>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-sky-500" />
          </div>
          <h2 className="font-bold text-lg">Verify Your Booking</h2>
          <p className="text-sm text-gray-600 mt-2">
            We've sent a 6-digit OTP to your registered mobile number
          </p>
        </div>

        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">Booking ID: {bookingData.bookingId}</p>
              <p className="text-xs text-gray-600">
                {bookingData.pickup} → {bookingData.destination}
              </p>
              <p className="text-xs text-gray-600">
                {bookingData.selectedEvtol.name} • ₹{(bookingData.selectedEvtol.price * 1.12).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <label className="text-sm font-medium">Enter OTP</label>
          <div className="flex justify-center">
            <InputOTP
              value={otpValue}
              onChange={(value) => setOtpValue(value)}
              maxLength={6}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        <Button 
          className="w-full bg-sky-500 hover:bg-sky-600" 
          onClick={handleOtpSubmit}
          disabled={otpValue.length !== 6}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Confirm Booking
        </Button>

        <Button variant="ghost" className="w-full text-xs">
          Didn't receive OTP? Resend in 30s
        </Button>
      </div>
    );
  }

  if (step === 5) {
    return (
      <div className="space-y-4 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        
        <div>
          <h2 className="font-bold text-lg text-green-700">Booking Confirmed!</h2>
          <p className="text-sm text-gray-600 mt-2">
            Your SkyRide has been successfully booked
          </p>
        </div>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Booking ID:</span>
                <span className="font-medium">{bookingData.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span>Pickup Time:</span>
                <span className="font-medium">Now + 15 min</span>
              </div>
              <div className="flex justify-between">
                <span>Pilot:</span>
                <span className="font-medium">Captain Suresh Kumar</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Button className="w-full bg-green-500 hover:bg-green-600">
            <Clock className="mr-2 h-4 w-4" />
            Track Live Flight
          </Button>
          
          <Button variant="outline" className="w-full" onClick={() => setStep(1)}>
            Book Another Ride
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default BookingInterface;
