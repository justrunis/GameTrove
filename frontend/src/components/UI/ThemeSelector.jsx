import { useEffect, useState } from "react";
import { makeFirstLetterUpperCase } from "../../utils/formating";
import { THEMES } from "../../utils/constants";
import Button from "./Button";

export default function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("theme") || THEMES[0]
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", selectedTheme);
  }, [selectedTheme]);

  function handleThemeChange(theme) {
    setSelectedTheme(theme);
    localStorage.setItem("theme", theme);
    setIsDropdownOpen(false); // Close dropdown after selecting a theme
  }

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <div className="dropdown mt-4 lg:mt-0">
      <Button
        tabIndex={0}
        role="button"
        className="btn btn-accent"
        onClick={toggleDropdown}
      >
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </Button>
      {isDropdownOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content bg-base-300 rounded-box z-[1] w-32 p-2 mt-1 shadow-2xl border-2 border-accent max-h-48 overflow-auto"
        >
          {THEMES.map((theme) => (
            <li key={theme}>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label={makeFirstLetterUpperCase(theme)}
                value={theme}
                checked={selectedTheme === theme}
                onChange={() => handleThemeChange(theme)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
