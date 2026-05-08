'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Umbrella, Tent, Heart, Plane, Camera, Coffee, Briefcase } from 'lucide-react';

const TRIP_MODES = [
  { id: 'relaxed', title: 'Relaxed Escape', icon: <Umbrella />, color: 'from-cyan-500 to-blue-500', desc: 'Slow mornings, beach vibes, and spa days.' },
  { id: 'adventure', title: 'Adventurous', icon: <Tent />, color: 'from-orange-500 to-red-500', desc: 'Hiking, trekking, and adrenaline rushes.' },
  { id: 'romantic', title: 'Romantic Getaway', icon: <Heart />, color: 'from-pink-500 to-rose-500', desc: 'Candlelight dinners, sunsets, and privacy.' },
  { id: 'cultural', title: 'Cultural Explorer', icon: <Camera />, color: 'from-purple-500 to-indigo-500', desc: 'Museums, history, and local traditions.' },
  { id: 'foodie', title: 'Culinary Journey', icon: <Coffee />, color: 'from-yellow-400 to-orange-500', desc: 'Street food, fine dining, and local flavors.' },
  { id: 'workation', title: 'Workation', icon: <Briefcase />, color: 'from-emerald-400 to-teal-500', desc: 'Fast Wi-Fi, cafes, and evening exploration.' },
];

export default function DashboardView({ tripData, onGenerate }) {
  const [selectedMode, setSelectedMode] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!selectedMode) return;
    setIsGenerating(true);
    // Simulate API call to Next.js route
    setTimeout(() => {
      onGenerate({ mode: selectedMode, ...tripData });
      setIsGenerating(false);
    }, 2500);
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] glass-panel p-12 max-w-lg mx-auto text-center">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-6"
        >
          <div className="w-16 h-16 border-4 border-slate-700 border-t-blue-500 rounded-full"></div>
        </motion.div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Curating Your Cinematic Itinerary...
        </h2>
        <p className="text-slate-400">Analyzing weather, budget algorithms, and hidden gems for a {selectedMode} experience.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Select Your Travel Style</h2>
          <p className="text-slate-400">We noticed you want to visit <span className="text-white font-medium">{tripData.destination || 'a surprise location'}</span>. How do you want to experience it?</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm">
          <Sparkles size={16} /> AI Matched for You
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {TRIP_MODES.map((mode, idx) => (
          <motion.button
            key={mode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedMode(mode.id)}
            className={`relative overflow-hidden group p-6 rounded-2xl border text-left transition-all duration-300
              ${selectedMode === mode.id ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-800 hover:border-slate-600 bg-slate-900/50'}`}
          >
            {/* Background gradient effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${mode.color}`}></div>
            {selectedMode === mode.id && (
              <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${mode.color}`}></div>
            )}
            
            <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center bg-gradient-to-br ${mode.color} text-white shadow-lg`}>
              {mode.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">{mode.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{mode.desc}</p>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center">
        <button 
          onClick={handleGenerate}
          disabled={!selectedMode}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-lg
            ${selectedMode 
              ? 'bg-white text-slate-900 hover:bg-slate-200 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transform cursor-pointer' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
        >
          <Plane size={20} /> Generate AI Itinerary
        </button>
      </div>
    </div>
  );
}
