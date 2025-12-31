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
    <div className="relative w-full min-h-[600px] bg-[#D1BACE] py-20 overflow-hidden">
      {/* Main Content Container */}
      <div className="container mx-auto h-full relative z-20 flex items-center justify-center">
        
        {/* Layout Wrapper */}
        <div className="relative w-full max-w-6xl h-[500px] md:h-[600px]">
          
          {/* Image Area - Centered */}
          <div className="relative z-10 w-full md:w-[75%] h-full mx-auto md:ml-10">
            {currentSlideData?.media && typeof currentSlideData.media === 'object' && (
              <Media
                resource={currentSlideData.media}
                imgClassName="object-cover w-full h-full"
                className="w-full h-full shadow-xl"
              />
            )}
          </div>

          {/* Right Side - Content Card (Overlapping) */}
          <div className="
              absolute 
              bottom-10 md:bottom-auto
              md:top-1/2 md:-translate-y-1/2
              right-0 md:right-10
              z-20 
              bg-[#AA94AA] 
              p-12 md:p-16
              w-[90%] md:w-[450px] 
              md:aspect-square
              flex flex-col justify-center
              shadow-2xl
            ">
            
            {/* Badge */}
            {currentSlideData?.badge && (
              <div className="mb-6">
                <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">
                  {currentSlideData.badge}
                </span>  
              </div>
            )}

            {/* Title */}
            {currentSlideData?.title && (
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-[1.1]">
                {currentSlideData.title}
              </h2>
            )}

            {/* Description */}
            {currentSlideData?.description && (
              <p className="text-white/90 mb-8 text-lg hidden md:block">
                {currentSlideData.description}
              </p>
            )}

            {/* Button */}
            {currentSlideData?.buttonText && currentSlideData?.buttonLink && (
              <div className="mt-4">
                <Link
                  href={currentSlideData.buttonLink}
                  className="inline-block uppercase tracking-widest text-xs font-bold border-b-2 border-white/50 text-white pb-1 hover:text-white/80 hover:border-white transition-all"
                >
                  {currentSlideData.buttonText}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slidesArray.length > 1 && (
        <div className="container mx-auto relative z-30">
            <div className="absolute -bottom-10 right-4 flex gap-1">
            <button
                onClick={prevSlide}
                className="w-12 h-12 bg-[#AA94AA] hover:bg-[#968296] text-white flex items-center justify-center transition-all shadow-md"
                aria-label="Previous slide"
            >
                <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="w-12 h-12 bg-[#AA94AA] hover:bg-[#968296] text-white flex items-center justify-center transition-all shadow-md"
                aria-label="Next slide"
            >
                <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
            </div>
        </div>
      )}
    </div>
  )
}
