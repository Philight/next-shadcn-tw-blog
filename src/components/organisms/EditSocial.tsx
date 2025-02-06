import { SocialsInterface } from "@/app/api/auth/[...nextauth]/next-auth";
import { Trash } from "lucide-react"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger 
} from "../shadcn/alertdialog"
import { Label } from "../shadcn/label"
import { Input } from "../shadcn/input"
import { deleteSocial } from "@/utils/server/actions/user";
import { useTranslations } from "next-intl";
import { ICONS_SIZES } from "@/utils/constants";
import { ChangeEvent } from "react";

export type SocialPropsType = {
  social: SocialsInterface
  // eslint-disable-next-line no-unused-vars
  setIsDirty: (isDirty: boolean) => void
}

const EditSocial = (props: SocialPropsType) => {
  const { social, setIsDirty } = props
  const t = useTranslations();

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    defaultValue: string,
  ) => {
    const target = e.target as HTMLInputElement;
  
    setIsDirty(target.value !== defaultValue ? true : false)
  };

  return (
    <div key={social.label} className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor={`url_${social.label}`}>{social.label}</Label>
        <AlertDialog>
          <AlertDialogTrigger><Trash className="text-destructive" size={ICONS_SIZES.sm}/></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('profile.delete_social_title')}</AlertDialogTitle>
              <AlertDialogDescription>{t('profile.delete_social_description')}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('buttons.cancel')}</AlertDialogCancel>
              <AlertDialogAction type='button' onClick={() => deleteSocial(social.label)}>{t('buttons.continue')}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Input 
        type="text" 
        placeholder="e.g. your_twitter_username" 
        min={1} 
        required 
        defaultValue={social.tag} 
        name={`tag_${social.label}`}
        onChange={(e) => handleOnChange(e, social.tag)}
      />
      <Input 
        type="url"
        placeholder="e.g. https://twitter.com" 
        min={1}
        required 
        defaultValue={social.url}
        name={`url_${social.label}`}
        onChange={(e) => handleOnChange(e, social.url)}
      />
    </div>
  )
}

export default EditSocial