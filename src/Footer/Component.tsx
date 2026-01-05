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
    <footer className="mt-auto bg-[#c9adc6] text-primary-foreground">
      <div className="container px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8 py-10">
        
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full md:w-auto">
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
          <nav className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-lg font-serif tracking-wide">
            {navItems.map((item, i) => {
              const { link } = item

              return (
                <div key={i} className="flex items-center gap-2">
                  <CMSLink
                    {...link}
                    appearance="inline"
                    className="transition-opacity hover:opacity-80"
                  />
                </div>
              )
            })}
          </nav>
        </div>

        {/* ✅ Social Icons */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
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
