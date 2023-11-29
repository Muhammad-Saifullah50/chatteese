'use client'

import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "./Input"

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {

  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') { setVariant('REGISTER') }
    else {
      setVariant('LOGIN')
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: { errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    if (variant === 'REGISTER') {
      // axios register
    }
    if (variant === 'REGISTER') {
      // nextauth signin
    }

    const socialAction = (action: string) => {
      setIsLoading(true)

      //nextauth social signin
    }
  }
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input 
          id='email'
          label="Email"
          register={register}
          errors={errors}
          />
        </form>
      </div>
    </div>
  )
}

export default AuthForm
