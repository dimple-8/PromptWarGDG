import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import ItineraryItem from './ItineraryItem';
import { format } from 'date-fns';

export default function ItineraryView({ itinerary, setItinerary }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event, dayId) => {
    const { active, over } = event;
    
    if (active && over && active.id !== over.id) {
      setItinerary((items) => {
        return items.map(day => {
          if (day.id === dayId) {
            const oldIndex = day.activities.findIndex(act => act.id === active.id);
            const newIndex = day.activities.findIndex(act => act.id === over.id);
            return {
              ...day,
              activities: arrayMove(day.activities, oldIndex, newIndex)
            };
          }
          return day;
        });
      });
    }
  };

  if (!itinerary) return null;

  return (
    <div className="itinerary-list">
      {itinerary.map((day) => (
        <div key={day.id} className="day-card glass-panel mb-6 p-6" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
          <div className="day-header mb-4 pb-4" style={{ borderBottom: '1px solid var(--glass-border)', marginBottom: '1rem', paddingBottom: '1rem' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'baseline', gap: '0.5rem', fontSize: '1.25rem' }}>
              Day {day.dayNumber} 
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>
                {format(new Date(day.date), 'EEEE, MMMM d')}
              </span>
            </h3>
          </div>
          
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(e) => handleDragEnd(e, day.id)}
          >
            <SortableContext 
              items={day.activities.map(a => a.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="activities-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {day.activities.map((activity) => (
                  <ItineraryItem key={activity.id} activity={activity} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      ))}
    </div>
  );
}
