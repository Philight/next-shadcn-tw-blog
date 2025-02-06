'use client';

import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

import { newPostSchema } from '@/lib/zod/ValidationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/shadcn/button';
import FormProvider, { Field, useForm } from '@/components/molecules/hook-form';
import { useFormErrors } from '@/hooks/use-form-errors';

import Container from '@/layouts/Container';

import { createPost } from '@/utils/api/posts';
import type { PostType } from '@/utils/api/types';
import { cn } from '@/utils/functions';
import { showToast } from '@/utils/helpers';
import { IS_DEVELOPMENT } from '@/utils/constants';

import type { IGenericProps } from '@/types/generic-types';

// ============================================================================

export interface CreatePostProps extends IGenericProps {}

export default function CreatePost({ className }: CreatePostProps) {
  const t = useTranslations('posts_create');
  const [isPending, startTransition] = useTransition();

  const methods = useForm<z.infer<typeof newPostSchema>>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      title: '',
      content: '',
      author: '',
    },
    // mode: 'onChange',
  });

  const {
    // reset,
    formState,
    handleSubmit,
    setError,
    clearErrors,
  } = methods;

  const onSubmit = handleSubmit(async (data: any, event?: React.BaseSyntheticEvent) => {
    startTransition(async () => {
      try {
        event?.preventDefault();
        clearErrors();

        if (IS_DEVELOPMENT) showToast({ type: 'OBJECT', message: data });

        // TRANSFORM FIELDS & SEND REQUEST

        const { title, content, author } = data;

        const response = await createPost({
          title,
          content,
          author,
        });

        // RESPONSE OK
        if (response.message && response.message.trim().length !== 0) {
          if (response.status === 'Error') {
            showToast({ type: 'ERROR', message: response.message });
          } else {
            showToast({ type: 'SUCCESS', message: t('success') });
          }
        }

        // RESPONSE ERROR
      } catch (error) {
        if (error.message && error.message.trim().length !== 0) {
          showToast({ status: error.status, message: error.message, options: { duration: 10000 } });
        }
      }
    });
  });

  return (
    <Container className={cn('create-post__c', className)}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className={cn('grid grid-cols-1')}>
          <Field field="input" name="title" type="text" label={t('title')} />
          <Field field="textarea" name="content" label={t('content')} rows={10} />
          <Field field="input" name="author" type="text" label={t('author')} />

          <div className={cn('button__wrapper')}>
            <Button type="submit" disabled={isPending || !formState.isDirty} variant="default">
              {isPending && <Loader2 className="animate-spin" />}
              {t('send')}
            </Button>
          </div>
        </div>
      </FormProvider>
    </Container>
  );
}
