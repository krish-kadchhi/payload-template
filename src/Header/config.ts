import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'accentColor',
      type: 'text',
      label: 'Accent color',
      defaultValue: '#c9a1bd',
      admin: {
        description: 'Hex color used for borders, links, and icons',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return 'Please provide an accent color'
        return /^#([0-9a-f]{3}){1,2}$/i.test(value) || 'Use a hex value like #c9a1bd'
      },
    },
    {
      name: 'brand',
      type: 'group',
      label: 'Branding',
      admin: {
        description: 'Logo and text shown on the left side of the header',
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        // {
        //   name: 'logoAlt',
        //   type: 'text',
        //   label: 'Logo alt text',
        //   required: false
        // },
        // {
        //   name: 'title',
        //   type: 'text',
        //   defaultValue: 'MARIELA',
        //   label: 'Brand title',
        //   required: false
        // },
        // {
        //   name: 'subtitle',
        //   type: 'text',
        //   label: 'Tagline',
        //   defaultValue: 'CUSHIONS',
        //   required: false
        // },
      ],
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'showCart',
      type: 'checkbox',
      label: 'Show cart icon',
      defaultValue: true,
    },
    {
      name: 'cartLink',
      type: 'text',
      label: 'Cart link',
      defaultValue: '/cart',
      admin: {
        condition: (_, siblingData) => siblingData?.showCart !== false,
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
