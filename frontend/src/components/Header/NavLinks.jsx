import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaFilm,
  FaQuestionCircle,
  FaRegMoon,
  FaRegSun,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { DARK_THEME, LIGHT_THEME } from "../../utils/constants";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

export default function NavLinks({ closeMenu }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || DARK_THEME
  );
  const navigate = useNavigate();

  const handleLinkClick = () => {
    if (closeMenu) {
      closeMenu();
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      setTheme(theme);
    }
  }, []);

  const changeTheme = () => {
    const root = document.documentElement;
    const theme = root.getAttribute("data-theme");

    if (theme === DARK_THEME || localStorage.getItem("theme") === DARK_THEME) {
      root.setAttribute("data-theme", LIGHT_THEME);
      localStorage.setItem("theme", LIGHT_THEME);
      setTheme(LIGHT_THEME);
    } else {
      root.setAttribute("data-theme", DARK_THEME);
      localStorage.setItem("theme", DARK_THEME);
      setTheme(DARK_THEME);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full justify-between items-center lg:items-end">
      {/* Left-aligned Navigation Links */}
      <div className="flex flex-col lg:flex-row gap-4">
        <Logo className="w-40" onClick={() => navigate("/")} />
        <NavLink
          to="/"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center text-sm lg:text-lg font-bold ${
              isActive
                ? "text-accent"
                : "text-primary-content hover:text-accent"
            }`
          }
        >
          <FaHome className="inline mr-2" />
          Home
        </NavLink>
        <NavLink
          to="/games"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center text-sm lg:text-lg font-bold ${
              isActive
                ? "text-accent"
                : "text-primary-content hover:text-accent"
            }`
          }
        >
          <FaFilm className="inline mr-2" />
          Games
        </NavLink>
        <NavLink
          to="/about"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center text-sm lg:text-lg font-bold ${
              isActive
                ? "text-accent"
                : "text-primary-content hover:text-accent"
            }`
          }
        >
          <FaQuestionCircle className="inline mr-2" />
          About
        </NavLink>
      </div>

      {/* Right-aligned User Links */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Theme Toggle */}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={changeTheme}
            checked={theme === "dark"}
          />
          <FaRegSun className="swap-on text-2xl text-primary-content" />
          <FaRegMoon className="swap-off text-2xl text-primary-content" />
        </label>
      </div>
    </div>
  );
}
