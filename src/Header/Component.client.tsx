'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header as HeaderType, Media } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Menu, ShoppingCart, X } from 'lucide-react'

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    setIsMenuOpen(false)
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
      className="relative z-50 w-full h-[120px] border-y-2 bg-white flex items-center"
      style={{ borderColor: accentColor }}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container mx-auto px-4 md:px-16 h-full flex items-center justify-between gap-4 md:gap-8">
        <Link href="/" className="flex flex-shrink-0 flex-col items-center text-center h-full justify-center">
          {logoUrl ? (
            <img src={logoUrl} alt={logoAlt || ''} className="h-10 w-auto md:h-16 object-contain" />
          ) : (
            <Logo loading="eager" priority="high" className="h-10 w-auto md:h-16" />
          )}
          {brandTitle ? (
            <span
              className="font-serif text-lg md:text-2xl uppercase tracking-[0.2em] mt-1 leading-none"
              style={{ color: accentColor }}
            >
              {brandTitle}
            </span>
          ) : null}
          {brandSubtitle ? (
            <span
              className="font-serif text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-light leading-none mt-1"
              style={{ color: accentColor }}
            >
              {brandSubtitle}
            </span>
          ) : null}
        </Link>

        <div className="flex flex-1 h-full items-center justify-end gap-3 md:gap-10">
          <div className="hidden md:block h-full">
            <HeaderNav data={data} accentColor={accentColor} />
          </div>

          <div className="flex items-center gap-2 md:gap-4 h-full">
            {showCart ? (
              <Link
                href={cartLink}
                className="flex items-center justify-center p-2 transition-opacity hover:opacity-80"
                style={{ color: accentColor }}
              >
                <span className="sr-only">Cart</span>
                <ShoppingCart className="h-6 w-6" />
              </Link>
            ) : (
              <div className="h-10 w-10" />
            )}

            <button
              className="block md:hidden p-1.5 transition-opacity hover:opacity-80"
              style={{ color: accentColor }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 top-0 z-10 bg-black/20 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      <div
        className={`absolute left-0 top-full z-20 w-full border-t bg-white shadow-xl transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 pointer-events-none opacity-0'
        }`}
        style={{ borderTopColor: accentColor + '40' }}
      >
        <div className="container mx-auto py-8">
          <HeaderNav data={data} accentColor={accentColor} mobile />
        </div>
      </div>
    </header>
  )
} 
