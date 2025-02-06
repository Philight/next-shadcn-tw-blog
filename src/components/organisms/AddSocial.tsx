import { Plus } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../shadcn/alertdialog';
import { Input } from '../shadcn/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { socialSchema } from '@/lib/zod/ValidationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState, useEffect } from 'react';
import { createSocial } from '@/utils/server/actions/user';
import { ICONS_SIZES, INITIAL_STATE } from '@/utils/constants';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../shadcn/form';
import { useTranslations } from 'next-intl';
import { showToast } from '@/utils/functions';

export const AddSocial = () => {
  const t = useTranslations();
  const [state, formAction, pending] = useActionState(createSocial, INITIAL_STATE);
  const form = useForm<z.infer<typeof socialSchema>>({
    resolver: zodResolver(socialSchema),
    defaultValues: {
      label: '',
      tag: '',
      url: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (state.message && state.message.trim().length !== 0) {
      showToast(state.status, state.message);
    }
  }, [state]);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9">
          <Plus size={ICONS_SIZES.sm} />
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('profile.add_social_title')}</AlertDialogTitle>
          <AlertDialogDescription>{t('profile.add_social_description')}</AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form action={formAction} className="space-y-4">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. Twitter" type="text" name="label" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. your_twitter_username" type="text" name="tag" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. https://twitter.com" type="url" name="url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2 justify-between items-center w-full">
              <AlertDialogAction type="submit" disabled={pending || !form.formState.isValid}>
                {t('buttons.submit')}
              </AlertDialogAction>
              <AlertDialogCancel type="reset" onClick={() => form.reset()}>
                {t('buttons.cancel')}
              </AlertDialogCancel>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
