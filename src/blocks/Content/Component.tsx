import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '../../components/Media'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '10',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }
  console.log(columns);
  

  const hasImage = columns?.some((col) => col.image)

  return (
    <div
      className={cn({
        'container my-16': !hasImage,
        'w-full py-2 -my-16 bg-[#d7b7d4]': hasImage,
      })}
    >
      <div
        className={cn('grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-8 max-w-5xl mx-auto', {
          container: hasImage,
        })}
      >
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size, image } = col

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]} `, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                {image && typeof image === 'object' && (
                  <div className="flex justify-center mb-4 mt-3">
                    <div className="w-24 h-24 rounded-full bg-[#ba9fb7] flex items-center justify-center">
                      <Media resource={image} className="w-10 h-10 object-contain text-white" />
                    </div>
                  </div>
                )}
                <div className={cn({ 'text-center text-white flex flex-col items-center': Boolean(image) })}>
                  {richText && <RichText data={richText} enableGutter={false} />}

                  {enableLink && <CMSLink {...link} />}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
