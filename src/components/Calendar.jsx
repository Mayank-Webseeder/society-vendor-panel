import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../UserContext';

// Helper to get month name
const getMonthName = (monthIndex) => {
  const date = new Date(2000, monthIndex, 1);
  return date.toLocaleString('en-US', { month: 'long' });
};

// Helper to get weekday name (e.g., "Mon", "Tue")
const getWeekdayName = (date) => {
  return date.toLocaleString('en-US', { weekday: 'short' });
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const Calendar = () => {
  const { user } = useUser();
  const workingDays = user.workingDays;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [dayAvailability, setDayAvailability] = useState({});
  const [isCalendarAnimating, setIsCalendarAnimating] = useState(false);
  const calendarRef = useRef(null);

  const generateDummyAvailability = useCallback((year, monthIndex) => {
    const availability = {};
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, monthIndex, i);
      const dayOfWeekName = getWeekdayName(date);
      availability[date.toDateString()] = workingDays.includes(dayOfWeekName);
    }
    return availability;
  }, [workingDays]);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const monthIndex = currentDate.getMonth();
    setDayAvailability(generateDummyAvailability(year, monthIndex));
    setSelectedDate(null);
  }, [currentDate, generateDummyAvailability]);

  // Clear selection when clicking outside the calendar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setSelectedDate(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [calendarRef]);

  const handleMonthChange = (direction) => {
    setIsCalendarAnimating(true);
    setTimeout(() => {
      setCurrentDate(prevDate => {
        const newDate = new Date(prevDate);
        if (direction === 'next') newDate.setMonth(newDate.getMonth() + 1);
        else newDate.setMonth(newDate.getMonth() - 1);
        return newDate;
      });
      setTimeout(() => setIsCalendarAnimating(false), 200);
    }, 200);
  };

  const goToPreviousMonth = () => handleMonthChange('prev');
  const goToNextMonth = () => handleMonthChange('next');

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const monthIndex = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const handleDateSelect = (day) => {
    if (day) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      if (dayAvailability[date.toDateString()]) {
        if (
          selectedDate &&
          selectedDate.getFullYear() === date.getFullYear() &&
          selectedDate.getMonth() === date.getMonth() &&
          selectedDate.getDate() === date.getDate()
        ) setSelectedDate(null); else setSelectedDate(date);
      }
    }
  };

  const daysInMonthGrid = getDaysInMonth();
  const today = new Date();
  const currentMonthYear = `${getMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`;

  return (
    <div className="w-full font-inter text-slate-800 flex flex-col">
      <motion.div
        ref={calendarRef}
        className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-solid border-slate-200/70 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.08)] p-4 sm:p-2 sm:pb-4 overflow-hidden group"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute -top-16 -left-10 w-56 h-56 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.32),rgba(59,130,246,0)_70%)] blur-2xl" />
          <div className="absolute -bottom-20 -right-8 w-64 h-64 bg-[radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.18),rgba(99,102,241,0)_70%)] blur-2xl" />
        </div> */}

        <div className="relative flex items-center justify-between mb-4 pb-4">
          <button onClick={goToPreviousMonth} className="group/btn flex justify-center items-center p-2 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-solid border-slate-200 text-slate-600 hover:from-white hover:to-slate-50 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow cursor-pointer" aria-label="Previous month">
            <ChevronLeft className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          </button>
          <div className="flex flex-col items-center">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">{currentMonthYear}</h3>
            <div className="mt-2 h-1 w-24 bg-gradient-to-r from-blue-500/60 via-indigo-500/60 to-transparent rounded-full" />
          </div>
          <button onClick={goToNextMonth} className="group/btn p-2 rounded-xl flex justify-center items-center bg-gradient-to-br from-slate-50 to-slate-100 border border-solid border-slate-200 text-slate-600 hover:from-white hover:to-slate-50 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow cursor-pointer" aria-label="Next month">
            <ChevronRight className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>

        <div className={`transition-all duration-300 ease-out ${isCalendarAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="grid grid-cols-7 gap-2 text-center text-[11px] sm:text-xs font-semibold text-slate-500 mb-3 select-none">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
              <span key={idx} className="w-full block tracking-wide">{day}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {daysInMonthGrid.map((day, index) => {
              const date = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
              const isToday = date && date.toDateString() === today.toDateString();
              const isSelected = selectedDate && date && date.toDateString() === selectedDate.toDateString();
              const isAvailable = date && workingDays.includes(getWeekdayName(date));
              const isPastDate = date && date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

              let base = 'relative border-none bg-transparent w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-medium rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70';
              let state = '';
              if (!day) base += ' invisible';
              else if (isPastDate && !isToday) state = ' text-slate-400 cursor-not-allowed';
              else if (isSelected) state = ' z-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg ring-1 ring-blue-500/70';
              else if (isToday) state = ' text-blue-700 ring-2 ring-blue-500 bg-white font-semibold';
              else if (isAvailable && !isPastDate) state = ' text-slate-700 hover:text-blue-700 backdrop-blur-sm cursor-pointer';
              else if (!isAvailable && day && !isPastDate) state = ' text-red-400 cursor-not-allowed';
              else if (!isAvailable && day && isToday && !isSelected) state = ' text-red-600 font-semibold';

              return (
                <button key={index} onClick={() => handleDateSelect(day)} disabled={!day || isPastDate || !isAvailable} className={base + state} aria-label={day ? `Select day ${day}` : ''}>
                  {day}
                  {isAvailable && !isPastDate && !isSelected && !isToday && (<span className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-400/70" />)}
                </button>
              );
            })}
          </div>
        </div>
        {/* <div className="mt-5 h-1 w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent rounded-full" /> */}
      </motion.div>
    </div>
  );
};

export default Calendar;