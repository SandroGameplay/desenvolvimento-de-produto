import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import imgNotUser from '@/assets/user-unauthentic.png'
import Image from 'next/image'
import Link from 'next/link'


export default async function Page() {
  const session = await getServerSession(authOptions)
  
  if(!session?.user) {
    return (
      <div className="container">
       <div className="flex flex-col items-center justify-center">
       <Image src={imgNotUser} width={350} alt='imagem login usuário.' />
        <h1 className="text-center font-bold">
          Apenas usuário logado {' '}
          <Link href={'/sign-in'}>
            <span className="text-indigo-500 hover:underline cursor-pointer">Entrar</span>
          </Link>
        </h1>
       </div>
      </div>
    )
  }
  return (
    <div className="contaienr">
      <h1 className="text-center">Bem a página Admin {session?.user.username}</h1>
    </div>
  )
}
