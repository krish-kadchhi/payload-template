'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export const HeaderNav = ({
  data,
  accentColor,
  mobile,
}: {
  data: HeaderType
  accentColor: string
  mobile?: boolean
}) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()

  return (
    <nav
      className={`flex font-serif tracking-wide h-full ${
        mobile ? 'flex-col items-center gap-6 text-xl' : 'items-center gap-10 text-base md:text-xl'
      }`}
      style={{ color: accentColor }}
    >
      {navItems.map(({ link }, i) => {
        const href = link.type === 'reference' 
          ? (typeof link.reference?.value === 'object' ? `/${link.reference.value.slug}` : '')
          : link.url
        
        const normalizedHref = href === '/home' || href === '' ? '/' : href
        const normalizedPathname = pathname === '' ? '/' : pathname
        const isActive = normalizedPathname === normalizedHref

        return (
          <div key={i} className="relative h-full flex items-center">
            <CMSLink
              {...link}
              appearance="inline"
              className="transition-opacity hover:opacity-70 whitespace-nowrap"
            />
            {isActive && !mobile && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-[10px]" 
                style={{ backgroundColor: accentColor + '40' }} 
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}
