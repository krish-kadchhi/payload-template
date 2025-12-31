import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    // ✅ Main Footer Logo (managed from Payload)
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },

    // ✅ Navigation items (icon optional per link)
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        link({
          appearances: false,
        }),
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
