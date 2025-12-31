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
    return (
      <section className={cn('relative w-full bg-[#D1BACE] py-12 md:py-24 overflow-hidden', className)}>
        <div className="relative container mx-auto min-h-auto md:min-h-[520px] flex flex-col md:block items-center justify-center">

          {/* Center Image */}
          <div className="relative w-[300px] h-[400px] md:w-[420px] md:h-[520px] z-10 mx-auto md:mx-0 md:ml-auto md:mr-auto"> {/* Centered on mobile and desktop */}
            <Media resource={image} fill className="object-cover" />
          </div>

          {/* Overlapping Left Card */}
          <div className="
              relative md:absolute
              left-auto md:left-56 lg:left-72
              top-auto md:top-1/2
              translate-y-0 md:-translate-y-1/2
              z-20
              bg-[#AA94AA]
              p-8 md:p-10
              w-[90%] md:w-auto
              max-w-md
              mx-auto md:mx-0
              -mt-12 md:mt-0
              shadow-lg md:shadow-none
              ">
            <div className="prose prose-invert mb-8">
              <RichText data={content} enableGutter={false} />
            </div>

            {link && (
              <CMSLink
                {...link}
                appearance="inline"
                className="uppercase tracking-widest text-sm font-bold border-b-2 border-white pb-1"
              />
            )}
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
