"use client";
import { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import MonthView from "@/components/calendar/MonthView";

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const addEvent = (title: string, date: Date) => {
    const newEvent: CalendarEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      date,
    };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (id: string, newTitle: string) => {
    setEvents(events.map((event) =>
      event.id === id ? { ...event, title: newTitle } : event
    ));
  };

  // WICHTIG: Diese Funktion muss existieren!
  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200">
        <CalendarHeader 
          currentDate={currentDate} 
          onPrev={prevMonth} 
          onNext={nextMonth} 
          setView={setViewMode}
        />
        {/* WICHTIG: onDeleteEvent={deleteEvent} muss hier stehen! */}
        <MonthView 
          currentDate={currentDate} 
          events={events} 
          onAddEvent={addEvent} 
          onUpdateEvent={updateEvent}
          onDeleteEvent={deleteEvent} 
        />
      </div>
    </div>
  );
}