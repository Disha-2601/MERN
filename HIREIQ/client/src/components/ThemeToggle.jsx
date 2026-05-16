import React, { useEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="theme-toggle h-10 w-10 rounded-full bg-gray-100 text-indigo-600 border border-indigo-100 flex items-center justify-center hover:bg-indigo-50 transition"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  )
}

export default ThemeToggle
