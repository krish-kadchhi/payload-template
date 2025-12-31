'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header as HeaderType, Media } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { ShoppingCart } from 'lucide-react'

type HeaderData = HeaderType & {
  accentColor?: string | null
  brand?: {
    logo?: Media | string | null
    logoAlt?: string | null
    title?: string | null
    subtitle?: string | null
  } | null
  showCart?: boolean | null
  cartLink?: string | null
}

interface HeaderClientProps {
  data: HeaderData
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const accentColor = data?.accentColor || '#c9a1bd'
  const brandTitle = data?.brand?.title
  const brandSubtitle = data?.brand?.subtitle
  const logoMedia = data?.brand?.logo
  const logoUrl =
    logoMedia && typeof logoMedia === 'object' && 'url' in logoMedia && logoMedia.url
      ? (logoMedia.url as string)
      : null
  const logoAlt = data?.brand?.logoAlt || brandTitle || 'Site logo'
  const showCart = data?.showCart !== false
  const cartLink = data?.cartLink || '/cart'

  return (
    <header
      className="relative z-20 w-full border-y-4 bg-white"
      style={{ borderColor: accentColor }}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container overflow-hidden mx-auto flex items-center justify-between gap-8 py-5">
        <Link href="/" className="flex flex-shrink-0 flex-col items-center gap-2 text-center">
          {logoUrl ? (
            <img src={logoUrl} alt={logoAlt || ''} className="h-16 w-auto" />
          ) : (
            <Logo loading="eager" priority="high" className="invert dark:invert-0 h-16 w-auto" />
          )}
          {brandTitle ? (
            <span
              className="font-serif text-3xl uppercase tracking-[0.08em]"
              style={{ color: accentColor }}
            >
              {brandTitle}
            </span>
          ) : null}
          {brandSubtitle ? (
            <span
              className="text-xs uppercase tracking-[0.35em]"
              style={{ color: accentColor }}
            >
              {brandSubtitle}
            </span>
          ) : null}
        </Link>

        <div className="flex flex-1 justify-end">
          <HeaderNav data={data} accentColor={accentColor} />
        </div>

        <div className="flex flex-shrink-0 items-center gap-4">
          {showCart ? (
            <Link
              href={cartLink}
              className="rounded-full p-3 transition-opacity hover:opacity-80"
              style={{ color: accentColor }}
            >
              <span className="sr-only">Cart</span>
              <ShoppingCart className="h-6 w-6" />
            </Link>
          ) : (
            <div className="h-12 w-12" />
          )}
        </div>
      </div>
    </header>
  )
} 
