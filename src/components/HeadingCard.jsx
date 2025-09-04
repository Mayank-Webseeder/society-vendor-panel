import { useState, useEffect } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useUser } from "../UserContext";
import { Switch } from "@mui/material";

const HeadingCard = () => {
  const { user, setUser } = useUser();

  const subscriptionActive = user?.subscription_active;
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const handleToggleSubscription = () => {
    setUser({
      ...user,
      subscription_active: !user.subscription_active,
    });
  };

  return (
    <div className="w-full">
      <div className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-3xl shadow-lg border border-slate-200/60 backdrop-blur-sm hover:shadow-xl hover:border-slate-300/60 transition-all duration-500 ease-out group overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

        {/* Content container */}
        <div className="relative px-3 py-1 sm:px-5 sm:py-3.5">
          <div className="flex flex-row sm:flex-row justify-between items-start sm:items-start gap-3 sm:gap-0">
            {/* Main content area */}
            <div className="flex sm:flex-row items-center sm:items-center gap-4 sm:gap-6 flex-1">
              {/* Enhanced avatar section */}
              <div className="relative flex-shrink-0">
                <div className="bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 rounded-xl p-2 sm:p-3 shadow-md ring-1 ring-slate-200/50 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 ease-out">
                  <PermIdentityIcon
                    sx={{ fontSize: { xs: 26, sm: 32 } }}
                    className="text-indigo-600"
                  />
                </div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              </div>

              {/* Greeting text */}
              <div className="flex-1 mt-2 sm:mt-0">
                <div className="sm:space-y-1">
                  <h1 className="text-lg sm:text-2xl font-semibold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent leading-tight">
                    {greeting}
                  </h1>
                  <p className="text-base sm:text-xl text-slate-600 font-medium">
                    {user?.name ? user.name.split(" ")[0] : "User"} !
                  </p>
                </div>
                {/* Subtle underline accent */}
                {/* <div className="mt-0 h-0.5 w-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-60"></div> */}
              </div>
            </div>

            {/* Subscription badge */}
            {subscriptionActive && (
              <div className="flex-shrink-0 ml-0 sm:ml-4 mt-8 sm:mt-5 self-center sm:self-auto">
                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 px-2 py-1.5 text-xs sm:px-2.5 sm:py-2.5 sm:text-sm font-semibold text-amber-800 ring-2 ring-amber-200/60 shadow-md hover:shadow-lg transition-all duration-300 group/badge">
                    {/* Premium icon */}
                    <svg
                      className="w-4 h-4 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="hidden sm:inline">
                      Subscription Active
                    </span>
                    {/* <span className="sm:hidden">Subscription </span> */}
                  </span>
                  {/* Subtle shimmer effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/badge:opacity-100 group-hover/badge:animate-pulse transition-opacity duration-500"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Test Mode Badge */}
        {/* {user?.testMode && (
          // <div className="absolute bottom-4 right-4 flex-col items-end gap-2">
          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
            <div className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-800 ring-2 ring-red-200/60 shadow-md hover:shadow-lg transition-all duration-300">
              <svg
                className="w-4 h-4 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Test Mode Active
            </div> */}

            {/* Toggle Switch for Subscription */}
            {/* <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 ring-2 ring-blue-200/60 shadow-md hover:shadow-lg transition-all duration-300">
              <span>Subscription</span>
              <Switch
                checked={subscriptionActive}
                onChange={handleToggleSubscription}
                color="primary"
                size="small"
              />
            </div>
          </div>
        )} */}

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
      </div>
    </div>
  );
};

export default HeadingCard;
