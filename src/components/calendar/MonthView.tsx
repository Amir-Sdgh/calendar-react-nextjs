"use client";
import { getMonthDays } from "@/lib/calendar-logic";
import { format, isSameMonth, isToday, isSameDay } from "date-fns";
import { useMemo } from "react";
import { CalendarEvent } from "../../app/page";

interface Props {
  currentDate: Date;
  events: CalendarEvent[];
  onAddEvent: (title: string, date: Date) => void;
  onUpdateEvent: (id: string, newTitle: string) => void;
  onDeleteEvent: (id: string) => void; 
}

export default function MonthView({ 
  currentDate, 
  events, 
  onAddEvent, 
  onUpdateEvent, 
  onDeleteEvent 
}: Props) {
  
  const days = useMemo(() => getMonthDays(currentDate), [currentDate]);
  const weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  const handleDayClick = (day: Date) => {
    const title = prompt("Neues Event:");
    if (title) onAddEvent(title, day);
  };

  const handleEventClick = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation(); 
    const newTitle = prompt("Event bearbeiten:", event.title);
    if (newTitle) onUpdateEvent(event.id, newTitle);
  };

  return (
    <div className="grid grid-cols-7 border-l border-t bg-gray-200">
      {weekDays.map(day => (
        <div key={day} className="p-2 text-center font-bold border-r border-b bg-gray-50 text-gray-700">{day}</div>
      ))}

      {days.map((day, idx) => (
        <div 
          key={idx} 
          onClick={() => handleDayClick(day)}
          className={`h-32 p-2 border-r border-b cursor-pointer hover:bg-gray-50 transition-colors relative ${
            !isSameMonth(day, currentDate) ? "bg-gray-100 text-gray-400" : "bg-white"
          } ${isToday(day) ? "bg-blue-50" : ""}`}
        >
          <span className={`text-sm ${isToday(day) ? "font-bold text-blue-600" : "text-gray-700"}`}>
            {format(day, "d")}
          </span>
          
          <div className="mt-1 space-y-1 overflow-y-auto max-h-20 text-gray-700">
            {events
              .filter(event => isSameDay(new Date(event.date), day))
              .map(event => (
                <div 
                  key={event.id} 
                  onClick={(e) => handleEventClick(e, event)}
                  className="group relative text-[10px] leading-tight bg-blue-500 text-white p-1 rounded truncate hover:bg-blue-600 shadow-sm"
                >
                  {event.title}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      if(confirm("Event löschen?")) onDeleteEvent(event.id);
                    }}
                    className="absolute right-0 top-0 h-full px-1 bg-red-600 text-white hidden group-hover:flex items-center justify-center rounded-r-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}