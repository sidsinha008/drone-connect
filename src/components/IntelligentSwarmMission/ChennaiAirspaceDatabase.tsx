
import { AirspaceZone } from "./types";

export const chennaiAirspaceZones: AirspaceZone[] = [
  // No-Fly Zones (NFZ)
  {
    id: "nfz-chennai-airport",
    name: "Chennai International Airport",
    type: "NFZ",
    coordinates: [
      { lat: 12.9941, lng: 80.1709 },
      { lat: 12.9741, lng: 80.1509 },
      { lat: 12.9541, lng: 80.1909 },
      { lat: 12.9841, lng: 80.2109 }
    ],
    active: true,
    description: "Primary commercial airport - 5km radius NFZ",
    authority: "AAI (Airports Authority of India)"
  },
  {
    id: "nfz-tambaram-airbase",
    name: "Tambaram Air Force Station",
    type: "NFZ",
    coordinates: [
      { lat: 12.9226, lng: 80.1194 },
      { lat: 12.9026, lng: 80.0994 },
      { lat: 12.8826, lng: 80.1394 },
      { lat: 12.9126, lng: 80.1594 }
    ],
    active: true,
    description: "Military airbase - Permanent NFZ",
    authority: "Indian Air Force"
  },
  {
    id: "nfz-avadi-defence",
    name: "Avadi Defence Establishments",
    type: "NFZ",
    coordinates: [
      { lat: 13.1147, lng: 79.9106 },
      { lat: 13.0947, lng: 79.8906 },
      { lat: 13.0747, lng: 79.9306 },
      { lat: 13.1047, lng: 79.9506 }
    ],
    active: true,
    description: "Defence production facilities",
    authority: "Ministry of Defence"
  },

  // Restricted Zones (RZ)
  {
    id: "rz-kalpakkam-nuclear",
    name: "Kalpakkam Nuclear Power Plant",
    type: "RZ",
    coordinates: [
      { lat: 12.5502, lng: 80.1726 },
      { lat: 12.5302, lng: 80.1526 },
      { lat: 12.5102, lng: 80.1926 },
      { lat: 12.5402, lng: 80.2126 }
    ],
    active: true,
    description: "Nuclear facility - 10km restricted zone",
    authority: "NPCIL (Nuclear Power Corporation of India)"
  },
  {
    id: "rz-fort-st-george",
    name: "Fort St. George",
    type: "RZ",
    coordinates: [
      { lat: 13.0839, lng: 80.2875 },
      { lat: 13.0739, lng: 80.2775 },
      { lat: 13.0639, lng: 80.2975 },
      { lat: 13.0839, lng: 80.3075 }
    ],
    active: true,
    description: "Government secretariat complex",
    authority: "Tamil Nadu State Government"
  },
  {
    id: "rz-raj-bhavan",
    name: "Raj Bhavan",
    type: "RZ",
    coordinates: [
      { lat: 13.0567, lng: 80.2679 },
      { lat: 13.0467, lng: 80.2579 },
      { lat: 13.0367, lng: 80.2779 },
      { lat: 13.0567, lng: 80.2879 }
    ],
    active: true,
    description: "Governor's residence",
    authority: "Tamil Nadu State Government"
  },

  // Temporary Flight Restrictions (TFR)
  {
    id: "tfr-chepauk-stadium",
    name: "Chepauk Stadium",
    type: "TFR",
    coordinates: [
      { lat: 13.0645, lng: 80.2796 },
      { lat: 13.0545, lng: 80.2696 },
      { lat: 13.0445, lng: 80.2896 },
      { lat: 13.0645, lng: 80.2996 }
    ],
    active: true,
    description: "IPL Match - Chennai Super Kings vs Mumbai Indians",
    authority: "TNCA (Tamil Nadu Cricket Association)",
    validUntil: "Jun 18, 2025, 11:30 PM IST"
  },
  {
    id: "tfr-anna-salai-parade",
    name: "Anna Salai - Independence Day Parade",
    type: "TFR",
    coordinates: [
      { lat: 13.0617, lng: 80.2575 },
      { lat: 13.0417, lng: 80.2375 },
      { lat: 13.0217, lng: 80.2775 },
      { lat: 13.0517, lng: 80.2975 }
    ],
    active: false,
    description: "Annual Independence Day celebrations",
    authority: "Chennai City Police",
    validUntil: "Aug 15, 2025, 6:00 PM IST"
  },
  {
    id: "tfr-vip-movement",
    name: "VIP Movement Corridor",
    type: "TFR",
    coordinates: [
      { lat: 13.0478, lng: 80.2573 },
      { lat: 13.0278, lng: 80.2373 },
      { lat: 13.0078, lng: 80.2773 },
      { lat: 13.0378, lng: 80.2973 }
    ],
    active: true,
    description: "Prime Minister visit - Security corridor",
    authority: "SPG (Special Protection Group)",
    validUntil: "Jun 20, 2025, 8:00 PM IST"
  },

  // Custom Geofences
  {
    id: "custom-hitec-city",
    name: "HITEC City Security Perimeter",
    type: "CUSTOM",
    coordinates: [
      { lat: 13.0067, lng: 80.2400 },
      { lat: 12.9867, lng: 80.2200 },
      { lat: 12.9667, lng: 80.2600 },
      { lat: 12.9967, lng: 80.2800 }
    ],
    active: true,
    description: "Corporate security zone for sensitive meetings"
  },
  {
    id: "custom-port-security",
    name: "Chennai Port Trust",
    type: "CUSTOM",
    coordinates: [
      { lat: 13.1124, lng: 80.3007 },
      { lat: 13.0924, lng: 80.2807 },
      { lat: 13.0724, lng: 80.3207 },
      { lat: 13.1024, lng: 80.3407 }
    ],
    active: true,
    description: "Port security and customs enforcement zone"
  }
];

// Mock function to simulate DGCA Digital Sky API integration
export const fetchDGCAUpdates = async (): Promise<AirspaceZone[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return simulated TFR updates
  return [
    {
      id: "tfr-dgca-emergency-" + Date.now(),
      name: "Emergency Helicopter Landing Zone",
      type: "TFR",
      coordinates: [
        { lat: 13.0345, lng: 80.2456 },
        { lat: 13.0245, lng: 80.2356 },
        { lat: 13.0145, lng: 80.2556 },
        { lat: 13.0345, lng: 80.2656 }
      ],
      active: true,
      description: "Emergency medical helicopter operations",
      authority: "DGCA",
      validUntil: new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleString() // 2 hours from now
    }
  ];
};
