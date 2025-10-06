import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useMockBlogData } from '../hooks/useMockBlogData';
import { SliderControls } from './SliderControls';
import type { Slide } from '../types';

const ANIMATION_DURATION = 1200; // ms

const HeroSlider: React.FC = () => {
  const slides = useMockBlogData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const autoPlayTimerRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
  }, []);
  
  const changeSlide = useCallback((newIndex: number) => {
    if (isTransitioning || newIndex === currentIndex) return;

    clearTimers();
    
    setOutgoingIndex(currentIndex);
    setCurrentIndex(newIndex);
    setIsTransitioning(true);

    transitionTimerRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
      setOutgoingIndex(null);
    }, ANIMATION_DURATION);
  }, [currentIndex, isTransitioning, clearTimers]);

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    changeSlide(newIndex);
  }, [currentIndex, slides.length, changeSlide]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    changeSlide(newIndex);
  }, [currentIndex, slides.length, changeSlide]);

  const goToSlide = (slideIndex: number) => {
    changeSlide(slideIndex);
  };
  
  useEffect(() => {
    autoPlayTimerRef.current = window.setTimeout(goToNext, 5000);
    return clearTimers;
  }, [currentIndex, goToNext, clearTimers]);


  if (!slides || slides.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="w-full h-full">
        {slides.map((slide: Slide, slideIndex: number) => {
            const theme = slide.theme || 'dark';
            const isLight = theme === 'light';

            const isCurrent = slideIndex === currentIndex;
            const isOutgoing = slideIndex === outgoingIndex;
            const isVisible = isCurrent || isOutgoing;
            
            const animationClass = isCurrent && isTransitioning ? 'animate-circle-reveal' : '';

            let zIndex = 1;
            if(isCurrent) zIndex = 10;
            if(isOutgoing) zIndex = 5;

            return (
              <div
                key={slide.id}
                className={`absolute top-0 left-0 w-full h-full ${animationClass}`}
                style={{
                  visibility: isVisible ? 'visible' : 'hidden',
                  zIndex: zIndex,
                }}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.imageUrl})` }}
                />
                {isLight 
                    ? <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-20" /> 
                    : <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />
                }
                
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-start p-8 md:p-16 lg:p-24 z-10">
                  <div className="max-w-2xl text-left">
                     <h2 className={`font-gmarket text-4xl-mobile md:text-5xl font-bold mb-4 leading-tight transition-all duration-700 ease-out ${
                        isLight ? 'text-gray-900' : 'text-white'
                      } ${
                        isCurrent ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-5'
                      }`}>
                      {slide.title}
                    </h2>
                    <p className={`text-base md:text-lg mb-8 max-w-2xl transition-all duration-700 ease-out ${
                        isLight ? 'text-gray-700' : 'text-gray-200'
                      } ${
                        isCurrent ? 'opacity-100 translate-y-0 delay-[650ms]' : 'opacity-0 translate-y-5'
                      }`}>
                      {slide.description}
                    </p>
                    <a
                      href={slide.link}
                      className={`inline-block font-bold py-3 px-8 rounded transition-all duration-700 ease-out ${
                        isLight ? 'bg-gray-800 text-white hover:bg-black' : 'bg-pink-600 text-white hover:bg-pink-700'
                      } ${
                        isCurrent ? 'opacity-100 translate-y-0 delay-[800ms]' : 'opacity-0 translate-y-5'
                      }`}
                    >
                      자세히보기
                    </a>
                  </div>
                </div>
              </div>
            )
        })}
      </div>
      <SliderControls
        goToPrevious={goToPrevious}
        goToNext={goToNext}
        goToSlide={goToSlide}
        slidesCount={slides.length}
        currentIndex={currentIndex}
      />
    </div>
  );
};

export default HeroSlider;