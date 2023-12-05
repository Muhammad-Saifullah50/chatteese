'use client'

import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "./Input"
import Button from "./Button"
import AuthSocialButton from "./AuthSocialButton"
import { BsGithub, BsGoogle } from 'react-icons/bs'
import axios from "axios"
import { toast } from "react-hot-toast"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { TailSpin } from "react-loader-spinner"

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();

  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false)


  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    }
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


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    setIsLoading(true)

    if (variant === 'REGISTER') {
      try {
        await axios.post('/api/register', data);
        toast.success('Registration successful!');
        router.push('/users')
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }


    if (variant === 'LOGIN') {
      try {
        const result = await signIn('credentials', {
          ...data,
          redirect: false,
        });

        if (result?.error) {
          toast.error('Invalid credentials');
        }

        if (result?.ok && !result?.error) {
          toast.success('Logged in successfully');
          router.push('/users')

        }
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }



  }
  const socialAction = async (action: string) => {
    try {
      setIsLoading(true)

      const result = await signIn(action, {
        redirect: false,
        callbackUrl: '/users'
      })

      if (result?.error) {
        toast.error('Invalid credentials');
      }

      if (result?.ok && !result?.error) {
        toast.success('Logged in successfully');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }


  }
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

          {variant === 'REGISTER' && (
            <Input
              id='name'
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id='email'
            label="Email Address"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}

          />
          <Input
            id='password'
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}

          />

          <div>
            <Button
              disabled={isLoading}
              fullWidth
              type="submit"
              
            >
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
              {isLoading && (<TailSpin
                height="18"
                width="18"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}

              />)}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />


            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-900">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>
        </div>

        <div className="flex justify-center gap-2 text-sm mt-6 px-2 text-gray-500">
          {variant === 'LOGIN' ? 'New to Chatteese' : 'Already have an account?'}

          <div className="underline cursor-pointer" onClick={toggleVariant}>
            {variant === 'LOGIN' ? 'Create an account' : 'Log in'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
