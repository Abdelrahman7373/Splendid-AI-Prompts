'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);


  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, [])


  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
         <Image src="/assets/images/AI.png" alt="Splendid AI Promtps Logo" width={60} height={60} className="object-contain" />
         <p className="logo_text">Splendid AI Prompts</p>
      </Link>

      {/* DESKTOP NAVIGATION */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-post" className="cyan_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
            <Link href="/profile">
              <Image src={session?.user.image} width={40} height={40} className="rounded-full" alt="profile" onClick={() => {}} />
            </Link>
          </div>
        ):(
          <>
           {providers && Object.values(providers).map((provider) => (
            <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="cyan_btn">Sign In</button>
           ))}
          </>
        )} 
      </div>

      {/* MOBILE NAVIGATION */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image src={session?.user.image} width={60} height={60} className="rounded-full" alt="profile" onClick={() => setToggleMenu((prev) => !prev)} />
            {toggleMenu && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={() => setToggleMenu(false)}>
                  My Profile
                </Link>
                <Link href="/create-post" className="dropdown_link" onClick={() => setToggleMenu(false)}>
                  Create Post
                </Link>
                <button type="button" onClick={() => {setToggleMenu(false);signOut();}} className="mt-5 w-full cyan_btn">Sign Out</button>
              </div>
            )}
          </div>
        ):(
          <>
           {providers && Object.values(providers).map((provider) => (
            <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="cyan_btn">Sign In</button>
           ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
