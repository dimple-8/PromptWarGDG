'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TravelerProfiler from './TravelerProfiler';
import DashboardView from './DashboardView';
import ItineraryEngineView from './ItineraryEngineView';

export default function TripPlannerClient() {
  // 'profiling' | 'dashboard' | 'itinerary'
  const [appState, setAppState] = useState('profiling');
  const [tripData, setTripData] = useState(null);

  const handleProfileComplete = (data) => {
    setTripData(data);
    setAppState('dashboard');
  };

  const handleItineraryGenerate = (itinerary) => {
    setTripData(prev => ({ ...prev, itinerary }));
    setAppState('itinerary');
  };

  return (
    <div className="w-full relative min-h-[calc(100vh-120px)]">
      <AnimatePresence mode="wait">
        {appState === 'profiling' && (
          <motion.div
            key="profiling"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <TravelerProfiler onComplete={handleProfileComplete} />
          </motion.div>
        )}

        {appState === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <DashboardView tripData={tripData} onGenerate={handleItineraryGenerate} />
          </motion.div>
        )}
        
        {appState === 'itinerary' && (
          <motion.div
            key="itinerary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ItineraryEngineView tripData={tripData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
