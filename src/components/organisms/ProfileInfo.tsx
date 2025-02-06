'use client'
import { useTranslations } from "next-intl"
import {
  useActionState, useEffect 
} from "react"
import { updateUserData } from "@/utils/server/actions/user"
import { INITIAL_STATE } from "@/utils/constants"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateUserDataSchema } from "@/lib/zod/ValidationSchemas"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage 
} from "../shadcn/form"
import { Input } from "../shadcn/input"
import { Button } from "../shadcn/button"
import { Textarea } from "../shadcn/textarea"
import {
  Avatar, AvatarFallback, AvatarImage 
} from "../../_components/shadcn/avatar";
import { CleanUserType } from "@/utils/api/usersApi"
import { showToast } from "@/utils/functions"

export type ProfileInfoPropsType = {
  user: CleanUserType
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {
  const { user } = props  
  const t = useTranslations();  
  const [state, formAction, pending] = useActionState(updateUserData, INITIAL_STATE)
  const form = useForm<z.infer<typeof updateUserDataSchema>>({
    resolver: zodResolver(updateUserDataSchema),
    defaultValues: { 
      email: user.email,
      avatar: user.avatar || '',
      bio: user.bio || '',
      username: user.username,
    },
    mode: 'onChange',
  })
  
  useEffect(() => {
    if (state.message && state.message.trim().length !== 0) {
      showToast(state.status, state.message)
    }
    form.reset({
      email: user.email,
      avatar: user.avatar || '',
      bio: user.bio || '',
      username: user.username,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])  

  return (
    <section className="space-y-4">
      <div className="flex justify-center">
        <Avatar className="w-48 h-48">
          <AvatarImage src={user.avatar} alt="user avatar" height={200} width={200}/>
          <AvatarFallback>{user.username.slice(0,2)}</AvatarFallback>
        </Avatar>
      </div>
      <Form {...form}>
        <form action={formAction} className="grid sm:grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    name='email'
                    placeholder='e.g. supermario@gmail.com'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field} 
                    type="text"
                    name='username'
                    placeholder='e.g. super_mario_45'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='avatar'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    name='avatar'
                    placeholder="https://yourprofileimage.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='bio'
            render={({ field }) => (
              <FormItem className="sm:col-span-3">
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={5}
                    name='bio'
                    placeholder="Hey everyone! I am ..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="sm:col-span-3 flex justify-end gap-2 w-full">
            <Button type="submit" disabled={pending || !form.formState.isValid || !form.formState.isDirty} variant='outline'>{t("buttons.submit")}</Button>
            <Button type="reset" disabled={pending} variant='default' onClick={()=>form.reset()}>{t("buttons.reset")}</Button>            
          </div>
        </form>
      </Form>
    </section>
  )
}
