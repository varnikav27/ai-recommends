import { GoogleGenerativeAI } from '@google/generative-ai';
import type { TripPlan, TripRecommendation, UserVibe, PackingRecommendation } from '../types';

// Note: API key should ONLY come from environment variables for security
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;

if (API_KEY) {
  console.log('🔑 Gemini API Key Status:', `${API_KEY.substring(0, 8)}...${API_KEY.substring(API_KEY.length - 4)}`);
  console.log('🔑 API Key Length:', API_KEY.length);
  console.log('🔑 Source: Environment variable');
  console.log('🤖 Model: gemini-2.0-flash');
  genAI = new GoogleGenerativeAI(API_KEY);
  console.log('✅ GoogleGenerativeAI instance created successfully with API key');
} else {
  console.log('⚠️ No VITE_GEMINI_API_KEY found in environment variables');
  console.log('💡 Create a .env file with: VITE_GEMINI_API_KEY=your-api-key-here');
  console.log('🔄 Will use mock data for demonstrations');
}

export const generateTripRecommendation = async (
  userVibe: UserVibe,
  tripPlan: TripPlan
): Promise<TripRecommendation> => {
  console.log('\n🚀 GEMINI API CALL - Trip Recommendation Started');
  console.log('📍 API Key Available:', !!genAI);
  console.log('👤 User Vibe:', userVibe);
  console.log('🎯 Trip Plan:', tripPlan);

  // Check if we should use real API or mock data
  if (!genAI || !API_KEY) {
    console.log('⚠️ Using MOCK data - No valid API key provided');
    return getMockRecommendation(userVibe, tripPlan);
  }

  console.log('🎯 Using REAL Gemini API for trip recommendations!');

  try {
    console.log('🔄 Initializing Gemini model...');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    console.log('✅ Gemini model initialized successfully (gemini-2.0-flash)');

    const prompt = `
    Create a personalized travel recommendation based on the following user preferences:
    
    User Profile:
    - Age: ${userVibe.age}
    - Gender: ${userVibe.gender}
    - Preferred destinations: ${userVibe.preferredDestinationType}
    ${userVibe.persona ? `- Travel Persona: ${userVibe.persona.name} - ${userVibe.persona.description}` : ''}
    ${userVibe.persona ? `- Persona Traits: ${userVibe.persona.traits.join(', ')}` : ''}
    
    Trip Details:
    - Traveling FROM: ${tripPlan.fromLocation}
    - Traveling TO: ${tripPlan.destination}
    - Start Date: ${tripPlan.startDate?.toDateString()}
    - End Date: ${tripPlan.endDate?.toDateString()}
    - Travel companions: ${tripPlan.companions}
    - Preferred vibes: ${tripPlan.vibes.join(', ')}
    
    Please provide a detailed travel recommendation in JSON format with the following structure:
    {
      "title": "Creative title for the trip",
      "description": "Brief engaging description",
      "activities": ["List of 5-7 specific activities"],
      "accommodation": "Accommodation recommendation with specific details",
      "transportation": "Transportation suggestions from ${tripPlan.fromLocation} to ${tripPlan.destination}",
      "budget": {
        "flights": "Flight cost estimate from ${tripPlan.fromLocation}",
        "accommodation": "Accommodation cost estimate",
        "activities": "Activities cost estimate", 
        "food": "Food and dining cost estimate",
        "transportation": "Local transportation cost estimate",
        "total_estimate": "Total trip cost estimate"
      },
      "highlights": ["List of 4-6 unique highlights or must-see spots"]
    }
    
    Make the recommendations specific to the destination, consider the travel persona traits, and align with the user's age, preferences, and desired vibes. Include specific transportation options from ${tripPlan.fromLocation} to ${tripPlan.destination}.
    `;

    console.log('\n📝 PROMPT SENT TO GEMINI:');
    console.log('═'.repeat(80));
    console.log(prompt);
    console.log('═'.repeat(80));

    console.log('\n🔄 Sending request to Gemini API...');
    console.log('🌐 API Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent');
    const startTime = Date.now();
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const endTime = Date.now();
    console.log(`⏱️ API Response time: ${endTime - startTime}ms`);
    
    console.log('\n📨 RAW RESPONSE FROM GEMINI:');
    console.log('═'.repeat(80));
    console.log(text);
    console.log('═'.repeat(80));
    
    // Extract JSON from markdown code blocks or direct JSON
    let jsonString = '';
    
    // First try to extract from markdown code blocks
    const markdownMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (markdownMatch) {
      jsonString = markdownMatch[1];
      console.log('\n🎯 EXTRACTED FROM MARKDOWN:');
    } else {
      // Fallback to direct JSON extraction
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonString = jsonMatch[0];
        console.log('\n🎯 EXTRACTED DIRECT JSON:');
      }
    }
    
    if (jsonString) {
      console.log(jsonString);
      
      try {
        const recommendation = JSON.parse(jsonString);
        console.log('\n✅ PARSED RECOMMENDATION SUCCESSFULLY:');
        console.log(JSON.stringify(recommendation, null, 2));
        return recommendation;
      } catch (parseError) {
        console.error('❌ JSON PARSING ERROR:', parseError);
        console.error('❌ Failed to parse:', jsonString.substring(0, 200) + '...');
        console.log('🔄 Falling back to mock data');
        return getMockRecommendation(userVibe, tripPlan);
      }
    }
    
    console.log('❌ No valid JSON found in response, using mock data');
    return getMockRecommendation(userVibe, tripPlan);
  } catch (error) {
    console.error('\n❌ ERROR generating recommendation:', error);
    if (error instanceof Error) {
      console.error('📋 Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    console.log('🔄 Falling back to mock data');
    return getMockRecommendation(userVibe, tripPlan);
  }
};

const getMockRecommendation = (userVibe: UserVibe, tripPlan: TripPlan): TripRecommendation => {
  const isBeachDestination = userVibe.preferredDestinationType === 'beaches';
  const destinationName = tripPlan.destination || (isBeachDestination ? 'Paradise Beach' : 'Mountain Retreat');
  
  return {
    title: `${isBeachDestination ? '🏖️ Ultimate Beach' : '⛰️ Mountain Adventure'} Experience in ${destinationName}`,
    description: `A perfectly curated ${tripPlan.vibes.join(' & ').toLowerCase()} experience designed for ${tripPlan.companions === 'solo' ? 'solo travelers' : tripPlan.companions + ' trips'}.`,
    activities: isBeachDestination ? [
      'Sunrise beach yoga and meditation session',
      'Snorkeling in crystal-clear waters',
      'Local seafood cooking class',
      'Sunset catamaran cruise',
      'Beachside spa treatments',
      'Island hopping adventure',
      'Local market and cultural tour'
    ] : [
      'Guided mountain hiking with scenic viewpoints',
      'Cable car rides to summit peaks',
      'Local mountain village exploration',
      'Traditional mountain cuisine experience',
      'Nature photography workshops',
      'Mountain biking trails',
      'Stargazing and campfire evenings'
    ],
    accommodation: isBeachDestination 
      ? 'Luxury beachfront resort with ocean view suites, infinity pool, and direct beach access. Includes spa services and multiple dining options.'
      : 'Cozy mountain lodge with panoramic valley views, fireplace suites, and access to hiking trails. Features local cuisine and wellness facilities.',
    transportation: 'Airport pickup included, local transportation via comfortable shuttle service, plus bike/scooter rentals for independent exploration.',
    budget: `Estimated $${userVibe.age < 25 ? '150-250' : userVibe.age < 40 ? '250-400' : '300-500'} per day including accommodation, meals, and activities. Flight costs not included.`,
    highlights: isBeachDestination ? [
      'Private beach access with premium amenities',
      'Exclusive sunset viewpoints off the beaten path',
      'Meet local artisans and learn traditional crafts',
      'Hidden cenotes and secret swimming spots',
      'Local music and cultural performances',
      'Farm-to-table dining experiences'
    ] : [
      'Breathtaking sunrise from mountain peaks',
      'Authentic local mountain culture immersion',
      'Rare wildlife spotting opportunities',
      'Traditional mountain crafts workshops',
      'Scenic train rides through valleys',
      'Natural hot springs and wellness retreats'
    ]
  };
};

export const generatePackingRecommendation = async (
  destination: string,
  startDate: Date | null,
  endDate: Date | null,
  tripVibe: string,
  userVibe?: UserVibe,
  fromLocation?: string
): Promise<PackingRecommendation> => {
  console.log('\n🎒 GEMINI API CALL - Packing Recommendation Started');
  console.log('📍 API Key Available:', !!genAI);
  console.log('🌍 Destination:', destination);
  console.log('📅 Dates:', startDate?.toDateString(), 'to', endDate?.toDateString());
  console.log('✨ Trip Vibe:', tripVibe);

  // Check if we should use real API or mock data
  if (!genAI || !API_KEY) {
    console.log('⚠️ Using MOCK packing data - No valid API key provided');
    return getMockPackingRecommendation(destination, tripVibe);
  }

  console.log('🎯 Using REAL Gemini API for packing recommendations!');

  try {
    console.log('🔄 Initializing Gemini model for packing recommendations...');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    console.log('✅ Gemini model initialized successfully (gemini-2.0-flash)');

    const prompt = `You are an expert travel assistant called VibePack AI. A user is traveling from ${fromLocation || 'India'} to ${destination} from ${startDate?.toDateString() || 'unspecified date'} to ${endDate?.toDateString() || 'unspecified date'} for a ${tripVibe} trip.

${userVibe?.persona ? `The traveler identifies as "${userVibe.persona.name}" - ${userVibe.persona.description}` : ''}
${userVibe?.persona ? `Key traits: ${userVibe.persona.traits.join(', ')}` : ''}

Based on the typical weather, local culture, activities for this trip, and the traveler's persona, generate a personalized packing list.

The output must be in JSON format with three main keys: "clothing", "essentials", and "shopTheLook".

- Under "clothing", create categories like "Daytime Wear", "Evening Outfits", and "Activity-Specific". For each item, provide a short, helpful tip.
- Under "essentials", list other important non-clothing items (consider items needed for travel from ${fromLocation || 'India'}).
- Under "shopTheLook", provide exactly 3 fictional but realistic product suggestions a user might want to buy, including a name, a one-sentence description, and a price.

Example structure:
{
  "clothing": {
    "Daytime Wear": [
      {
        "item": "Classic Trench Coat",
        "tip": "Essential for unpredictable weather. It's chic, versatile, and perfect for layering over sweaters."
      }
    ],
    "Evening Outfits": [
      {
        "item": "Little Black Dress",
        "tip": "Perfect for a romantic dinner or elegant evening out."
      }
    ],
    "Activity-Specific": [
      {
        "item": "Crossbody Bag",
        "tip": "For exploring and shopping, keeps your hands free and belongings safe."
      }
    ]
  },
  "essentials": [
    {
      "item": "Passport & Important Documents",
      "tip": "Keep digital copies in your email or cloud storage as a backup."
    }
  ],
  "shopTheLook": [
    {
      "name": "Travel Silk Scarf",
      "description": "A versatile accessory that adds elegance to any outfit and provides comfort during travel.",
      "price": "$75.00"
    }
  ]
}

Make the recommendations specific to ${destination}, appropriate for ${tripVibe} activities, consider the local climate and culture, and align with the traveler's persona traits.`;

    console.log('\n📝 PACKING PROMPT SENT TO GEMINI:');
    console.log('═'.repeat(80));
    console.log(prompt);
    console.log('═'.repeat(80));

    console.log('\n🔄 Sending packing request to Gemini API...');
    console.log('🌐 API Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent');
    const startTime = Date.now();

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const endTime = Date.now();
    console.log(`⏱️ Packing API Response time: ${endTime - startTime}ms`);
    
    console.log('\n📨 RAW PACKING RESPONSE FROM GEMINI:');
    console.log('═'.repeat(80));
    console.log(text);
    console.log('═'.repeat(80));
    
    // Extract JSON from markdown code blocks or direct JSON
    let jsonString = '';
    
    // First try to extract from markdown code blocks
    const markdownMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (markdownMatch) {
      jsonString = markdownMatch[1];
      console.log('\n🎯 EXTRACTED PACKING FROM MARKDOWN:');
    } else {
      // Fallback to direct JSON extraction
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonString = jsonMatch[0];
        console.log('\n🎯 EXTRACTED DIRECT PACKING JSON:');
      }
    }
    
    if (jsonString) {
      console.log(jsonString);
      
      try {
        const packingRecommendation = JSON.parse(jsonString);
        console.log('\n✅ PARSED PACKING RECOMMENDATION SUCCESSFULLY:');
        console.log(JSON.stringify(packingRecommendation, null, 2));
        return packingRecommendation;
      } catch (parseError) {
        console.error('❌ PACKING JSON PARSING ERROR:', parseError);
        console.error('❌ Failed to parse packing:', jsonString.substring(0, 200) + '...');
        console.log('🔄 Falling back to mock packing data');
        return getMockPackingRecommendation(destination, tripVibe);
      }
    }
    
    console.log('❌ No valid JSON found in packing response, using mock data');
    return getMockPackingRecommendation(destination, tripVibe);
  } catch (error) {
    console.error('\n❌ ERROR generating packing recommendation:', error);
    if (error instanceof Error) {
      console.error('📋 Packing Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    console.log('🔄 Falling back to mock packing data');
    return getMockPackingRecommendation(destination, tripVibe);
  }
};

const getMockPackingRecommendation = (destination: string, tripVibe: string): PackingRecommendation => {
  const isBeachVibe = tripVibe.toLowerCase().includes('beach') || tripVibe.toLowerCase().includes('relaxing');
  
  return {
    clothing: {
      "Daytime Wear": [
        {
          item: isBeachVibe ? "Light Cotton Dresses" : "Comfortable Walking Shoes",
          tip: isBeachVibe ? "Perfect for beach days and keeping cool in the tropical heat." : "Essential for exploring. Choose comfortable yet stylish options for long walking days."
        },
        {
          item: isBeachVibe ? "Sun Hat" : "Layering Pieces",
          tip: isBeachVibe ? "Wide-brim hat for sun protection while maintaining style." : "Weather can be unpredictable. Layer with cardigans or light jackets."
        },
        {
          item: "Sunglasses",
          tip: "Essential for eye protection and completing your travel look."
        }
      ],
      "Evening Outfits": [
        {
          item: isBeachVibe ? "Maxi Dress" : "Smart Casual Outfit",
          tip: isBeachVibe ? "Perfect for beachside dinners and sunset views." : "Versatile for various evening activities and dining options."
        },
        {
          item: "Comfortable Flats or Low Heels",
          tip: "Stylish yet practical for evening walks and activities."
        }
      ],
      "Activity-Specific": [
        {
          item: isBeachVibe ? "Swimwear & Cover-ups" : "Day Pack",
          tip: isBeachVibe ? "Pack 2-3 swimsuits and stylish cover-ups for beach activities." : "Perfect size for day trips and carrying essentials while exploring."
        },
        {
          item: "Crossbody Bag",
          tip: "Keep your hands free and belongings secure while sightseeing."
        }
      ]
    },
    essentials: [
      {
        item: "Passport & Travel Documents",
        tip: "Keep digital copies stored securely in cloud storage as backup."
      },
      {
        item: "Universal Power Adapter",
        tip: "Research the outlet type for your destination and pack accordingly."
      },
      {
        item: "Portable Charger",
        tip: "Essential for long days of exploring and taking photos."
      },
      {
        item: "Travel-Size Toiletries",
        tip: "Pack essentials in TSA-approved sizes to save space and meet regulations."
      },
      {
        item: isBeachVibe ? "Reef-Safe Sunscreen" : "Weather-Appropriate Items",
        tip: isBeachVibe ? "Protect both your skin and the marine environment." : "Check weather forecast and pack accordingly for comfort."
      }
    ],
    shopTheLook: [
      {
        name: `${destination} Memory Scarf`,
        description: "A locally-inspired silk scarf that captures the essence of your destination and doubles as a versatile travel accessory.",
        price: "$85.00"
      },
      {
        name: "Travel Wellness Kit",
        description: "Compact kit with hydrating mist, lip balm, and hand sanitizer to keep you refreshed during your journey.",
        price: "$45.00"
      },
      {
        name: "Explorer's Crossbody",
        description: "Lightweight, water-resistant bag with multiple compartments and anti-theft features for worry-free exploration.",
        price: "$120.00"
      }
    ]
  };
};