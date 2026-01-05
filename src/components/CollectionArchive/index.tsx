import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn(' ')}>
      <div>
        <div className="max-w-[1200px] mx-auto grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-7 xl:gap-x-7 items-start 2xl:gap-x-7">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <Card doc={result} relationTo="posts" showCategories />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
