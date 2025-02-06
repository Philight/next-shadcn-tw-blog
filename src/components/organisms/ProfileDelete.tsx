'use client'

import { INITIAL_STATE } from "@/utils/constants"
import { showToast } from "@/utils/functions"
import { deleteUser } from "@/utils/server/actions/user"
import { signOut } from "next-auth/react"
import {
  useActionState, useEffect,
  useState, 
} from "react"
import { Label } from "../shadcn/label"
import { Input } from "../shadcn/input"
import { Button } from "../shadcn/button"
import {
  AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle 
} from "../shadcn/alertdialog"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "../shadcn/card"
import { useTranslations } from "next-intl"

export const ProfileDelete = () => {
  const [state, formAction, pending] = useActionState(deleteUser, INITIAL_STATE)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const t = useTranslations();  

  useEffect(() => {
    if (state.message && state.message.trim().length !== 0) {
      showToast(state.status, state.message)
    }
  }, [state])

  return (
    <form className="flex items-end justify-between gap-4 w-full" action={formAction} onSubmit={()=>signOut({ callbackUrl: "/login" })}>
      <Card className="w-full border border-destructive bg-destructive/[0.05]">
        <CardHeader>
          <CardTitle>{t('profile.delete_profile_card_title')}</CardTitle>
          <CardDescription>{t('profile.delete_profile_card_description')}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div className="space-y-2 w-full">
            <Label htmlFor="password">{t('profile.delete_profile_confirm_password')}</Label>
            <div className="flex gap-1">
              <Input type="password" id="password" min={1} required placeholder={t('profile.delete_profile_confirm_password_placeholder')} />
              <Button type="button" onClick={() => setIsDialogOpen(true)} variant='destructive'>{t('buttons.confirm')}</Button>
            </div>
          </div>

          <AlertDialog open={isDialogOpen} onOpenChange={()=>setIsDialogOpen(false)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('profile.delete_profile_alert_title')}</AlertDialogTitle>
                <AlertDialogDescription>{t('profile.delete_profile_alert_description')}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel type="button">{t('buttons.cancel')}</AlertDialogCancel>
                <Button disabled={pending} type="submit">{t('buttons.confirm')}</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </form>
  )
}
