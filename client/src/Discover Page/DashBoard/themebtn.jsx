import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeBtn() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark" || false);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = isDark ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  },[ isDark]);

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full p-2 border border-gray-400 dark:border-gray-200 bg-white dark:bg-gray-900 hover:scale-110 transition"
      title="Toggle Theme"
    >
      {isDark ? <Moon className="w-5 h-5 text-white" /> :<Sun className="w-5 h-5 text-yellow-400" /> }
    </button>
  );
}

