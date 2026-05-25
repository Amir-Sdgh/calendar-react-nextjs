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
  onMoveEvent: (id: string, newDate: Date) => void; 
}

export default function MonthView({ 
  currentDate, events, onAddEvent, onUpdateEvent, onDeleteEvent, onMoveEvent 
}: Props) {
  
  const days = useMemo(() => getMonthDays(currentDate), [currentDate]);
  const weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  // DRAG & DROP HANDLER
  const onDragStart = (e: React.DragEvent, eventId: string) => {
    e.dataTransfer.setData("eventId", eventId); // Speichert die ID des verschobenen Events
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Drop zu erlauben
  };

  const onDrop = (e: React.DragEvent, date: Date) => {
    const eventId = e.dataTransfer.getData("eventId");
    onMoveEvent(eventId, date);
  };

  return (
    <div className="grid grid-cols-7 border-l border-t bg-gray-200">
      {weekDays.map(day => (
        <div key={day} className="p-2 text-center font-bold border-r border-b bg-gray-50 text-gray-700">{day}</div>
      ))}

      {days.map((day, idx) => (
        <div 
          key={idx} 
          onClick={() => { const t = prompt("Neu:"); if(t) onAddEvent(t, day) }}
          onDragOver={onDragOver} // Erlaubt das Schweben über der Zelle
          onDrop={(e) => onDrop(e, day)} 
          className={`h-32 p-2 border-r border-b relative ${
            !isSameMonth(day, currentDate) ? "bg-gray-100" : "bg-white"
          } ${isToday(day) ? "bg-blue-50" : ""}`}
        >
          <span className="text-sm text-gray-700">{format(day, "d")}</span>
          
          <div className="mt-1 space-y-1">
            {events
              .filter(event => isSameDay(new Date(event.date), day))
              .map(event => (
                <div 
                  key={event.id} 
                  draggable // Macht das Element ziehbar
                  onDragStart={(e) => onDragStart(e, event.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    const n = prompt("Titel:", event.title);
                    if(n) onUpdateEvent(event.id, n);
                  }}
                  className="group relative text-[10px] bg-blue-500 text-white p-1 rounded cursor-move hover:bg-blue-600 shadow-sm"
                >
                  {event.title}
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDeleteEvent(event.id); }}
                    className="absolute right-0 top-0 h-full px-1 bg-red-600 hidden group-hover:block"
                  >✕</button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}