import { Calendar, MapPin, Sparkles, Users } from 'lucide-react';
import React from 'react';
import type { TripPlan, UserVibe } from '../types';

interface StepTwoProps {
  userVibe: UserVibe;
  tripPlan: TripPlan;
  updateTripPlan: (updates: Partial<TripPlan>) => void;
  onBack: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const StepTwo: React.FC<StepTwoProps> = ({
  userVibe,
  tripPlan,
  updateTripPlan,
  onBack,
  onGenerate,
  isGenerating
}) => {
  const companionOptions = [
    { id: 'solo', label: 'Solo', icon: '👤' },
    { id: 'partner', label: 'Partner', icon: '💑' },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { id: 'friends', label: 'Friends', icon: '👥' }
  ];

  const vibeOptions = [
    'Relaxation', 'Adventure', 'Luxury', 'Budget', 'Culture', 'Party'
  ];

  const toggleVibe = (vibe: string) => {
    const currentVibes = tripPlan.vibes || [];
    const updatedVibes = currentVibes.includes(vibe)
      ? currentVibes.filter(v => v !== vibe)
      : [...currentVibes, vibe];
    updateTripPlan({ vibes: updatedVibes });
  };

  const getVibeLabel = () => {
    if (userVibe.preferredDestinationType === 'beaches') return 'Beach Explorer';
    return 'Mountain Adventurer';
  };

  const isComplete = tripPlan.destination && tripPlan.startDate && tripPlan.endDate && tripPlan.companions && tripPlan.vibes.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex min-h-screen">
        {/* Sidebar - Your Vibe */}
        <div className="w-80 bg-white shadow-xl p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Your Vibe</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-gray-700 font-medium">{getVibeLabel()}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-gray-700 font-medium">{userVibe.age} years old</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-gray-700 font-medium capitalize">{userVibe.gender}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-12">
              Plan Your Perfect Trip
            </h1>

            {/* Destination & Dates */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              <div className="lg:col-span-1">
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  <MapPin className="inline w-5 h-5 mr-2" />
                  Where to?
                </label>
                <input
                  type="text"
                  value={tripPlan.destination}
                  onChange={(e) => updateTripPlan({ destination: e.target.value })}
                  placeholder="Tokyo, Japan"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  <Calendar className="inline w-5 h-5 mr-2" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={tripPlan.startDate ? tripPlan.startDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => updateTripPlan({ startDate: e.target.value ? new Date(e.target.value) : null })}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  End Date
                </label>
                <input
                  type="date"
                  value={tripPlan.endDate ? tripPlan.endDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => updateTripPlan({ endDate: e.target.value ? new Date(e.target.value) : null })}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Who's going? */}
            <div className="mb-12">
              <label className="block text-lg font-medium text-gray-700 mb-6">
                <Users className="inline w-5 h-5 mr-2" />
                Who's going?
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {companionOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateTripPlan({ companions: option.id as any })}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 text-center ${
                      tripPlan.companions === option.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700 hover:shadow-md'
                    }`}
                  >
                    <div className="text-3xl mb-3">{option.icon}</div>
                    <div className="font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* What's the vibe? */}
            <div className="mb-12">
              <label className="block text-lg font-medium text-gray-700 mb-6">
                <Sparkles className="inline w-5 h-5 mr-2" />
                What's the vibe?
              </label>
              <div className="flex flex-wrap gap-3">
                {vibeOptions.map((vibe) => (
                  <button
                    key={vibe}
                    onClick={() => toggleVibe(vibe)}
                    className={`px-6 py-3 rounded-full border-2 transition-all duration-200 font-medium ${
                      tripPlan.vibes.includes(vibe)
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow-md'
                    }`}
                  >
                    {vibe}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                onClick={onBack}
                className="px-8 py-4 text-lg font-semibold text-gray-600 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                Back
              </button>
              <button
                onClick={onGenerate}
                disabled={!isComplete || isGenerating}
                className={`px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 ${
                  isComplete && !isGenerating
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isGenerating ? 'Generating Your VibePack...' : 'Generate My VibePack'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};