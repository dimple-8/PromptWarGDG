import React, { useState } from 'react';
import TripForm from './components/TripForm';
import ItineraryView from './components/ItineraryView';
import MapView from './components/MapView';
import RealTimeAlerts from './components/RealTimeAlerts';
import { Compass } from 'lucide-react';
import './App.css';

function App() {
  const [tripState, setTripState] = useState('planning'); // 'planning', 'planned'
  const [itinerary, setItinerary] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePlanTrip = (prefs) => {
    setPreferences(prefs);
    setIsGenerating(true);
    // Simulate API call to generate itinerary
    setTimeout(() => {
      const mockItinerary = generateMockItinerary(prefs);
      setItinerary(mockItinerary);
      setTripState('planned');
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="app-container">
      <header className="app-header glass-panel">
        <div className="logo flex items-center gap-2">
          <Compass className="text-accent" size={32} color="var(--accent-color)" />
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Wanderlust</h1>
        </div>
        <nav className="nav-links flex gap-4">
          <button className="btn-secondary">My Trips</button>
          <button className="btn-primary">Profile</button>
        </nav>
      </header>

      <main className="main-content">
        {tripState === 'planning' ? (
          <div className="planning-view animate-fade-in">
            <div className="hero-text text-center mb-6">
              <h2 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(45deg, var(--text-primary), var(--accent-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Where to next?</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Plan your perfect trip with dynamic scheduling, real-time weather updates, and personalized constraints.</p>
            </div>
            
            {isGenerating ? (
              <div className="glass-panel p-6 text-center mt-4">
                <div className="loader"></div>
                <h3 className="mt-4">Curating your perfect itinerary...</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Analyzing preferences and real-time data</p>
              </div>
            ) : (
              <TripForm onPlanSubmit={handlePlanTrip} />
            )}
          </div>
        ) : (
          <div className="planned-view animate-fade-in">
            <div className="itinerary-sidebar">
              <RealTimeAlerts />
              <ItineraryView itinerary={itinerary} setItinerary={setItinerary} />
            </div>
            <div className="map-sidebar glass-panel">
              <MapView itinerary={itinerary} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Mock generator (centered around Paris by default for demo)
function generateMockItinerary(prefs) {
  const days = [];
  const totalDays = parseInt(prefs.duration) || 3;
  let startDate = new Date(prefs.date || new Date());
  
  // Base coordinates (Paris for demo)
  const baseLat = 48.8566;
  const baseLng = 2.3522;

  const activitiesPool = [
    { title: 'Visit Louvre Museum', type: 'culture' },
    { title: 'Eiffel Tower Tour', type: 'sightseeing' },
    { title: 'Local Cafe Breakfast', type: 'food' },
    { title: 'Seine River Cruise', type: 'leisure' },
    { title: 'Montmartre Walk', type: 'sightseeing' },
    { title: 'Dinner at Le Marais', type: 'food' },
    { title: 'Versailles Palace', type: 'culture' }
  ];

  for (let i = 0; i < totalDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    const dayActivities = [];
    for(let j=0; j<3; j++) {
      const act = activitiesPool[Math.floor(Math.random() * activitiesPool.length)];
      dayActivities.push({
        id: `act-${i}-${j}`,
        title: act.title,
        time: j === 0 ? '09:00' : (j === 1 ? '13:00' : '18:00'),
        type: act.type,
        lat: baseLat + (Math.random() * 0.05 - 0.025),
        lng: baseLng + (Math.random() * 0.05 - 0.025),
        duration: '2h'
      });
    }

    days.push({
      id: `day-${i+1}`,
      date: currentDate.toISOString().split('T')[0],
      dayNumber: i + 1,
      activities: dayActivities
    });
  }
  return days;
}

export default App;
