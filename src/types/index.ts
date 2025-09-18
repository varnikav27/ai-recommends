// User Personas
export interface UserPersona {
  id: string;
  name: string;
  description: string;
  icon: string;
  traits: string[];
}

export interface UserVibe {
  age: number;
  gender: 'male' | 'female' | 'other';
  preferredDestinationType: 'beaches' | 'mountains' | 'cities' | 'countryside' | 'desert' | 'islands';
  persona?: UserPersona;
}

export interface TripPlan {
  destination: string;
  fromLocation: string;
  startDate: Date | null;
  endDate: Date | null;
  companions: 'solo' | 'partner' | 'family' | 'friends';
  vibes: string[];
}

// Enhanced Vibe Categories
export interface VibeCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

// Validation Types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface TripRecommendation {
  title: string;
  description: string;
  activities: string[];
  accommodation: string;
  transportation: string;
  budget: string | {
    flights?: string;
    accommodation?: string;
    activities?: string;
    food?: string;
    'food & drinks'?: string;
    transportation?: string;
    total_estimate?: string;
    [key: string]: string | undefined;
  };
  highlights: string[];
}

// Packing List Types
export interface PackingItem {
  item: string;
  tip: string;
}

export interface ShopItem {
  name: string;
  description: string;
  price: string;
}

export interface PackingRecommendation {
  clothing: {
    "Daytime Wear": PackingItem[];
    "Evening Outfits": PackingItem[];
    "Activity-Specific": PackingItem[];
  };
  essentials: PackingItem[];
  shopTheLook: ShopItem[];
}

// Style Recommendations
export interface StyleItem {
  item: string;
  description: string;
  category: 'casual' | 'formal' | 'sporty' | 'trendy' | 'classic';
  price: string;
  image?: string;
}

export interface StyleRecommendation {
  theme: string;
  description: string;
  looks: {
    "Day Look": StyleItem[];
    "Evening Look": StyleItem[];
    "Activity Look": StyleItem[];
  };
  accessories: StyleItem[];
  colorPalette: string[];
}