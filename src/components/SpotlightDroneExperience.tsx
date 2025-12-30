
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Star, Heart, Gift, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SpotlightBookingFlow from "./SpotlightBookingFlow";

const SpotlightDroneExperience = () => {
  const [showBookingFlow, setShowBookingFlow] = useState(false);
  const navigate = useNavigate();

  if (showBookingFlow) {
    return <SpotlightBookingFlow onBack={() => setShowBookingFlow(false)} />;
  }

  const benefits = [
    {
      icon: Star,
      title: "Be the Star",
      description: "Get highlighted in front of thousands of fans"
    },
    {
      icon: Heart,
      title: "Perfect for Special Moments",
      description: "Birthdays, anniversaries, proposals, celebrations"
    },
    {
      icon: Gift,
      title: "Unforgettable Memories",
      description: "Create memories that will last a lifetime"
    },
    {
      icon: Camera,
      title: "Professional Coverage",
      description: "High-quality footage delivered to you after the event"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/esports")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-lg font-semibold">Spotlight Experience</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
            <Camera className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Be the Star of the Stadium!
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the thrill of being highlighted by our state-of-the-art drone system. 
            Perfect for special occasions and creating unforgettable memories.
          </p>
          <Badge variant="secondary" className="text-sm">
            🔥 Most Popular Experience
          </Badge>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <Card className="bg-white border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold">Book Your Slot</h3>
                <p className="text-sm text-muted-foreground">
                  Choose your event, seats, and spotlight package
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <h3 className="font-semibold">Enjoy the Game</h3>
                <p className="text-sm text-muted-foreground">
                  Our drone will find and highlight you during the event
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="font-semibold">Get Your Souvenir</h3>
                <p className="text-sm text-muted-foreground">
                  Receive professional footage after the event
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center space-y-4">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
            onClick={() => setShowBookingFlow(true)}
          >
            Book Now - Starting from $25
          </Button>
          <p className="text-sm text-muted-foreground">
            Secure your spotlight moment today. Limited slots available per event.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpotlightDroneExperience;
