'use client';
import { useForm } from 'react-hook-form';
import { logInSchema } from '@/lib/zod/ValidationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/form';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { Separator } from '@/components/shadcn/separator';
import Link from 'next/link';
import { useTransition } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Heading from '@/components/atoms/Heading';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import Main from '@/layouts/Main';

const Login = () => {
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();
  const route = useRouter();

  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  function onSubmit(values: z.infer<typeof logInSchema>) {
    startTransition(async () => {
      try {
        const res = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (!res?.ok) {
          toast.error('Please enter valid credentials');

          return;
        }

        route.push('/profile');
      } catch (error) {
        toast.error('Could not log in');
      }
    });
  }

  return (
    <Main className="h-lvh flex justify-center items-center gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-xs w-full">
          <Heading tag="h4" size="text-2xl">
            {t('login.form_title')}
          </Heading>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. supermario@gmail.com" type="email" name="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="********" type="password" name="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-2 justify-between items-center w-full">
            <Button disabled={isPending || !form.formState.isValid} type="submit" variant="outline">
              {t('buttons.submit')}
            </Button>
            <Button disabled={isPending} type="reset" variant="default" onClick={() => form.reset()}>
              {t('buttons.reset')}
            </Button>
          </div>
        </form>
      </Form>
      <Separator className="max-w-xs w-full" decorative={true} />
      <div className="text-center space-y-2">
        <p>
          {t('login.form_redirect.question')}{' '}
          <Link href="/signup" className="underline hover:underline-offset-4 transition-all duration-300">
            {t('login.form_redirect.link')}
          </Link>
        </p>
      </div>
    </Main>
  );
};

export default Login;
