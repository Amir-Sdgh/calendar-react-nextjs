import { 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, format, isSameMonth, isSameDay 
} from "date-fns";

export const getMonthDays = (viewDate: Date) => {
  const start = startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 }); // Woche beginnt Montag
  const end = endOfWeek(endOfMonth(viewDate), { weekStartsOn: 1 });

  return eachDayOfInterval({ start, end });
};