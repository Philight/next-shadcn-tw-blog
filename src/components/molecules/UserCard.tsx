import {
  Card, CardContent, CardHeader, CardTitle 
} from "../shadcn/card"
import {
  Avatar, AvatarFallback, AvatarImage 
} from "../shadcn/avatar"
import { CleanUserType } from "@/utils/api/usersApi"
import { v4 as uuidv4 } from 'uuid';
import { Badge } from "../shadcn/badge"
import Link from "next/link"
import { SquareArrowOutUpRight } from "lucide-react";
import {
  Tooltip, TooltipContent, TooltipTrigger 
} from "../shadcn/tooltip";
import { useTranslations } from "next-intl";
import { ICONS_SIZES } from "@/utils/constants";

export type UserCardPropsType = {
  user: CleanUserType
}

export const UserCard = (props: UserCardPropsType) => {
  const { user } = props
  const t = useTranslations('home');  
  const userHasSocials = user.socials && user.socials.length !== 0
      
  return (
    <Card>
      <div className="flex items-center gap-2 justify-between">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src={user.avatar} alt="user avatar" height={40} width={40}/>
            <AvatarFallback>{user.email.slice(0,1)}</AvatarFallback>
          </Avatar>
          <CardHeader>
            <CardTitle>{user.username}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </CardHeader>
        </div>
        <Tooltip>
          <TooltipTrigger aria-label="visit user profile">
            <Link href={`/${user.username}`}><SquareArrowOutUpRight size={ICONS_SIZES.sm}/></Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('user_visit_profile',{ username: user.username })}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <CardContent className="space-y-4">
        <div className="flex gap-2 items-center overflow-x-scroll w-full">
          {userHasSocials ? 
            user.socials.map((social) => (
              <Tooltip key={uuidv4()}>
                <TooltipTrigger>
                  <Badge><a href={social.url} target="_blank" rel="noopener noreferrer">{social.label}</a></Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{social.tag}</p>
                </TooltipContent>
              </Tooltip>          
            )) : <p className="text-sm text-muted-foreground">{t('user_no_socials')}</p> }
        </div>
      </CardContent>
    </Card>
  )
}
