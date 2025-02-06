import { UserCard } from "../molecules/UserCard"
import { CleanUserType } from "@/utils/api/usersApi"
import { v4 as uuidv4 } from 'uuid';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "../shadcn/card"
import { useTranslations } from "next-intl";

export type UsersListPropsType = {
  users: [] | CleanUserType[]
}

export const UsersList = (props: UsersListPropsType) => {
  const { users } = props
  const t = useTranslations();  

  if (!users || users.length === 0) {
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('no_users_card.title')}</CardTitle>
            <CardDescription>{t('no_users_card.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t('no_users_card.content')}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {users.map((user) => (
        <UserCard user={user} key={uuidv4()}/>
      ))}
    </div>
  )
}
