import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Clock, MapPin, Coffee, Camera, BookOpen } from 'lucide-react';

const typeIcons = {
  food: <Coffee size={18} />,
  sightseeing: <Camera size={18} />,
  culture: <BookOpen size={18} />,
  leisure: <MapPin size={18} />
};

export default function ItineraryItem({ activity }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
    position: 'relative'
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`activity-item ${isDragging ? 'dragging' : ''}`}
    >
      <div 
        className="activity-content"
        style={{ 
          background: 'rgba(30, 41, 59, 0.4)', 
          border: '1px solid var(--glass-border)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem'
        }}
      >
        <div 
          className="drag-handle" 
          style={{ cursor: 'grab', color: 'var(--text-secondary)' }}
          {...attributes} 
          {...listeners}
        >
          <GripVertical size={20} />
        </div>
        
        <div className="time-badge" style={{ background: 'var(--bg-primary)', padding: '0.5rem', borderRadius: '4px', minWidth: '65px', textAlign: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{activity.time}</span>
        </div>
        
        <div className="activity-details" style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.05rem' }}>{activity.title}</h4>
          <div className="meta" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', gap: '1rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock size={14} /> {activity.duration}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', textTransform: 'capitalize' }}>
              {typeIcons[activity.type] || <MapPin size={14} />} {activity.type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
