import React, { useState, useEffect } from 'react';
import { CloudRain, AlertTriangle } from 'lucide-react';

export default function RealTimeAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlerts([
        { id: 1, type: 'weather', message: 'Rain expected tomorrow afternoon. Indoor alternatives suggested.', icon: <CloudRain size={20} /> },
        { id: 2, type: 'traffic', message: 'Heavy traffic near Eiffel Tower. Transit time +15m.', icon: <AlertTriangle size={20} /> }
      ]);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (alerts.length === 0) return null;

  return (
    <div className="alerts-container flex-col gap-2 mb-4 animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
      {alerts.map(alert => (
        <div key={alert.id} className="alert-card glass-panel flex items-center gap-4 p-4" style={{ 
          borderLeft: `4px solid ${alert.type === 'weather' ? 'var(--accent-color)' : 'var(--warning)'}` 
        }}>
          <div className="alert-icon" style={{ color: alert.type === 'weather' ? 'var(--accent-color)' : 'var(--warning)' }}>
            {alert.icon}
          </div>
          <div className="alert-content">
            <h4 style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {alert.type} Alert
            </h4>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
