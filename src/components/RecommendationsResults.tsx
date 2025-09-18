import { Calendar, Camera, Clock, DollarSign, MapPin, Star, Users, Package } from 'lucide-react';
import React from 'react';
import type { TripPlan, TripRecommendation, UserVibe } from '../types';

interface RecommendationResultsProps {
  userVibe: UserVibe;
  tripPlan: TripPlan; 
  recommendation: TripRecommendation;
  onStartOver: () => void;
  onGeneratePacking: () => void;
  isGeneratingPacking: boolean;
}

export const RecommendationResults: React.FC<RecommendationResultsProps> = ({
  userVibe,
  tripPlan,
  recommendation,
  onStartOver,
  onGeneratePacking,
  isGeneratingPacking
}) => {
  const formatDate = (date: Date | null) => {
    return date ? date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }) : '';
  };

  const getDurationDays = () => {
    if (!tripPlan.startDate || !tripPlan.endDate) return 0;
    const diffTime = Math.abs(tripPlan.endDate.getTime() - tripPlan.startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Your Perfect VibePack
          </h1>
          <p className="text-xl text-gray-600">
            AI-curated just for you
          </p>
        </div>

        {/* Trip Summary Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">{tripPlan.destination}</span>
            </div>
            <div className="flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(tripPlan.startDate)} - {formatDate(tripPlan.endDate)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{getDurationDays()} days</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="capitalize">{tripPlan.companions}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tripPlan.vibes.map((vibe) => (
              <span
                key={vibe}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {vibe}
              </span>
            ))}
          </div>
        </div>

        {/* Main Recommendation */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">{recommendation.title}</h2>
            <p className="text-blue-100 text-lg">{recommendation.description}</p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Activities */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Star className="w-6 h-6 mr-2 text-yellow-500" />
                  Recommended Activities
                </h3>
                <ul className="space-y-3">
                  {recommendation.activities.map((activity, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Camera className="w-6 h-6 mr-2 text-green-500" />
                  Trip Highlights
                </h3>
                <ul className="space-y-3">
                  {recommendation.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Accommodation */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🏨 Accommodation</h3>
            <p className="text-gray-700">{recommendation.accommodation}</p>
          </div>

          {/* Transportation */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">🚗 Transportation</h3>
            <p className="text-gray-700">{recommendation.transportation}</p>
          </div>

          {/* Budget */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Budget Estimate
            </h3>
            {typeof recommendation.budget === 'string' ? (
              <p className="text-gray-700">{recommendation.budget}</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(recommendation.budget).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 capitalize">
                      {key.replace(/_/g, ' ').replace('&', '&')}:
                    </span>
                    <span className="text-gray-900 font-medium">{value}</span>
                  </div>
                ))}
                {recommendation.budget.total_estimate && (
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-gray-700">Total Estimate:</span>
                      <span className="text-blue-600">{recommendation.budget.total_estimate}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="space-x-4">
            <button
              onClick={onGeneratePacking}
              disabled={isGeneratingPacking}
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-2"
            >
              <Package className="w-5 h-5" />
              {isGeneratingPacking ? 'Creating Your Packing List...' : 'Get My Packing List'}
            </button>
          </div>
          
          <div>
            <button
              onClick={onStartOver}
              className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Plan Another Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};