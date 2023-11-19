'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  email: z.string().min(1, 'E-mail obrigatório.').email('E-mail inválido.'),
  password: z
    .string()
    .min(1, 'Senha é obrigatório!')
    .min(8, 'No mínino 8 caracteres.'),
});

const SignInForm =  () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
   const sigInData = await signIn('credentials', {
    email: values.email,
    password: values.password,
    redirect: false,
   })
   if (sigInData?.error) {
    console.log(sigInData.error)
   } else {
    router.refresh()
    router.push('/admin')
   }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder='joao@exemplo.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='******'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6' type='submit'>
          Entrar
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        ou
      </div>
     
      <p className='text-center text-sm text-gray-600 mt-2'>
        Não tem cadastro? Por favor&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-up'>
          Registrar
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
