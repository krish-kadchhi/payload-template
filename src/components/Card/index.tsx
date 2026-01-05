'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'content'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, content } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'overflow-hidden flex flex-col hover:cursor-pointer w-full max-w-[368px] mx-auto',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full aspect-[368/313] overflow-hidden">
        {!metaImage && <div className="absolute inset-0 flex items-center justify-center bg-[#C1BACE] text-white">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            fill
            imgClassName="object-cover w-full h-full"
            resource={metaImage}
            size="32vw"
          />
        )}
      </div>
      <div className="p-6 bg-[#ceb3cb] flex-grow-0 min-h-[150px]">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="mb-1">
            <h3 className="text-white m-0 text-3xl font-serif">
              <Link className="h-auto" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {content && (
          <div className="text-white">
            <RichText data={content} enableGutter={false} enableProse={false} />
          </div>
        )}
        {!content && description && (
          <div className="mt-2 text-white">
            <p className="italic text-sm">{sanitizedDescription}</p>
          </div>
        )}
      </div>
    </article>
  )
}
