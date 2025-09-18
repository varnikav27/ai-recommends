import type { UserPersona, VibeCategory } from '../types';

// User Personas
export const USER_PERSONAS: UserPersona[] = [
  {
    id: 'adventurer',
    name: 'The Adventurer',
    description: 'Thrill-seeker who loves outdoor activities, extreme sports, and exploring off-the-beaten-path destinations.',
    icon: '🏔️',
    traits: ['Risk-taker', 'Nature lover', 'Athletic', 'Spontaneous']
  },
  {
    id: 'culture-enthusiast',
    name: 'The Culture Enthusiast',
    description: 'Passionate about history, art, museums, and immersing in local cultures and traditions.',
    icon: '🏛️',
    traits: ['Curious', 'Educational', 'Artistic', 'Thoughtful']
  },
  {
    id: 'luxury-traveler',
    name: 'The Luxury Traveler',
    description: 'Enjoys premium experiences, fine dining, luxury accommodations, and exclusive activities.',
    icon: '🥂',
    traits: ['Sophisticated', 'Quality-focused', 'Comfortable', 'Exclusive']
  },
  {
    id: 'budget-explorer',
    name: 'The Budget Explorer',
    description: 'Smart traveler who maximizes experiences while minimizing costs, loves local finds and authentic experiences.',
    icon: '🎒',
    traits: ['Resourceful', 'Local-focused', 'Authentic', 'Practical']
  },
  {
    id: 'wellness-seeker',
    name: 'The Wellness Seeker',
    description: 'Focuses on relaxation, rejuvenation, spa treatments, yoga retreats, and mental well-being.',
    icon: '🧘‍♀️',
    traits: ['Mindful', 'Health-conscious', 'Peaceful', 'Restorative']
  },
  {
    id: 'foodie',
    name: 'The Foodie',
    description: 'Travels primarily for culinary experiences, local cuisines, food tours, and cooking classes.',
    icon: '🍜',
    traits: ['Culinary-curious', 'Experimental', 'Social', 'Sensory']
  },
  {
    id: 'social-connector',
    name: 'The Social Connector',
    description: 'Loves meeting new people, group activities, nightlife, and creating lasting connections.',
    icon: '🎉',
    traits: ['Outgoing', 'Social', 'Energetic', 'Networking']
  },
  {
    id: 'romantic',
    name: 'The Romantic',
    description: 'Seeks intimate, couples-focused experiences, romantic dinners, sunset views, and memorable moments.',
    icon: '💕',
    traits: ['Intimate', 'Romantic', 'Aesthetic', 'Memorable']
  }
];

// Enhanced Vibe Categories
export const VIBE_CATEGORIES: VibeCategory[] = [
  {
    id: 'adventure',
    name: 'Adventure',
    description: 'Thrilling outdoor activities and extreme sports',
    icon: '🏔️',
    color: 'bg-orange-500'
  },
  {
    id: 'relaxation',
    name: 'Relaxation',
    description: 'Peaceful and rejuvenating experiences',
    icon: '🧘‍♀️',
    color: 'bg-blue-500'
  },
  {
    id: 'cultural',
    name: 'Cultural',
    description: 'Museums, historical sites, and local traditions',
    icon: '🏛️',
    color: 'bg-purple-500'
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Premium experiences and high-end accommodations',
    icon: '🥂',
    color: 'bg-yellow-500'
  },
  {
    id: 'budget',
    name: 'Budget-Friendly',
    description: 'Affordable experiences with great value',
    icon: '💰',
    color: 'bg-green-500'
  },
  {
    id: 'nightlife',
    name: 'Nightlife',
    description: 'Vibrant nightlife, bars, and entertainment',
    icon: '🌃',
    color: 'bg-pink-500'
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Wildlife, national parks, and natural beauty',
    icon: '🌿',
    color: 'bg-emerald-500'
  },
  {
    id: 'food',
    name: 'Culinary',
    description: 'Local cuisines, food tours, and dining experiences',
    icon: '🍜',
    color: 'bg-red-500'
  },
  {
    id: 'romantic',
    name: 'Romantic',
    description: 'Intimate experiences perfect for couples',
    icon: '💕',
    color: 'bg-rose-500'
  },
  {
    id: 'photography',
    name: 'Photography',
    description: 'Instagram-worthy spots and scenic photography',
    icon: '📸',
    color: 'bg-indigo-500'
  },
  {
    id: 'wellness',
    name: 'Wellness',
    description: 'Spa treatments, yoga, and health-focused activities',
    icon: '💆‍♀️',
    color: 'bg-teal-500'
  },
  {
    id: 'shopping',
    name: 'Shopping',
    description: 'Local markets, boutiques, and shopping districts',
    icon: '🛍️',
    color: 'bg-violet-500'
  }
];

// Default From Location
export const DEFAULT_FROM_LOCATION = {
  city: 'Delhi',
  country: 'India',
  displayName: 'Delhi, India'
};

// Popular Indian Cities for From Location
export const INDIAN_CITIES = [
  { value: 'Delhi, India', label: 'Delhi' },
  { value: 'Mumbai, India', label: 'Mumbai' },
  { value: 'Bangalore, India', label: 'Bangalore' },
  { value: 'Chennai, India', label: 'Chennai' },
  { value: 'Kolkata, India', label: 'Kolkata' },
  { value: 'Hyderabad, India', label: 'Hyderabad' },
  { value: 'Pune, India', label: 'Pune' },
  { value: 'Ahmedabad, India', label: 'Ahmedabad' },
  { value: 'Jaipur, India', label: 'Jaipur' },
  { value: 'Goa, India', label: 'Goa' }
];
