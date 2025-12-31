import type { GridBlock as GridBlockProps } from 'src/payload-types'
import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type Props = {
  className?: string
} & {
  layout?: 'feature' | 'grid'
  items?: Array<{
    id?: string
    image: any // Media type
    title?: string
    subtitle?: string
    price?: string
    content?: any
    link?: any
  }>
}

export const GridBlock: React.FC<Props> = ({ className, items, layout = 'feature' }) => {
  if (!items || items.length === 0) return null

  if (layout === 'grid') {
    return (
      <section className={cn('py-8 md:py-24', className)}>
        <div className="container mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {items.map((item) => {
              if (!item.image || typeof item.image !== 'object') return null
              
              const hasLink = item.link && (item.link.type === 'reference' || item.link.url)

              return (
                <div key={item.id} className="flex flex-col items-center text-center group">
                  {hasLink ? (
                    <CMSLink {...item.link} label={null} appearance="inline" className="contents">
                      <div className="relative w-full aspect-square overflow-hidden bg-gray-100 mb-6">
                          <Media resource={item.image} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      {item.title && (
                        <h3 className="text-xl md:text-2xl text-primary font-serif mb-2">
                          {item.title}
                        </h3>
                      )}
                    </CMSLink>
                  ) : (
                    <>
                      <div className="relative w-full aspect-square overflow-hidden bg-gray-100 mb-6">
                          <Media resource={item.image} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      {item.title && (
                        <h3 className="text-xl md:text-2xl text-primary font-serif mb-2">
                          {item.title}
                        </h3>
                      )}
                    </>
                  )}
                   
                   {item.price && (
                     <p className="text-gray-500 text-sm tracking-wider uppercase">
                       {item.price}
                     </p>
                   )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={cn('py-8 md:py-24', className)}>
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex flex-col gap-12 md:gap-24">
          {items.map((item, index) => {
            if (!item.image || typeof item.image !== 'object') return null
            const isTextLeft = index % 2 === 0;

            return (
              <div 
                key={item.id} 
                className={cn(
                  "flex flex-col md:flex-row items-center gap-8 md:gap-16",
                )}
              >
                  {/* Layout Option 1: Text Left, Image Right (Index 0) */}
                  {isTextLeft ? (
                      <>
                        <div className="w-full md:w-1/2 order-2 md:order-1">
                             <div className="max-w-lg mx-auto md:ml-0 md:mr-auto">
                                {item.subtitle && (
                                    <h6 className="uppercase tracking-widest text-xs md:text-sm font-bold text-[#AA94AA] mb-3 md:mb-4">
                                        {item.subtitle}
                                    </h6>
                                )}
                                {item.content && (
                                  <div className="prose prose-sm md:prose-lg mb-6 text-gray-600">
                                      <RichText data={item.content} enableGutter={false} />
                                  </div>
                                )}
                                {item.link && (
                                     <CMSLink
                                     {...item.link}
                                     appearance="inline" 
                                     className="uppercase tracking-widest text-xs md:text-sm font-bold border border-gray-300 rounded-full px-5 py-2.5 md:px-6 md:py-3 hover:bg-gray-100 transition-colors inline-block no-underline"
                                    />
                                )}
                             </div>
                        </div>

                        <div className="w-full md:w-1/2 order-1 md:order-2 bg-[#D1BACE]/30 p-4 md:p-8">
                             <div className="relative aspect-[4/3] w-full h-full overflow-hidden shadow-lg">
                                <Media resource={item.image} fill className="object-cover" />
                             </div>
                        </div>
                      </>
                  ) : (
                    /* Layout Option 2: Image Left, Text Right (Index 1) */
                     <>
                        <div className="w-full md:w-1/2 order-1 bg-[#D1BACE]/30 p-4 md:p-8">
                             <div className="relative aspect-[4/3] w-full h-full overflow-hidden shadow-lg">
                                <Media resource={item.image} fill className="object-cover" />
                             </div>
                        </div>

                        <div className="w-full md:w-1/2 order-2">
                             <div className="max-w-lg mx-auto md:ml-auto md:mr-0 pl-0 md:pl-8">
                                {item.subtitle && (
                                    <h6 className="uppercase tracking-widest text-xs md:text-sm font-bold text-[#AA94AA] mb-3 md:mb-4">
                                        {item.subtitle}
                                    </h6>
                                )}
                                {item.content && (
                                  <div className="prose prose-sm md:prose-lg mb-6 text-gray-600">
                                      <RichText data={item.content} enableGutter={false} />
                                  </div>
                                )}
                                {item.link && (
                                    <CMSLink
                                        {...item.link}
                                        appearance="inline" 
                                        className="uppercase tracking-widest text-xs md:text-sm font-bold border border-gray-300 rounded-full px-5 py-2.5 md:px-6 md:py-3 hover:bg-gray-100 transition-colors inline-block no-underline"
                                    />
                                )}
                             </div>
                        </div>
                     </>
                  )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
