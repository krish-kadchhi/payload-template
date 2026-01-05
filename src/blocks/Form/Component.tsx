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
  variant?: 'default' | 'newsletter'
  newsletterTitle?: string
  newsletterSubtitle?: string
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
    variant = 'default',
    newsletterTitle,
    newsletterSubtitle,
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

  if (variant === 'newsletter') {
    return (
      <div className="w-full py-20 bg-white">
        <div className="container max-w-[60rem] flex flex-col items-center text-center">
          <div className="mb-8">
            <h5 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3 text-[#BFA2BD]">
              {newsletterTitle || 'Newsletters'}
            </h5>
            <h3 className="text-3xl md:text-4xl font-serif text-foreground">
              {newsletterSubtitle || 'Get promotions & updates!'}
            </h3>
          </div>

          <div className="w-full max-w-3xl">
            <FormProvider {...formMethods}>
              {!isLoading && hasSubmitted && confirmationType === 'message' && (
                <RichText data={confirmationMessage} />
              )}
              {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
              {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
              {!hasSubmitted && (
                <form
                  id={formID}
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col md:flex-row gap-0 items-start w-full [&_label]:hidden [&_input]:rounded-none [&_input]:border-[#d7b7d4] [&_input]:h-[50px] [&_input]:bg-white [&_.mb-6]:mb-0 [&_.w-full]:mb-0"
                >
                  {formFromProps &&
                    formFromProps.fields &&
                    formFromProps.fields?.map((field, index) => {
                      const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                      if (Field) {
                        return (
                          <div className="w-full flex-1" key={index}>
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

                  <Button
                    form={formID}
                    type="submit"
                    className="w-full md:w-auto px-10 bg-[#BFA2BD] hover:bg-[#a689a4] text-white border-none rounded-none h-[50px] font-bold tracking-widest uppercase transition-colors"
                  >
                    {submitButtonLabel || 'Subscribe'}
                  </Button>
                </form>
              )}
            </FormProvider>
          </div>
        </div>
      </div>
    )
  }

  if (enableSideContent) {
    return (
      <div className="w-full py-16" style={{ backgroundColor: '#d7b7d4' }}>
        <div className="container lg:max-w-[70rem]">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="md:flex flex-center text-white prose-headings:text-white prose-p:text-white prose-a:text-white">
              {sideContent && <RichText data={sideContent} enableGutter={false} />}
            </div>
            <div
              className="flex flex-col"
              style={
                {
                  '--border': '0 0% 100%',
                  '--input': 'rgba(255, 255, 255, 0.1)',
                  '--ring': '255 255 255',
                  '--foreground': '0 0% 100%',
                  '--muted-foreground': '0 0% 90%',
                  '--background': 'transparent',
                } as React.CSSProperties
              }
            >
              {enableIntro && introContent && (
                <div className="mb-6 text-white prose-headings:text-white prose-p:text-white prose-a:text-white">
                  <RichText data={introContent} enableGutter={false} />
                </div>
              )}
              <FormProvider {...formMethods}>
                {!isLoading && hasSubmitted && confirmationType === 'message' && (
                  <RichText data={confirmationMessage} />
                )}
                {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
                {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
                {!hasSubmitted && (
                  <form id={formID} onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div className="grid grid-cols-2 gap-4 [&_label]:hidden [&_input]:bg-white/10 [&_input]:border-white [&_input]:text-white [&_input::placeholder]:lowercase [&_input::placeholder]:text-white/60 [&_input]:rounded-none [&_input]:h-14 [&_textarea]:bg-white/10 [&_textarea]:border-white [&_textarea]:text-white [&_textarea::placeholder]:lowercase [&_textarea::placeholder]:text-white/60 [&_textarea]:rounded-none">
                      {formFromProps &&
                        formFromProps.fields &&
                        formFromProps.fields?.map((field, index) => {
                          const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                          if (Field) {
                            const isFullWidth =
                              field.blockType === 'textarea' || field.blockType === 'message'
                            return (
                              <div
                                className={`${isFullWidth ? 'col-span-2' : ''}`}
                                key={index}
                              >
                                <Field
                                  form={formFromProps}
                                  {...field}
                                  {...formMethods}
                                  control={control}
                                  errors={errors}
                                  register={register}
                                  width={100}
                                />
                              </div>
                            )
                          }
                          return null
                        })}
                    </div>

                    <Button
                      form={formID}
                      type="submit"
                      variant="outline"
                      className="mt-4 border-white text-white bg-white/10 hover:bg-white hover:text-[#d7b7d4] rounded-none px-10 h-14 uppercase tracking-widest font-bold transition-all"
                    >
                      {submitButtonLabel || "Let's talk"}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      const isFullWidth =
                        field.blockType === 'textarea' || field.blockType === 'message'
                      return (
                        <div
                          className={`${isFullWidth ? 'md:col-span-2' : ''}`}
                          key={index}
                        >
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
