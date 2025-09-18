import { useState } from 'react';
import { PersonaSelection } from './components/PersonaSelection';
import { StepOne } from './components/StepOne';
import { StepTwoEnhanced } from './components/StepTwoEnhanced';
import { RecommendationResults } from './components/RecommendationsResults';
import { PackingResults } from './components/PackingResults';
import { generateTripRecommendation, generatePackingRecommendation } from './services/gemini';
import type { TripPlan, TripRecommendation, UserVibe, PackingRecommendation, UserPersona } from './types';
import { DEFAULT_FROM_LOCATION } from './data/constants';

type Step = 'persona' | 'vibe' | 'planning' | 'results' | 'packing';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('persona');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [userVibe, setUserVibe] = useState<UserVibe>({
    age: 0,
    gender: 'male',
    preferredDestinationType: 'beaches',
    persona: undefined,
  });

  const [tripPlan, setTripPlan] = useState<TripPlan>({
    destination: '',
    fromLocation: DEFAULT_FROM_LOCATION.displayName,
    startDate: null,
    endDate: null,
    companions: 'solo',
    vibes: [],
  });

  const [recommendation, setRecommendation] = useState<TripRecommendation | null>(null);
  const [packingRecommendation, setPackingRecommendation] = useState<PackingRecommendation | null>(null);
  const [isGeneratingPacking, setIsGeneratingPacking] = useState(false);

  const updateUserVibe = (updates: Partial<UserVibe>) => {
    setUserVibe(prev => ({ ...prev, ...updates }));
  };

  const updateTripPlan = (updates: Partial<TripPlan>) => {
    setTripPlan(prev => ({ ...prev, ...updates }));
  };

  const handlePersonaSelect = (persona: UserPersona) => {
    setUserVibe(prev => ({ ...prev, persona }));
  };

  const handlePersonaNext = () => {
    setCurrentStep('vibe');
  };

  const handleVibeNext = () => {
    setCurrentStep('planning');
  };

  const handleVibeBack = () => {
    setCurrentStep('persona');
  };

  const handlePlanningBack = () => {
    setCurrentStep('vibe');
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateTripRecommendation(userVibe, tripPlan);
      setRecommendation(result);
      setCurrentStep('results');
    } catch (error) {
      console.error('Failed to generate recommendation:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGeneratePacking = async () => {
    setIsGeneratingPacking(true);
    try {
      const primaryVibe = tripPlan.vibes.length > 0 ? tripPlan.vibes[0] : 'adventure';
      const result = await generatePackingRecommendation(
        tripPlan.destination,
        tripPlan.startDate,
        tripPlan.endDate,
        primaryVibe,
        userVibe,
        tripPlan.fromLocation
      );
      setPackingRecommendation(result);
      setCurrentStep('packing');
    } catch (error) {
      console.error('Failed to generate packing recommendation:', error);
    } finally {
      setIsGeneratingPacking(false);
    }
  };

  const handleBackFromPacking = () => {
    setCurrentStep('results');
  };

  const handleStartOver = () => {
    setCurrentStep('persona');
    setUserVibe({
      age: 0,
      gender: 'male',
      preferredDestinationType: 'beaches',
      persona: undefined,
    });
    setTripPlan({
      destination: '',
      fromLocation: DEFAULT_FROM_LOCATION.displayName,
      startDate: null,
      endDate: null,
      companions: 'solo',
      vibes: [],
    });
    setRecommendation(null);
    setPackingRecommendation(null);
  };

  return (
    <div className="App">
      {currentStep === 'persona' && (
        <PersonaSelection
          selectedPersona={userVibe.persona}
          onPersonaSelect={handlePersonaSelect}
          onNext={handlePersonaNext}
        />
      )}

      {currentStep === 'vibe' && (
        <StepOne
          userVibe={userVibe}
          updateUserVibe={updateUserVibe}
          onNext={handleVibeNext}
          onBack={handleVibeBack}
        />
      )}
      
      {currentStep === 'planning' && (
        <StepTwoEnhanced
          userVibe={userVibe}
          tripPlan={tripPlan}
          updateTripPlan={updateTripPlan}
          onBack={handlePlanningBack}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
      )}
      
      {currentStep === 'results' && recommendation && (
        <RecommendationResults
          userVibe={userVibe}
          tripPlan={tripPlan}
          recommendation={recommendation}
          onStartOver={handleStartOver}
          onGeneratePacking={handleGeneratePacking}
          isGeneratingPacking={isGeneratingPacking}
        />
      )}
      
      {currentStep === 'packing' && packingRecommendation && (
        <PackingResults
          packingRecommendation={packingRecommendation}
          tripPlan={tripPlan}
          onBack={handleBackFromPacking}
        />
      )}
    </div>
  );
}

export default App;