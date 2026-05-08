'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Wallet, Compass, ArrowRight, ArrowLeft } from 'lucide-react';

export default function TravelerProfiler({ onComplete }) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    destination: '',
    duration: 3,
    companions: 'solo',
    budget: 'medium',
    interests: []
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleComplete = () => {
    onComplete(profile);
  };

  return (
    <div className="max-w-2xl mx-auto glass-panel p-8 relative overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
        <motion.div 
          className="h-full bg-blue-500"
          initial={{ width: '25%' }}
          animate={{ width: `${(step / 4) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="mb-8 mt-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Let's craft your perfect journey</h2>
        <p className="text-slate-400 text-sm">Our AI needs a few details to personalize your experience.</p>
      </div>

      <div className="min-h-[300px]">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><MapPin className="text-blue-400"/> Where to and for how long?</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Destination</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                  placeholder="e.g., Kyoto, Japan or 'Surprise me'"
                  value={profile.destination}
                  onChange={e => setProfile({...profile, destination: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Duration (days)</label>
                <input 
                  type="range" min="1" max="30" 
                  className="w-full accent-blue-500"
                  value={profile.duration}
                  onChange={e => setProfile({...profile, duration: parseInt(e.target.value)})}
                />
                <div className="text-right text-sm text-blue-400 font-medium mt-1">{profile.duration} Days</div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Users className="text-purple-400"/> Who's traveling?</h3>
            <div className="grid grid-cols-2 gap-4">
              {['solo', 'couple', 'family', 'friends'].map(comp => (
                <button 
                  key={comp}
                  onClick={() => setProfile({...profile, companions: comp})}
                  className={`p-4 rounded-xl border transition-all capitalize flex flex-col items-center justify-center gap-2
                    ${profile.companions === comp ? 'border-purple-500 bg-purple-500/10 text-purple-300' : 'border-slate-700 hover:border-slate-500 text-slate-400'}`}
                >
                  <Users size={24} />
                  <span>{comp}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Wallet className="text-emerald-400"/> What's your budget style?</h3>
            <div className="grid grid-cols-3 gap-4">
              {['budget', 'medium', 'luxury'].map(b => (
                <button 
                  key={b}
                  onClick={() => setProfile({...profile, budget: b})}
                  className={`p-4 rounded-xl border transition-all capitalize text-center
                    ${profile.budget === b ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-slate-700 hover:border-slate-500 text-slate-400'}`}
                >
                  <Wallet size={20} className="mx-auto mb-2" />
                  <span className="text-sm">{b}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Compass className="text-orange-400"/> What's the vibe?</h3>
            <div className="flex flex-wrap gap-3">
              {['Foodie', 'Adventure', 'Relaxation', 'Culture', 'Nightlife', 'Nature', 'Shopping'].map(interest => (
                <button 
                  key={interest}
                  onClick={() => {
                    const ints = profile.interests.includes(interest) 
                      ? profile.interests.filter(i => i !== interest)
                      : [...profile.interests, interest];
                    setProfile({...profile, interests: ints});
                  }}
                  className={`px-4 py-2 rounded-full border transition-all text-sm
                    ${profile.interests.includes(interest) ? 'border-orange-500 bg-orange-500/20 text-orange-300' : 'border-slate-700 hover:border-slate-500 text-slate-400'}`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-slate-800">
        <button 
          onClick={prevStep} 
          className={`flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white transition ${step === 1 ? 'invisible' : ''}`}
        >
          <ArrowLeft size={16} /> Back
        </button>
        
        {step < 4 ? (
          <button 
            onClick={nextStep}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition font-medium shadow-[0_0_15px_rgba(37,99,235,0.3)]"
          >
            Next <ArrowRight size={16} />
          </button>
        ) : (
          <button 
            onClick={handleComplete}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white rounded-lg transition font-medium shadow-[0_0_20px_rgba(99,102,241,0.4)]"
          >
            Explore Options <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
