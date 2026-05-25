"use client";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface Props {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  setView: (view: 'month' | 'week') => void;
}

export default function CalendarHeader({ currentDate, onPrev, onNext, setView }: Props) {
  return (
    <div className="flex justify-between items-center p-4 bg-white border-b">
      <h2 className="text-xl font-bold text-gray-800">
        {format(currentDate, "MMMM yyyy", { locale: de })}
      </h2>
      <div className="flex gap-2">
        <button onClick={() => setView('month')} className="px-3 py-1 border rounded">Monat</button>
        <button onClick={() => setView('week')} className="px-3 py-1 border rounded">Woche</button>
        <button onClick={onPrev} className="px-3 py-1 bg-gray-100 rounded">{"<"}</button>
        <button onClick={onNext} className="px-3 py-1 bg-gray-100 rounded">{">"}</button>
      </div>
    </div>
  );
}
