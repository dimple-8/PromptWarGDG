import React, { useState } from 'react';
import { MapPin, Calendar, Clock, DollarSign, Activity } from 'lucide-react';

export default function TripForm({ onPlanSubmit }) {
  const [formData, setFormData] = useState({
    destination: '',
    date: '',
    duration: 3,
    budget: 'medium',
    pace: 'moderate'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlanSubmit(formData);
  };

  return (
    <form className="glass-panel p-6" onSubmit={handleSubmit}>
      <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="input-group">
          <label className="flex items-center gap-2"><MapPin size={16} /> Destination</label>
          <input 
            type="text" 
            placeholder="e.g., Paris, Tokyo" 
            value={formData.destination}
            onChange={(e) => setFormData({...formData, destination: e.target.value})}
            required
          />
        </div>
        <div className="input-group">
          <label className="flex items-center gap-2"><Calendar size={16} /> Start Date</label>
          <input 
            type="date" 
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required
          />
        </div>
        <div className="input-group">
          <label className="flex items-center gap-2"><Clock size={16} /> Duration (days)</label>
          <input 
            type="number" 
            min="1" max="30"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
          />
        </div>
        <div className="input-group">
          <label className="flex items-center gap-2"><DollarSign size={16} /> Budget</label>
          <select value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})}>
            <option value="budget">Budget-Friendly</option>
            <option value="medium">Moderate</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>
      </div>
      
      <div className="input-group" style={{ marginBottom: '2rem' }}>
        <label className="flex items-center gap-2"><Activity size={16} /> Travel Pace</label>
        <div className="pace-options flex gap-4">
          {['relaxed', 'moderate', 'packed'].map((pace) => (
            <div 
              key={pace}
              className={`pace-card flex-col items-center justify-center p-4 w-full text-center ${formData.pace === pace ? 'active' : ''}`}
              style={{
                border: formData.pace === pace ? '1px solid var(--accent-color)' : '1px solid var(--glass-border)',
                borderRadius: '8px',
                cursor: 'pointer',
                background: formData.pace === pace ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                transition: 'all 0.2s'
              }}
              onClick={() => setFormData({...formData, pace})}
            >
              <h4 style={{ textTransform: 'capitalize', margin: '0 0 0.5rem 0' }}>{pace}</h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {pace === 'relaxed' && '1-2 activities/day'}
                {pace === 'moderate' && '3-4 activities/day'}
                {pace === 'packed' && '5+ activities/day'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="btn-primary w-full" style={{ padding: '1rem', fontSize: '1.1rem' }}>
        Generate Smart Itinerary
      </button>
    </form>
  );
}
