import Link from 'next/link';
import { buttonVariants } from './ui/button';
import ImgLogo from '@/assets/logo-header.png'
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import LogoutUser from './LogoutUser';

const Navbar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className=' bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
      <div className='container flex items-center justify-between'>
       <Image src={ImgLogo} width={60} alt='' />
        <div className="flex items-center ml-auto gap-3">
        <Link href={'/'} className='hover:text-indigo-500 duration-300'>
          Home
        </Link>
        <Link href={'/admin'} className='hover:text-indigo-500 duration-300'>
          Admin
        </Link>
        {session?.user ? (
          <LogoutUser />
        ) : (
          <Link className={buttonVariants()} href='/sign-in'>
            Entrar
          </Link>
        )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
