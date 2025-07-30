import { useState, useEffect, useCallback } from 'react';
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
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};




const AvailabilityCalendar = () => {
  
  const { user } = useUser(); // Get context-data

  const workingDays = user.workingDays;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [dayAvailability, setDayAvailability] = useState({});
  const [isCalendarAnimating, setIsCalendarAnimating] = useState(false);
  // const clearSelection = () => setSelectedDate(null);

  // Helper to generate dummy availability data for a month based on workingDays
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

  const handleMonthChange = (direction) => {
    setIsCalendarAnimating(true);

    setTimeout(() => {
      setCurrentDate((prevDate) => {
        const newDate = new Date(prevDate);
        if (direction === 'next') {
          newDate.setMonth(newDate.getMonth() + 1);
        } else {
          newDate.setMonth(newDate.getMonth() - 1);
        }
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
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const handleDateSelect = (day) => {
    if (day) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      if (dayAvailability[date.toDateString()]) {
        // If already selected, unselect
        if (
          selectedDate &&
          selectedDate.getFullYear() === date.getFullYear() &&
          selectedDate.getMonth() === date.getMonth() &&
          selectedDate.getDate() === date.getDate()
        ) {
          setSelectedDate(null);
        } else {
          setSelectedDate(date);
        }
      }
    }
  };

  const daysInMonthGrid = getDaysInMonth();
  const today = new Date();
  const currentMonthYear = `${getMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`;

  return (
    <div className="w-full rounded-2xl font-inter text-gray-800 flex flex-col gap-5">
      {/* Calendar Section */}
      <motion.div
        className="p-2 bg-white rounded-2xl shadow-md"
        variants={containerVariants}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex justify-between items-center mb-3 border-b pb-4 border-gray-100">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-full bg-blue-100 flex border-none justify-center items-center text-blue-600 hover:bg-blue-200
                       transition-colors duration-200 transform hover:scale-105 ring-1 ring-blue-200 cursor-pointer"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h3 className="text-2xl text-center font-bold text-blue-700">{currentMonthYear}</h3>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-full bg-blue-100 flex border-none justify-center items-center text-blue-600 hover:bg-blue-200
                       transition-colors duration-200 transform hover:scale-105 ring-1 ring-blue-200 cursor-pointer"
            aria-label="Next month"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Calendar Grid with Animation */}
        <div className={`
            transition-all duration-200 ease-in-out
            ${isCalendarAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
        `}>
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-600 mb-3">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
              <span key={idx} className="w-full block">{day}</span>
            ))}
          </div>

          {/* Days of the month grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {daysInMonthGrid.map((day, index) => {
              const date = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
              const isToday = date && date.toDateString() === today.toDateString();
              const isSelected = selectedDate && date && date.toDateString() === selectedDate.toDateString();
              const isAvailable = date && workingDays.includes(getWeekdayName(date));
              const isPastDate = date && date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

              let dayClass = "w-10 h-10 flex items-center justify-center text-lg transition-all duration-200 transform";
              if (!day) dayClass += " invisible";
              else if (isPastDate && !isToday) dayClass += " border-solid border rounded-full text-sm text-gray-400 border-none cursor-not-allowed bg-transparent";
              else if (isSelected) dayClass += " bg-blue-500 border-solid border-none text-white shadow-lg scale-105 text-sm ring-2 ring-blue-500 rounded-full cursor-pointer";
              else if (isToday) dayClass += " font-extrabold text-blue-700 ring-2 ring-blue-500 text-sm border-none rounded-full cursor-pointer";
              else if (isAvailable && !isPastDate) dayClass += " hover:bg-black text-blue-800 text-sm hover:scale-105 cursor-pointer";
              else if (!isAvailable && day && !isPastDate) dayClass += " text-red-400 text-sm cursor-not-allowed";
              else if (!isAvailable && day && isToday && !isSelected) dayClass += " font-extrabold text-sm text-red-700";

              return (
                <button
                  key={index}
                  onClick={() => handleDateSelect(day)}
                  disabled={!day || isPastDate || !isAvailable}
                  className={dayClass}
                  aria-label={day ? `Select day ${day}` : ''}
                  style={
                    (!isPastDate && !isSelected && !isToday)
                      ? { background: "transparent", border: "none" }
                      : undefined
                  }
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AvailabilityCalendar;