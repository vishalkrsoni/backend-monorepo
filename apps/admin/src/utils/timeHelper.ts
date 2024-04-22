const formatDate = (date: Date): { dd: string; mm: string; yyyy: number } => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const time = date.toISOString().split('T');
  const [yyyy, mm, dd] = time[0].split('-');
  return {
    dd,
    mm: months[parseInt(mm) - 1],
    yyyy: parseInt(yyyy),
  };
};
const formatTime = (date: Date): { hour: number; am_pm: string } => {
  const hour = date.getHours();
  const am_pm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return {
    hour: formattedHour,
    am_pm,
  };
};

export const getTimeInUTC = (date: Date): { Day: string; Time: string } => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const day = daysOfWeek[date.getUTCDay()];
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const mm = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
  const yyyy = String(date.getUTCFullYear()).slice(-2);
  const { hour, am_pm } = formatTime(date);

  return {
    Day: `${dd} ${mm}'${yyyy} , ${day}`,

    Time: `${hour}:${String(date.getUTCMinutes()).padStart(2, '0')}:${String(date.getUTCSeconds()).padStart(2, '0')} ${am_pm}`,
  };
};

export const getTimeInIST = (date: Date): { Day: string; Time: string } => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const day = daysOfWeek[date.getDay()];
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
  const yyyy = String(date.getFullYear());
  // .slice(-2);
  const { hour, am_pm } = formatTime(date);

  return {
    Day: ` ${day} ${dd} ${mm} ${yyyy}`,
    Time: `${hour}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}-${am_pm}`,
  };
};
