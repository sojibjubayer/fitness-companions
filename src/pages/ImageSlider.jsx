
import { useState } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

// Initialize Swiper navigation and pagination


const ImageSlider = () => {
  const images = [
    'https://b1494239.smushcdn.com/1494239/wp-content/uploads/2019/04/SkaterLunges.jpg?lossy=0&strip=1&webp=1',
    'https://mlngnuzii6cm.i.optimole.com/w:1583/h:709/q:mauto/ig:avif/f:best/https/stadiumfitness.com.au/wp-content/uploads/2019/05/slider1.jpg',
    'https://lionladyfitness.com/wp-content/uploads/2023/04/dilru-slider-00.jpg',
  ];
 

const [currentIndex, setCurrentIndex] = useState(0);

const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
};

const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
};

  return (
    <div className="mt-2">
    <img className="w-full h-[200px] md:h-[450px]" src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
    <div className="flex gap-16 justify-center -mt-4 md:-mt-5">
        <button onClick={prevSlide}><FaArrowAltCircleLeft className="bg-white rounded-full text-teal-400 text-3xl md:text-4xl"></FaArrowAltCircleLeft></button>
        <button onClick={nextSlide}><FaArrowAltCircleRight className="bg-white rounded-full text-teal-400 text-3xl md:text-4xl"></FaArrowAltCircleRight></button>
    </div>
</div>
  );
};

export default ImageSlider;
