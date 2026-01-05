'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'
import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'

export const CarouselHero: React.FC<Page['hero']> = ({ slides }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  const slidesArray = Array.isArray(slides) ? slides : []

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesArray.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesArray.length) % slidesArray.length)
  }

  if (!slidesArray.length) return null

  const currentSlideData = slidesArray[currentSlide]

  return (
    <div className="relative w-full min-h-[600px]
  bg-[linear-gradient(to_bottom,#CBB0C6_0%,#CBB0C6_55%,#E1C9DD_55%,#E1C9DD_100%)]
  py-16 md:py-20 overflow-hidden">
      {/* Main Content Container */}
      <div className="container mx-auto h-full relative z-20 flex items-center justify-center px-8">
        
        {/* Layout Wrapper */}
        <div className="relative w-full max-w-6xl flex flex-col items-center justify-center min-h-[500px] md:h-[600px]">
          
          {/* Image Area - Centered */}
          <div className="relative z-10 flex flex-grow aspect-[16/10] md:h-full w-[90%] md:w-[70%] mx-auto md:mx-0 md:self-start shadow-xl">
            {currentSlideData?.media && typeof currentSlideData.media === 'object' && (
              <Media
                resource={currentSlideData.media}
                imgClassName="object-cover w-full h-full"
                className="w-full h-full"
              />
            )}
          </div>

          {/* Right Side - Content Card (Overlapping) */}
          <div className="
              relative md:absolute 
              z-20 
              bg-[#AA94AA] 
              p-6 md:p-16
              w-[90%] md:w-[425px] 

              mb-[-4rem] md:mb-0
              md:top-1/2 md:-translate-y-1/2
              md:right-10
              flex flex-col justify-center
              shadow-2xl
              transition-all duration-500
            ">
            
            {/* Badge */}
            {currentSlideData?.badge && (
              <div className="mb-2 md:mb-6">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white uppercase">
                  {currentSlideData.badge}
                </span>  
              </div>
            )}

            {/* Title */}
            {currentSlideData?.title && (
              <h2 className="text-2xl md:text-5xl font-serif text-white mb-3 md:mb-6 leading-[1.1]">
                {currentSlideData.title}
              </h2>
            )}

            {/* Description */}
            {currentSlideData?.description && (
              <p className="text-white/90 mb-6 md:mb-8 text-sm md:text-lg hidden md:block">
                {currentSlideData.description}
              </p>
            )}

            {/* Mobile Description - show only on mobile if it fits, or keep hidden if requested */}
            {/* {currentSlideData?.description && (
              <p className="text-white/90 mb-4 text-xs block md:hidden line-clamp-2">
                {currentSlideData.description}
              </p>
            )} */}

            {/* Button */}
            {currentSlideData?.buttonText && currentSlideData?.buttonLink && (
              <div className="mt-2 md:mt-4">
                <Link
                  href={currentSlideData.buttonLink}
                  className="inline-block uppercase tracking-widest text-[10px] md:text-xs font-bold border-b-2 border-white/50 text-white pb-1 hover:text-white/80 hover:border-white transition-all"
                >
                  {currentSlideData.buttonText}
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* Navigation Arrows - Positioned at bottom right of Layout Wrapper */}
          {slidesArray.length > 1 && (
            <div className="absolute bottom-0 right-0 md:right-10 flex z-30">
              <button
                onClick={prevSlide}
                className="w-10 h-10 md:w-12 md:h-12 bg-black/20 bottom-0 hover:bg-black/40 text-white flex items-center justify-center transition-all backdrop-blur-sm"
                aria-label="Previous slide"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 md:w-12 md:h-12 bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-all backdrop-blur-sm border-l border-white/10"
                aria-label="Next slide"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
      </div>
    </div>
  )
}
