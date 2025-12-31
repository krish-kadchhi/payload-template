import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const footerLogo = footerData?.logo

  return (
    <footer className="mt-auto bg-[#d7b7d4] text-primary-foreground">
      <div className="container flex flex-col items-center gap-8 py-10 md:flex-row md:justify-between">
        
        {/* ✅ Footer Logo from Payload */}
        <Link href="/" className="flex items-center gap-2">
          {footerLogo && (
            <Image
              src={footerLogo.url}
              alt={footerLogo.alt || 'Footer logo'}
              width={140}
              height={40}
              className="h-10 w-auto object-contain"
            />
          )}
        </Link>

        {/* ✅ Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-8 text-lg font-serif tracking-wide">
          {navItems.map((item, i) => {
            const { link, logo } = item

            return (
              <div key={i} className="flex items-center gap-2">
                {logo && (
                  <Image
                    src={logo.url}
                    alt={logo.alt || link.label}
                    width={18}
                    height={18}
                    className="h-5 w-5 object-contain"
                  />
                )}

                <CMSLink
                  {...link}
                  appearance="inline"
                  className="transition-opacity hover:opacity-80"
                />
              </div>
            )
          })}
        </nav>

        {/* ✅ Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            aria-label="Facebook"
            className="rounded-full bg-primary-foreground/10 p-3 transition-opacity hover:opacity-80"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="rounded-full bg-primary-foreground/10 p-3 transition-opacity hover:opacity-80"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="rounded-full bg-primary-foreground/10 p-3 transition-opacity hover:opacity-80"
          >
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
