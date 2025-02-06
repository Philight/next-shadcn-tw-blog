import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Profile page'
}
 
export default async function ProfileLayout ({ children }:{children: ReactNode}) {
  return (
    <>{children}</>
  )
}
