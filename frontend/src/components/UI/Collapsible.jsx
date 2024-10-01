import { useState, useRef, useEffect } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import Button from "./Button";

export default function Collapsible({
  title,
  className = "bg-base-100 rounded-lg p-4 m-2",
  children,
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const contentRef = useRef(null);

  function toggleCollapse() {
    setIsCollapsed((prev) => !prev);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={className}
    >
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleCollapse}
      >
        <h2 className="text-2xl font-bold text-base-content">{title}</h2>
        <Button>{isCollapsed ? <FaArrowDown /> : <FaArrowUp />}</Button>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isCollapsed ? 0 : "auto",
          opacity: isCollapsed ? 0 : 1,
        }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <div ref={contentRef}>
          <div className="mt-4">{children}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
