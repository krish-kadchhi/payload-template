import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'
import { CMSLink } from '@/components/Link'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs, link } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <div className="px-4 mx-0 md:my-14 md:mx-10 md:px-8 text-black lg:my-16 lg:mx-20 lg:px-12 xl:my-16 xl:mx-24" id={`block-${id}`}>
      {introContent && (
        <div className="mx-auto max-w-[48rem]">
          <RichText className="mx-auto ms-0 max-w-[48rem] text-center text-black [&_h3]:text-[#D1BACE] [&_h3]:font-serif" data={introContent} enableGutter={false} />
        </div>
      )}
      {link && (
        <div className="flex justify-center mt-5 mb-5">
          <CMSLink {...link} appearance="outline" className="rounded-full uppercase px-8 border-slate-300 text-black  hover:border-slate-400 font-medium tracking-wide" />
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  )
}
