import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function Carousel({
  images,
  className = "flex justify-center items-center w-auto h-full mb-20",
  interval = 10000,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(slideInterval);
  }, [currentSlide, interval]);

  return (
    <div className={className}>
      <div className="carousel w-auto relative">
        {images.map((image, index) => (
          <AnimatePresence key={index}>
            {index === currentSlide && (
              <motion.img
                src={image}
                alt="carousel"
                className="w-auto h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        ))}
        <Button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-base-100 text-base-content px-4 py-2"
          onClick={prevSlide}
        >
          <FaArrowLeft />
        </Button>
        <Button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-base-100 text-base-content px-4 py-2"
          onClick={nextSlide}
        >
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
}
