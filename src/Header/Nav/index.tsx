'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
export const HeaderNav: React.FC<{ data: HeaderType; accentColor: string }> = ({ data, accentColor }) => {
  const navItems = data?.navItems || []

  return (
    <nav
      className="flex items-center gap-10 text-xl font-serif tracking-wide"
      style={{ color: accentColor }}
    >
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="inline"
            className="transition-opacity hover:opacity-70"
          />
        )
      })}
    </nav>
  )
}
