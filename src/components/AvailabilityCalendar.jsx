import { useState, useEffect, useCallback } from 'react';
import { CalendarDays, Clock, ChevronLeft, ChevronRight, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};




const AvailabilityCalendar = () => {

  const { user } = useUser();    // Get context-data

  const workingDays = user.workingDays;
  const workingHours = user.workingHours;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [dayAvailability, setDayAvailability] = useState({});
  const [isCalendarAnimating, setIsCalendarAnimating] = useState(false);
  const clearSelection = () => setSelectedDate(null);    // For clearing selection

  // Helper to generate dummy availability data for a month based on workingDays
  const generateDummyAvailability = useCallback((year, monthIndex) => {
    const availability = {};
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, monthIndex, i);
      const dayOfWeekName = getWeekdayName(date);

      // Use the local workingDays constant
      availability[date.toDateString()] = workingDays.includes(dayOfWeekName);
    }
    return availability;
  }, []); // No dependency on workingDays as it's now a local constant

  useEffect(() => {
    const year = currentDate.getFullYear();
    const monthIndex = currentDate.getMonth();
    setDayAvailability(generateDummyAvailability(year, monthIndex)); // Use local function
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
        setSelectedDate(date);
      }
    }
  };

  const daysInMonthGrid = getDaysInMonth();
  const today = new Date();
  const currentMonthYear = `${getMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`;




  return (
    <div
      className="w-full bg-gray-200 p-2 rounded-3xl
                 font-inter text-gray-800 border border-gray-800 flex flex-col gap-5 h-full"
    >
      {/* Calendar Section */}
      <motion.div
        className="p-3 bg-white rounded-2xl shadow-lg border border-gray-100"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
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
          <h3 className="text-2xl font-bold text-blue-700">{currentMonthYear}</h3>
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
                else if (isPastDate && !isToday) dayClass += " border-solid border rounded-full text-sm text-gray-400 border-none cursor-not-allowed bg-white";
                else if (isSelected) dayClass += " bg-blue-500 border-solid border-none text-white shadow-lg scale-105 text-sm text-sm ring-2 ring-blue-500 rounded-full cursor-pointer";
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
                    // Remove background and border for available/unavailable days (not past, not selected, not today)
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

      {/* Working Hours Section */}
      <motion.div
        className="px-6 py-4 glass rounded-2xl shadow-xl border border-gray-100/20 bg-gradient-to-br from-blue-50/50 to-purple-50/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center mb-1">
          <Clock className="w-6 h-6 text-blue-500 mr-2" />
          <h3 className="text-xl font-semibold text-gray-800">Working Hours</h3>
        </div>

        <AnimatePresence mode="wait">
          {selectedDate ? (
            workingDays.includes(getWeekdayName(selectedDate)) ? (
              <motion.div
                key="available"
                className="flex flex-col items-center justify-center pt-4 pb-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="glass p-6 bg-gray-200 rounded-xl max-w-sm w-full text-center shadow-lg">
                  <p className="text-3xl font-bold text-gray-800 mb-2">{workingHours}</p>
                  <p className="text-gray-600 text-lg">
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <motion.div
                  className="mt-6 px-4 py-2 flex items-center justify-center gap-2 bg-green-600 text-white rounded-full text-sm font-medium shadow-md"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <TaskAltIcon fontSize='small' />
                  Available
                </motion.div>
                <motion.button
                  onClick={clearSelection}
                  className="mt-4 px-4 py-1 rounded-full bg-blue-50 text-blue-600 font-semibold shadow hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
                  style={{ border: 'none' }}
                  whileHover={{ x: 5, scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  Clear Selection
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="unavailable"
                className="flex flex-col items-center justify-center py-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                <XCircle className="w-12 h-12 text-red-400 mb-4" />
                </motion.div>
                <p className="text-lg font-medium text-gray-700 mb-2">Not Available</p>
                <p className="text-gray-500 text-sm">Please select an available date.</p>
                <motion.button
                  onClick={clearSelection}
                  className="mt-4 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-semibold shadow hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
                  style={{ border: 'none' }}
                  whileHover={{ x: 5, scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  Clear Selection
                </motion.button>
              </motion.div>
            )
          ) : (
            <motion.div
              key="no-selection"
              className="flex flex-col items-center justify-center py-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <CalendarDays className="w-12 h-12 text-gray-400 mb-4" />
              </motion.div>
              <p className="text-lg font-medium text-gray-700 mb-2">Select a Date</p>
              <p className="text-gray-500 text-sm">Available days are highlighted in blue.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};


export default AvailabilityCalendar;