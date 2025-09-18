import React, { useState } from 'react';
import { Calendar, MapPin, Sparkles, Users, ChevronLeft, ArrowRight, AlertCircle, Plane } from 'lucide-react';
import DatePicker from 'react-datepicker';
import type { TripPlan, UserVibe, ValidationError } from '../types';
import { VIBE_CATEGORIES, INDIAN_CITIES, DEFAULT_FROM_LOCATION } from '../data/constants';
import { validator } from '../utils/validation';
import "react-datepicker/dist/react-datepicker.css";

interface StepTwoEnhancedProps {
  userVibe: UserVibe;
  tripPlan: TripPlan;
  updateTripPlan: (updates: Partial<TripPlan>) => void;
  onBack: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const StepTwoEnhanced: React.FC<StepTwoEnhancedProps> = ({
  userVibe,
  tripPlan,
  updateTripPlan,
  onBack,
  onGenerate,
  isGenerating
}) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [selectedVibes, setSelectedVibes] = useState<string[]>(tripPlan.vibes || []);

  const companionOptions = [
    { id: 'solo', label: 'Solo', icon: '👤', description: 'Just me, myself and I' },
    { id: 'partner', label: 'Partner', icon: '💑', description: 'Romantic getaway' },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', description: 'Quality family time' },
    { id: 'friends', label: 'Friends', icon: '👥', description: 'Group adventure' }
  ];

  const getError = (field: string) => errors.find(error => error.field === field);

  const toggleVibe = (vibeId: string) => {
    let updatedVibes = [...selectedVibes];
    
    if (updatedVibes.includes(vibeId)) {
      updatedVibes = updatedVibes.filter(v => v !== vibeId);
    } else if (updatedVibes.length < 5) {
      updatedVibes.push(vibeId);
    }
    
    setSelectedVibes(updatedVibes);
    updateTripPlan({ vibes: updatedVibes });
  };

  const handleGenerate = () => {
    const validation = validator.validateTripPlan(tripPlan);
    setErrors(validation.errors);
    
    if (validation.isValid) {
      onGenerate();
    }
  };

  const handleDateChange = (date: Date | null, field: 'startDate' | 'endDate') => {
    updateTripPlan({ [field]: date });
    
    // Clear date-related errors when user changes dates
    if (errors.some(error => error.field === 'startDate' || error.field === 'endDate')) {
      setErrors(errors.filter(error => error.field !== 'startDate' && error.field !== 'endDate'));
    }
  };

  const getMinEndDate = () => {
    if (tripPlan.startDate) {
      const nextDay = new Date(tripPlan.startDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    }
    return new Date();
  };

  const getTodayDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  const isComplete = tripPlan.destination && tripPlan.fromLocation && tripPlan.startDate && 
                   tripPlan.endDate && tripPlan.companions && tripPlan.vibes.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Plan Your Perfect Trip</h1>
          <p className="text-lg text-gray-600">
            {userVibe.persona && (
              <span className="inline-flex items-center gap-2">
                <span>{userVibe.persona.icon}</span>
                <span>Planning for {userVibe.persona.name}</span>
              </span>
            )}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Back to Basic Info</span>
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* From Location */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Plane size={20} className="text-emerald-500" />
                    Traveling From
                  </label>
                  <select
                    value={tripPlan.fromLocation || DEFAULT_FROM_LOCATION.displayName}
                    onChange={(e) => updateTripPlan({ fromLocation: e.target.value })}
                    className={`w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                      getError('fromLocation') ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {INDIAN_CITIES.map((city) => (
                      <option key={city.value} value={city.value}>
                        {city.label}
                      </option>
                    ))}
                  </select>
                  {getError('fromLocation') && (
                    <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                      <AlertCircle size={16} />
                      <span>{getError('fromLocation')?.message}</span>
                    </div>
                  )}
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <MapPin size={20} className="text-blue-500" />
                    Where do you want to go?
                  </label>
                  <input
                    type="text"
                    value={tripPlan.destination || ''}
                    onChange={(e) => updateTripPlan({ destination: e.target.value })}
                    className={`w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      getError('destination') ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Paris, France or Tokyo, Japan"
                  />
                  {getError('destination') && (
                    <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                      <AlertCircle size={16} />
                      <span>{getError('destination')?.message}</span>
                    </div>
                  )}
                </div>

                {/* Travel Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Calendar size={20} className="text-purple-500" />
                      Start Date
                    </label>
                    <DatePicker
                      selected={tripPlan.startDate}
                      onChange={(date) => handleDateChange(date, 'startDate')}
                      minDate={getTodayDate()}
                      className={`w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        getError('startDate') ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholderText="Select start date"
                      dateFormat="MMM d, yyyy"
                    />
                    {getError('startDate') && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        <span>{getError('startDate')?.message}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      End Date
                    </label>
                    <DatePicker
                      selected={tripPlan.endDate}
                      onChange={(date) => handleDateChange(date, 'endDate')}
                      minDate={getMinEndDate()}
                      className={`w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                        getError('endDate') ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholderText="Select end date"
                      dateFormat="MMM d, yyyy"
                    />
                    {getError('endDate') && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        <span>{getError('endDate')?.message}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Travel Companions */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <Users size={20} className="text-teal-500" />
                    Who's joining you?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {companionOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => updateTripPlan({ companions: option.id as any })}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                          tripPlan.companions === option.id
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : `border-gray-300 hover:border-gray-400 text-gray-700 ${
                              getError('companions') ? 'border-red-300' : ''
                            }`
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{option.icon}</span>
                          <div>
                            <div className="font-semibold">{option.label}</div>
                            <div className="text-sm opacity-75">{option.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {getError('companions') && (
                    <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                      <AlertCircle size={16} />
                      <span>{getError('companions')?.message}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Vibes */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Sparkles size={20} className="text-pink-500" />
                  What's your travel vibe? (Select up to 5)
                </label>
                
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {VIBE_CATEGORIES.map((vibe) => (
                    <div
                      key={vibe.id}
                      onClick={() => toggleVibe(vibe.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedVibes.includes(vibe.id)
                          ? `${vibe.color} border-transparent text-white`
                          : 'border-gray-300 hover:border-gray-400 bg-white'
                      } ${selectedVibes.length >= 5 && !selectedVibes.includes(vibe.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{vibe.icon}</span>
                        <div className="flex-1">
                          <div className="font-semibold">{vibe.name}</div>
                          <div className={`text-sm ${
                            selectedVibes.includes(vibe.id) ? 'text-white text-opacity-90' : 'text-gray-600'
                          }`}>
                            {vibe.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedVibes.length > 0 && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Selected vibes ({selectedVibes.length}/5):</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedVibes.map((vibeId) => {
                        const vibe = VIBE_CATEGORIES.find(v => v.id === vibeId);
                        return vibe ? (
                          <span
                            key={vibeId}
                            className={`px-3 py-1 rounded-full text-sm font-medium text-white ${vibe.color}`}
                          >
                            {vibe.icon} {vibe.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {getError('vibes') && (
                  <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                    <AlertCircle size={16} />
                    <span>{getError('vibes')?.message}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Generate Button */}
            <div className="mt-8 text-center">
              <button
                onClick={handleGenerate}
                disabled={!isComplete || isGenerating}
                className={`inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-200 ${
                  isComplete && !isGenerating
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Creating Your VibePack...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Create My VibePack
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              {!isComplete && (
                <p className="text-gray-500 text-sm mt-2">Please fill in all fields to continue</p>
              )}
            </div>

            {/* Progress Indicator */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Step 3 of 5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
