import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import cn from 'classnames'

import { Button, Input } from '@ui'

/**
 * Template component for both Suggest Idea & Report Bug modals
 */

type UIWhenSubmittedProps = {
  backToModal: () => void
  imgSrc: string
  title: string
  btnText: string
}

export const UIWhenSubmitted = ({
  backToModal,
  imgSrc,
  title,
  btnText,
}: UIWhenSubmittedProps) => (
  <div className='flex-center flex-col gap-4'>
    <img src={imgSrc} className='h-[68px] w-[68px] object-contain' />
    <h3>{title}</h3>
    <Button
      ghost
      text={btnText}
      onClick={backToModal}
      className='clr-blue body-3'
    />
  </div>
)

type FooterModalProps = {
  title: React.ReactNode
  text?: React.ReactNode
  endpoint: string
  submittedUIProps: Omit<UIWhenSubmittedProps, 'backToModal'>
  onClose?: () => null
}

export const FooterModal: React.FC<FooterModalProps> = ({
  title,
  text,
  endpoint,
  onClose,
  submittedUIProps,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    // Get csrf token
    const csrfToken = await fetch('/api/v1/authenticity_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const tokenJson = await csrfToken.json()
    const token = tokenJson?.data?.attributes?.base64

    // Send data to endpoint
    await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
      },
    })

    // Change UI to success modal
    setIsSubmitted(true)
  }

  return (
    <>
      <header className='flex items-center py-5 px-8 clr-black text-[30px] font-bold leading-[1.6] tracking-[0.5px] m-0 bg-[#f5f5f5]'>
        {!isSubmitted && title}
        <Button
          aria-label='Close modal button'
          onClick={onClose}
          className='ml-auto after:content-["\00d7"] cursor-pointer px-0'
        />
      </header>
      {isSubmitted ? (
        <div className='bg-[#f5f5f5] flex-center pb-6'>
          <UIWhenSubmitted
            backToModal={() => {
              reset()
              setIsSubmitted(false)
            }}
            {...submittedUIProps}
          />
        </div>
      ) : (
        <div className='bg-base px-8 py-6'>
          <span className='flex flex-col gap-3 body-4'>
            <p>Please help us to improve our service</p>
            {text}
          </span>
          <form
            className='flex flex-col mt-2'
            onSubmit={handleSubmit(onSubmit)}
          >
            <>
              {(function renderFields() {
                // Field name to placeholder
                const fieldMap = {
                  title: 'Title',
                  text: 'Message',
                  email: 'Email',
                  name: 'Your name (optional)',
                }
                return Object.keys(fieldMap).map((fieldName, i) => {
                  const props = {
                    key: fieldName,
                    // First field is textarea, second is email, rest are text
                    type: i === 1 ? null : i === 2 ? 'email' : 'text',
                    placeholder: fieldMap[fieldName as keyof typeof fieldMap],
                    className: cn('modal-input mt-4', {
                      error: errors[fieldName],
                    }),
                    ...register(fieldName, {
                      required: i !== 3 && 'This field is required',
                    }),
                  }

                  return (
                    <>
                      {i === 1 ? <textarea {...props} /> : <Input {...props} />}
                      <ErrorMessage
                        errors={errors}
                        name={fieldName}
                        render={({ message }) => (
                          <p className='clr-red body-4'>{message}</p>
                        )}
                      />
                    </>
                  )
                })
              })()}
            </>
            <Button text='Send' type='submit' primary className='w-1/2 mt-4' />
          </form>
        </div>
      )}
    </>
  )
}

export default FooterModal
