'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
  enableSideContent?: boolean
  sideContent?: DefaultTypedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    enableSideContent,
    sideContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  if (enableSideContent) {
    return (
      <div className="w-full py-16" style={{ backgroundColor: '#d7b7d4' }}>
        <div className="container lg:max-w-[70rem]">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="text-white prose-headings:text-white prose-p:text-white prose-a:text-white">
              {sideContent && <RichText data={sideContent} enableGutter={false} />}
            </div>
            <div
              style={
                {
                  '--border': '0 0% 100%',
                  '--input': 'transparent',
                  '--ring': '255 255 255',
                  '--foreground': '0 0% 100%',
                  '--muted-foreground': '0 0% 90%',
                  '--background': 'transparent',
                } as React.CSSProperties
              }
            >
              <FormProvider {...formMethods}>
                {!isLoading && hasSubmitted && confirmationType === 'message' && (
                  <RichText data={confirmationMessage} />
                )}
                {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
                {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
                {!hasSubmitted && (
                  <form id={formID} onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 last:mb-0">
                      {formFromProps &&
                        formFromProps.fields &&
                        formFromProps.fields?.map((field, index) => {
                          const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                          if (Field) {
                            return (
                              <div className="mb-6 last:mb-0" key={index}>
                                <Field
                                  form={formFromProps}
                                  {...field}
                                  {...formMethods}
                                  control={control}
                                  errors={errors}
                                  register={register}
                                />
                              </div>
                            )
                          }
                          return null
                        })}
                    </div>

                    <Button form={formID} type="submit" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                      {submitButtonLabel}
                    </Button>
                  </form>
                )}
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="p-4 lg:p-6 border border-border rounded-[0.8rem]">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>

              <Button form={formID} type="submit" variant="default">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
