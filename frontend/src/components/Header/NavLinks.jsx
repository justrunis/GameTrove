import { NavLink } from "react-router-dom";
import { FaHome, FaFilm, FaQuestionCircle } from "react-icons/fa";
import { BiSolidLogInCircle, BiSolidDiscount } from "react-icons/bi";
import { MdPerson, MdAdminPanelSettings } from "react-icons/md";
import { IoLogIn } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useEffect, useState } from "react";
import { DARK_THEME } from "../../utils/constants";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import ThemeSelector from "../UI/ThemeSelector";
import { AuthVerify, getUserRole } from "../../auth/auth";
import { getUserUsername } from "../../auth/auth";

export default function NavLinks({ closeMenu }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const token = localStorage.getItem("game-trove-token");
  const userRole = getUserRole(token);
  const navigate = useNavigate();

  const handleLinkClick = () => {
    if (closeMenu) {
      closeMenu();
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("game-trove-token");
    navigate("/");
  };

  useEffect(() => {
    AuthVerify(token);
  }, [token]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      setTheme(theme);
    }
  }, []);

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
          to="/giveaways"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center text-sm lg:text-lg font-bold ${
              isActive
                ? "text-accent"
                : "text-primary-content hover:text-accent"
            }`
          }
        >
          <BiSolidDiscount className="inline mr-2" />
          Giveaways
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
        {userRole === "admin" && (
          <NavLink
            to="/admin"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center text-sm lg:text-lg font-bold ${
                isActive
                  ? "text-accent"
                  : "text-primary-content hover:text-accent"
              }`
            }
          >
            <MdAdminPanelSettings className="inline mr-2" />
            Admin
          </NavLink>
        )}
      </div>

      {/* Right-aligned User Links */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {!token && (
          <>
            <NavLink
              to="/login"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center text-sm lg:text-lg font-bold ${
                  isActive
                    ? "text-accent"
                    : "text-primary-content hover:text-accent"
                }`
              }
            >
              <BiSolidLogInCircle className="inline mr-2" />
              Login
            </NavLink>
            <NavLink
              to="/register"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center text-sm lg:text-lg font-bold ${
                  isActive
                    ? "text-accent"
                    : "text-primary-content hover:text-accent"
                }`
              }
            >
              <IoLogIn className="inline mr-2" />
              Register
            </NavLink>
          </>
        )}
        {token && (
          <>
            <NavLink
              to="/profile"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center text-sm lg:text-lg font-bold ${
                  isActive
                    ? "text-accent"
                    : "text-primary-content hover:text-accent"
                }`
              }
            >
              <MdPerson className="inline mr-2" />
              {getUserUsername(token)}
            </NavLink>
            <NavLink
              to="/login"
              onClick={logoutUser}
              className="flex items-center text-sm lg:text-lg font-bold text-primary-content hover:text-accent"
            >
              <CiLogout className="inline mr-2" />
              Logout
            </NavLink>
          </>
        )}
        {/* Theme Toggle */}
        <ThemeSelector />
      </div>
    </div>
  );
}
