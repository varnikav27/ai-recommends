import { ShoppingBag, Calendar, MapPin, Sparkles, ArrowLeft, Package } from 'lucide-react';
import type { PackingRecommendation, TripPlan } from '../types';

interface PackingResultsProps {
  packingRecommendation: PackingRecommendation;
  tripPlan: TripPlan;
  onBack: () => void;
}

export const PackingResults: React.FC<PackingResultsProps> = ({
  packingRecommendation,
  tripPlan,
  onBack,
}) => {
  const formatDate = (date: Date | null) => {
    if (!date) return 'Date TBD';
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Package className="text-purple-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">VibePack AI</h1>
          </div>
          <p className="text-lg text-gray-600 mb-6">Your Personalized Packing List</p>
          
          {/* Trip Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-purple-500" />
                <span>{tripPlan.destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-500" />
                <span>{formatDate(tripPlan.startDate)} - {formatDate(tripPlan.endDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-teal-500" />
                <span>{tripPlan.vibes.join(', ')} trip</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clothing Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">👕 Clothing Essentials</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(packingRecommendation.clothing).map(([category, items]) => (
              <div key={category} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center border-b pb-2">
                  {category}
                </h3>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-1">{item.item}</h4>
                      <p className="text-sm text-gray-600">{item.tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Essentials Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🎒 Travel Essentials</h2>
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {packingRecommendation.essentials.map((item, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-gray-800 mb-1">{item.item}</h4>
                  <p className="text-sm text-gray-600">{item.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shop The Look Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🛍️ Shop The Look</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packingRecommendation.shopTheLook.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingBag className="text-teal-500" size={20} />
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-purple-600">{item.price}</span>
                  <button className="bg-gradient-to-r from-purple-500 to-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Plan Another Trip
          </button>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
              Save Packing List
            </button>
            <button className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
              Share with Friends
            </button>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
              Print List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
