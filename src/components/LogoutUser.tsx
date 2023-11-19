'use client'

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"

export default function LogoutUser() {
  return (
    <div className="flex items-center">
      <Button 
        onClick={() => 
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/`
          })} 
        variant={'destructive'}
      >
        Sair
      </Button>
    </div>
  )
}
