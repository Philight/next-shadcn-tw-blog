import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login page'
}
 
export default async function LoginLayout ({ children }:{children: ReactNode}) {
  return (
    <>{children}</>
  )
}
