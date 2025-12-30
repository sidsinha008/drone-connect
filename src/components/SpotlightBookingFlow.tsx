
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle, Upload, Star, Users, Zap } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SpotlightBookingFlowProps {
  onBack: () => void;
}

const SpotlightBookingFlow = ({ onBack }: SpotlightBookingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    event: "",
    section: "",
    row: "",
    seat: "",
    package: "",
    message: "",
    photo: null as File | null,
    faceRecognitionConsent: false,
    imageCaptureConsent: false,
    paymentMethod: ""
  });

  const totalSteps = 5;

  const packages = [
    {
      id: "basic",
      name: "Basic Spotlight",
      price: "$25",
      features: ["30-second spotlight", "Standard camera angle", "Digital photo delivery"],
      recommended: false
    },
    {
      id: "premium", 
      name: "Premium Spotlight",
      price: "$45",
      features: ["60-second spotlight", "Multiple camera angles", "HD video + photos", "Custom message display"],
      recommended: true
    },
    {
      id: "group",
      name: "Group Spotlight", 
      price: "$75",
      features: ["90-second spotlight", "Group coverage up to 6 people", "Premium video package", "Social media ready content"],
      recommended: false
    }
  ];

  const events = [
    "Vs. Rival Team - June 15th",
    "Championship Finals - June 22nd", 
    "Season Opener - July 1st",
    "Derby Match - July 8th"
  ];

  const paymentMethods = [
    { id: "credit", name: "Credit Card" },
    { id: "apple", name: "Apple Pay" },
    { id: "google", name: "Google Pay" },
    { id: "paypal", name: "PayPal" }
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.event && formData.section && formData.row && formData.seat;
      case 2:
        return formData.package;
      case 3:
        return formData.faceRecognitionConsent && formData.imageCaptureConsent;
      case 4:
        return formData.paymentMethod;
      default:
        return true;
    }
  };

  const getSelectedPackage = () => {
    return packages.find(pkg => pkg.id === formData.package);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>1. Choose Your Event & Seats</CardTitle>
              <CardDescription>
                Select the event and provide your exact seat location for precise drone targeting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="event">Select Event</Label>
                <Select value={formData.event} onValueChange={(value) => setFormData({...formData, event: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your event" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event} value={event}>{event}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="section">Section</Label>
                  <Input 
                    id="section"
                    placeholder="e.g. A"
                    value={formData.section}
                    onChange={(e) => setFormData({...formData, section: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="row">Row</Label>
                  <Input 
                    id="row"
                    placeholder="e.g. 12"
                    value={formData.row}
                    onChange={(e) => setFormData({...formData, row: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="seat">Seat</Label>
                  <Input 
                    id="seat"
                    placeholder="e.g. 5"
                    value={formData.seat}
                    onChange={(e) => setFormData({...formData, seat: e.target.value})}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                💡 Please be precise with your seat location for accurate drone targeting
              </p>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>2. Select Your Package</CardTitle>
              <CardDescription>
                Choose the spotlight experience that's right for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={formData.package} 
                onValueChange={(value) => setFormData({...formData, package: value})}
                className="space-y-4"
              >
                {packages.map((pkg) => (
                  <div key={pkg.id} className="relative">
                    <label className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.package === pkg.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <RadioGroupItem value={pkg.id} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{pkg.name}</h3>
                          <span className="font-bold text-blue-600">{pkg.price}</span>
                          {pkg.recommended && (
                            <Badge className="bg-orange-100 text-orange-600 border-orange-200">
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>3. Personalize & Confirm</CardTitle>
              <CardDescription>
                Add personal touches and provide necessary consents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {(formData.package === "premium" || formData.package === "group") && (
                <div>
                  <Label htmlFor="message">Custom Message (Optional)</Label>
                  <Textarea 
                    id="message"
                    placeholder="e.g. Happy Birthday, John!"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    maxLength={50}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.message.length}/50 characters
                  </p>
                </div>
              )}
              
              <div>
                <Label>Photo Upload (Optional)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Upload a clear photo to help with facial recognition
                  </p>
                  <Button variant="outline" className="mt-2">
                    Tap to Upload Photo
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Required Consents</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="face-recognition"
                      checked={formData.faceRecognitionConsent}
                      onCheckedChange={(checked) => setFormData({...formData, faceRecognitionConsent: !!checked})}
                    />
                    <Label htmlFor="face-recognition" className="text-sm leading-relaxed">
                      I consent to the use of facial recognition technology to identify me during the event
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="image-capture"
                      checked={formData.imageCaptureConsent}
                      onCheckedChange={(checked) => setFormData({...formData, imageCaptureConsent: !!checked})}
                    />
                    <Label htmlFor="image-capture" className="text-sm leading-relaxed">
                      I consent to being photographed/recorded and having my image displayed during the event
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        const selectedPackage = getSelectedPackage();
        return (
          <Card>
            <CardHeader>
              <CardTitle>4. Review & Pay</CardTitle>
              <CardDescription>
                Review your booking details and complete payment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h3 className="font-semibold">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Event:</span>
                    <span className="font-medium">{formData.event}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seat:</span>
                    <span className="font-medium">Section {formData.section}, Row {formData.row}, Seat {formData.seat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Package:</span>
                    <span className="font-medium">{selectedPackage?.name}</span>
                  </div>
                  {formData.message && (
                    <div className="flex justify-between">
                      <span>Message:</span>
                      <span className="font-medium">"{formData.message}"</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">{selectedPackage?.price}</span>
                  </div>
                </div>
              </div>

              <div>
                <Label>Payment Method</Label>
                <RadioGroup 
                  value={formData.paymentMethod} 
                  onValueChange={(value) => setFormData({...formData, paymentMethod: value})}
                  className="mt-2"
                >
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={method.id} />
                      <Label>{method.name}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card className="text-center">
            <CardHeader>
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">Spotlight Booked!</CardTitle>
              <CardDescription>
                Your spotlight experience has been confirmed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg space-y-2 text-left">
                <h3 className="font-semibold">Your Spotlight Details</h3>
                <div className="text-sm space-y-1">
                  <p><strong>Event:</strong> {formData.event}</p>
                  <p><strong>Seat:</strong> Section {formData.section}, Row {formData.row}, Seat {formData.seat}</p>
                  <p><strong>Package:</strong> {getSelectedPackage()?.name}</p>
                  <p><strong>Booking ID:</strong> SPT-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg text-left">
                <h3 className="font-semibold mb-2">Tips for Your Spotlight</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Arrive 15 minutes before the scheduled spotlight time</li>
                  <li>• Wear bright colors to stand out</li>
                  <li>• Have your phone ready for the perfect moment</li>
                  <li>• Wave and smile when you see the drone approaching</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Your Souvenir</h3>
                <p className="text-sm text-muted-foreground">
                  Your professional photos and videos will be available in the app within 2 hours after the event ends.
                </p>
                <div className="mt-3 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Photo/Video will appear here after the event</p>
                </div>
              </div>

              <Button onClick={onBack} size="lg" className="w-full">
                Back to Home
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            onClick={currentStep === 1 ? onBack : () => setCurrentStep(currentStep - 1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-lg font-semibold">Book Spotlight</h1>
          <div className="text-sm text-muted-foreground">
            {currentStep}/{totalSteps}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-1">
          <div 
            className="bg-blue-600 h-1 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6">
        {renderStep()}
        
        {currentStep < 5 && (
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
              className="flex items-center gap-2"
            >
              {currentStep === 4 ? "Confirm & Pay" : "Next"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotlightBookingFlow;
