import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import Button from "./Button";

export default function Collapsible({
  title,
  className = "bg-base-100 rounded-lg p-4 m-2",
  children,
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  function toggleCollapse() {
    setIsCollapsed((prev) => !prev);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={className}
      onClick={toggleCollapse}
    >
      <div className="flex justify-between items-center cursor-pointer">
        <h2 className="text-2xl font-bold text-base-content">{title}</h2>
        <Button>{isCollapsed ? <FaArrowDown /> : <FaArrowUp />}</Button>
      </div>
      {!isCollapsed && children}
    </motion.div>
  );
}
