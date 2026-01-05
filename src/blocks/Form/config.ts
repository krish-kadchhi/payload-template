import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'default',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Newsletter',
          value: 'newsletter',
        },
      ],
      label: 'Variant',
    },
    {
      name: 'newsletterTitle',
      type: 'text',
      admin: {
        condition: (_, { variant }) => variant === 'newsletter',
      },
      defaultValue: 'Newsletter',
      label: 'Newsletter Title',
    },
    {
      name: 'newsletterSubtitle',
      type: 'text',
      admin: {
        condition: (_, { variant }) => variant === 'newsletter',
      },
      defaultValue: 'Get promotions & updates!',
      label: 'Newsletter Subtitle',
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'enableSideContent',
      type: 'checkbox',
      label: 'Enable Side Content',
    },
    {
      name: 'sideContent',
      type: 'richText',
      admin: {
        condition: (_, { enableSideContent }) => Boolean(enableSideContent),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Side Content',
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
}
