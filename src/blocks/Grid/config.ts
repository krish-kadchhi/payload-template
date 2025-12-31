import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const Grid: Block = {
  slug: 'grid',
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'feature',
      options: [
        {
          label: 'Feature (Alternating)',
          value: 'feature',
        },
        {
          label: 'Grid (3 Columns)',
          value: 'grid',
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'subtitle',
          type: 'text', 
          label: 'Subtitle (e.g. PRODUCTS)',
        },
        {
          name: 'price',
          type: 'text',
          label: 'Price (e.g. $ 19.99 USD)',
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
          label: 'Content',
        },
        link({
            appearances: false,
            required:false
        }),
      ],
    },
  ],
  interfaceName: 'GridBlock',
}
