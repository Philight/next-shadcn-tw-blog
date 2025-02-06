import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: 'Signup',
  description: 'Signup page'
}
 
export default async function SignupLayout ({ children }:{children: ReactNode}) {
  return (
    <>{children}</>
  )
}
