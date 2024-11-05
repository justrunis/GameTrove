import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function Modal({ children, open, onClose, className = "" }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.style.display = "flex";
    } else {
      modal.style.display = "none";
    }
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-100 z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            ref={dialog}
          >
            <div
              className={`bg-base-300 text-base-content rounded-lg shadow-lg max-w-md w-full p-6 relative border-4 border-accent ${className}`}
            >
              <button
                className="absolute top-4 right-4 text-2xl text-base-content hover:text-accent"
                onClick={onClose}
              >
                <IoCloseCircleOutline />
              </button>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.getElementById("modal")
  );
}
