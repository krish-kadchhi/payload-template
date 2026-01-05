import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({
  className,
  content,
  style,
  image,
  link,
}) => {
  if (image && typeof image === 'object') {
    const isSecond = style === 'second'
    const isFirst = style === 'first'

    return (
      <section className={cn('relative w-full bg-[#D1BACE] py-16 md:py-31 lg:h-[825px] overflow-hidden', className)}>
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col items-center justify-center min-h-[500px] md:min-h-[700px]">
            
            {/* The Layout Group */}
            <div className="relative flex flex-col-reverse md:flex-row items-center justify-center w-full max-w-6xl">
              
              {/* Image Container */}
              <div className={cn(
                "relative z-10 w-full max-w-[348px] md:max-w-none md:w-[480px] aspect-[4/5] md:h-[640px] shadow-2xl transition-all duration-700 overflow-hidden",
                isSecond ? "md:-translate-x-12 lg:-translate-x-24" : "md:translate-x-12 lg:translate-x-24"
              )}>
                <Media resource={image} fill className="object-cover" />
              </div>

              {/* Overlapping Card */}
              <div className={cn(
                "z-20 p-8 md:p-10 lg:p-14 w-[90%] md:w-[380px] lg:w-[420px] h-auto min-h-[300px] md:min-h-[420px] lg:min-h-[480px] flex flex-col justify-center bg-[#b08ead] shadow-2xl transition-all duration-700",
                "relative md:absolute md:top-1/2 -mt-24 md:mt-0 md:-translate-y-1/2",
                isSecond 
                  ? "md:left-1/2 lg:translate-x-[-6%] md:translate-x-[-10%]" 
                  : "md:right-1/2 lg:translate-x-[6%] md:translate-x-[10%]"
              )}>
                <div className="prose prose-invert prose-sm md:prose-base mb-6 md:mb-8 max-w-none [&_h1]:font-serif [&_h2]:font-serif [&_h3]:font-serif [&_p]:leading-relaxed">
                  <RichText data={content} enableGutter={false} />
                </div>

                {link && (
                  <div className="mt-2 md:mt-4">
                    <CMSLink
                      {...link}
                      appearance="inline"
                      className="uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold border-b border-white/60 pb-1.5 hover:border-white transition-all inline-block"
                    />
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </section>
    )
  }

  /* Fallback (no image) */
  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <div
        className={cn(
          'border py-3 px-6 flex items-center rounded',
          {
            'border-border bg-card': style === 'info',
            'border-error bg-error/30': style === 'error',
            'border-success bg-success/30': style === 'success',
            'border-warning bg-warning/30': style === 'warning',
          }
        )}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}
