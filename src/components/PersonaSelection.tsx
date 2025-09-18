import { useState } from 'react';
import { ChevronRight, Users, Check } from 'lucide-react';
import type { UserPersona, ValidationError } from '../types';
import { USER_PERSONAS } from '../data/constants';

interface PersonaSelectionProps {
  selectedPersona?: UserPersona;
  onPersonaSelect: (persona: UserPersona) => void;
  onNext: () => void;
  errors?: ValidationError[];
}

export const PersonaSelection: React.FC<PersonaSelectionProps> = ({
  selectedPersona,
  onPersonaSelect,
  onNext,
  errors = []
}) => {
  const [hoveredPersona, setHoveredPersona] = useState<string | null>(null);

  const getError = (field: string) => errors.find(error => error.field === field);
  const personaError = getError('persona');

  const handleNext = () => {
    if (selectedPersona) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
            <Users className="text-indigo-600" size={32} />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">Choose Your Travel Persona</h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Help us understand your travel style by selecting the persona that best describes you. 
            This will help us create the perfect trip recommendations.
          </p>
        </div>

        {/* Persona Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {USER_PERSONAS.map((persona) => (
            <div
              key={persona.id}
              className={`relative p-4 sm:p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                selectedPersona?.id === persona.id
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white ring-4 ring-indigo-300'
                  : 'bg-white hover:shadow-xl'
              }`}
              onClick={() => onPersonaSelect(persona)}
              onMouseEnter={() => setHoveredPersona(persona.id)}
              onMouseLeave={() => setHoveredPersona(null)}
            >
              {/* Selection Check */}
              {selectedPersona?.id === persona.id && (
                <div className="absolute top-4 right-4">
                  <div className="bg-white rounded-full p-1">
                    <Check className="text-indigo-600" size={16} />
                  </div>
                </div>
              )}

              {/* Persona Icon */}
              <div className="text-center mb-3 sm:mb-4">
                <div className={`text-4xl sm:text-5xl lg:text-6xl mb-2 sm:mb-3 transition-transform duration-300 ${
                  hoveredPersona === persona.id ? 'scale-110' : ''
                }`}>
                  {persona.icon}
                </div>
                <h3 className={`text-lg sm:text-xl font-bold mb-2 ${
                  selectedPersona?.id === persona.id ? 'text-white' : 'text-gray-800'
                }`}>
                  {persona.name}
                </h3>
              </div>

              {/* Description */}
              <p className={`text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed ${
                selectedPersona?.id === persona.id ? 'text-indigo-100' : 'text-gray-600'
              }`}>
                {persona.description}
              </p>

              {/* Traits */}
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {persona.traits.map((trait) => (
                  <span
                    key={trait}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedPersona?.id === persona.id
                        ? 'bg-white bg-opacity-20 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Error Message */}
        {personaError && (
          <div className="text-center mb-6">
            <p className="text-red-500 text-sm font-medium">{personaError.message}</p>
          </div>
        )}

        {/* Selected Persona Summary */}
        {selectedPersona && (
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-4">
              <div className="text-3xl sm:text-4xl">{selectedPersona.icon}</div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">{selectedPersona.name}</h3>
                <p className="text-sm sm:text-base text-gray-600">Perfect! This persona will help us tailor your experience.</p>
              </div>
            </div>
            <div className="border-l-4 border-indigo-500 pl-4 bg-indigo-50 p-3 sm:p-4 rounded-r-lg">
              <p className="text-indigo-800 font-medium text-sm sm:text-base">What this means for your trip:</p>
              <p className="text-indigo-700 text-xs sm:text-sm mt-1">{selectedPersona.description}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="text-center px-4">
          <button
            onClick={handleNext}
            disabled={!selectedPersona}
            className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg transition-all duration-200 w-full sm:w-auto max-w-sm ${
              selectedPersona
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue to Basic Info
            <ChevronRight size={20} />
          </button>
          
          {!selectedPersona && (
            <p className="text-gray-500 text-sm mt-2">Please select a persona to continue</p>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-white rounded-full px-3 sm:px-4 py-2 shadow-lg border">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span>Step 1 of 5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
