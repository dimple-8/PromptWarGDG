'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Info, Cloud, Shield, Wallet, Map as MapIcon, ChevronRight, Activity } from 'lucide-react';

export default function ItineraryEngineView({ tripData, onModify }) {
  const [activeTab, setActiveTab] = useState('itinerary');

  const travelScores = [
    { name: 'Safety', score: 95, icon: <Shield size={16} />, color: 'text-emerald-400' },
    { name: 'Weather', score: 88, icon: <Cloud size={16} />, color: 'text-blue-400' },
    { name: 'Budget Efficiency', score: 92, icon: <Wallet size={16} />, color: 'text-purple-400' }
  ];

  const recommendations = [
    "If you shift your travel dates by 2 days, flight prices drop by 15%.",
    "There's a local cultural festival happening near your hotel on Day 2.",
    "Upgrading your budget by 10% unlocks beachfront accommodations."
  ];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Activity size={18} className="text-blue-500" /> Smart Travel Score</h3>
          <div className="space-y-4">
            {travelScores.map(score => (
              <div key={score.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className={`flex items-center gap-1 ${score.color}`}>{score.icon} {score.name}</span>
                  <span className="font-bold">{score.score}/100</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full bg-current ${score.color}`} style={{ width: `${score.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Settings size={18} className="text-orange-500" /> What-If Simulator</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-slate-700 hover:border-orange-500 hover:bg-orange-500/10 transition text-sm">
              <span className="block font-semibold text-white">Try Luxury Mode</span>
              <span className="text-slate-400 text-xs">See 5-star upgrades</span>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-slate-700 hover:border-blue-500 hover:bg-blue-500/10 transition text-sm">
              <span className="block font-semibold text-white">Extend by 2 days</span>
              <span className="text-slate-400 text-xs">Paces out the itinerary</span>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="lg:col-span-9 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 bg-gradient-to-br from-slate-900 to-blue-900/20">
          <h2 className="text-2xl font-bold mb-2">Your {tripData.mode} Journey to {tripData.destination || 'Paradise'}</h2>
          <p className="text-slate-300 mb-6">{tripData.duration} Days • {tripData.companions} • {tripData.budget} budget</p>
          
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {recommendations.map((rec, i) => (
              <div key={i} className="min-w-[280px] p-4 rounded-xl border border-blue-500/30 bg-blue-500/10 text-sm flex items-start gap-3">
                <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <p className="text-blue-100">{rec}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4 border-b border-slate-700 mb-6">
            <button onClick={() => setActiveTab('itinerary')} className={`pb-3 font-medium transition-colors ${activeTab === 'itinerary' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-slate-200'}`}>Itinerary</button>
            <button onClick={() => setActiveTab('map')} className={`pb-3 font-medium transition-colors ${activeTab === 'map' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-slate-200'}`}>Interactive Map</button>
          </div>

          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl border border-slate-700 bg-slate-900/50">
                <h3 className="text-xl font-bold mb-4">Day 1: Arrival & Exploration</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition">
                    <div className="w-16 text-center text-sm font-bold text-blue-400">09:00</div>
                    <div>
                      <h4 className="font-semibold text-white">Morning Coffee & Setup</h4>
                      <p className="text-xs text-slate-400">Local cafe recommendation based on your Foodie interest.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition">
                    <div className="w-16 text-center text-sm font-bold text-orange-400">12:00</div>
                    <div>
                      <h4 className="font-semibold text-white">Cultural Museum Tour</h4>
                      <p className="text-xs text-slate-400">Beats the afternoon crowd. Tickets pre-booked.</p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full py-4 border border-dashed border-slate-600 rounded-xl text-slate-400 hover:text-white hover:border-slate-400 transition flex items-center justify-center gap-2">
                Load Full Itinerary <ChevronRight size={16} />
              </button>
            </div>
          )}

          {activeTab === 'map' && (
            <div className="h-[400px] rounded-xl overflow-hidden border border-slate-700 bg-slate-800 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <MapIcon size={48} className="mx-auto mb-4 opacity-50" />
                <p>Interactive Map Component</p>
                <p className="text-sm">Includes safety overlays and dynamic routing.</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
