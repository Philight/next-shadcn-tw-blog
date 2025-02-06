'use client'

import { SocialsInterface } from "@/app/api/auth/[...nextauth]/next-auth"
import Heading from "../atoms/Heading"
import { Button } from "../shadcn/button"
import { updateUserSocials } from "@/utils/server/actions/user"
import { useTranslations } from "next-intl"
import {
  Fragment,
  useActionState, useEffect,
  useState, 
} from "react"
import { INITIAL_STATE } from "@/utils/constants"
import { AddSocial } from "./AddSocial"
import { showToast } from "@/utils/functions"
import EditSocial from "./EditSocial"

export type ProfileSocialsPropsType = {
  socials: SocialsInterface[]
}

export const ProfileSocials = (props: ProfileSocialsPropsType) => {
  const { socials } = props
  const userHasSocials = !socials || socials.length === 0
  const t = useTranslations();
  const [state, formAction, pending] = useActionState(updateUserSocials, INITIAL_STATE)
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {    
    if (state.message && state.message.trim().length !== 0) {
      showToast(state.status, state.message)
    }
  }, [state])

  return (
    <Fragment>
      <div className="space-y-4">
        <div className="flex justify-between items-center gap-4">
          <Heading tag="h3" size="text-3xl">{t("profile.edit_socials_title")}</Heading>
          <AddSocial />
        </div>
        {!userHasSocials ?
          <form className="grid sm:grid-cols-2 md:grid-cols-4 gap-4" action={formAction} onSubmit={() => setIsDirty(false)}>
            {socials.map((social) => (
              <EditSocial 
                social={social} 
                setIsDirty={setIsDirty} 
                key={social._id}/>
            ))}
            <div className="sm:col-span-2 md:col-span-4 flex justify-end gap-2 w-full">
              <Button type="submit" variant='outline' disabled={pending || !isDirty}>{t("buttons.submit")}</Button>
              <Button type="reset" variant='default' disabled={pending} onClick={() => setIsDirty(false)}>{t("buttons.reset")}</Button>      
            </div>
          </form>
          : <p className="sm:col-span-2 md:col-span-4 text-sm text-muted-foreground">{t('profile.user_no_socials')}</p>}
      </div>
    </Fragment>
  )
}