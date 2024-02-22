const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// format YYYY-MM-DD
const getWeekDay = (date: string): string => {
  const day = new Date(date).getDay();
  return weekDays[day];
};

export default getWeekDay;
