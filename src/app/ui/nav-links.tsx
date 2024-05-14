'use client';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavLinks() {
    const pathname = usePathname();
    
    return (
        <nav className="flex justify-center space-x-4 mt-3">
            <Link 
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 
                            ${pathname === '/' ? 'bg-indigo-600 text-white' : 'text-indigo-500 hover:bg-indigo-100'}`} 
                href='/'
            >
                Home
            </Link>

            <Link 
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 
                            ${pathname === '/events' ? 'bg-indigo-600 text-white' : 'text-indigo-500 hover:bg-indigo-100'}`} 
                href='/events'
            >
                Events
            </Link>
            
            <SignedIn>
                <UserButton />
            </SignedIn>
            
            <SignedOut>
                <Link 
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 
                                ${pathname === '/sign-in' ? 'bg-indigo-600 text-white' : 'text-indigo-500 hover:bg-indigo-100'}`} 
                    href='/sign-in'
                >
                    Sign In
                </Link>

                <Link 
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 
                                ${pathname === '/sign-up' ? 'bg-indigo-600 text-white' : 'text-indigo-500 hover:bg-indigo-100'}`} 
                    href='/sign-up'
                >
                    Sign Up
                </Link>
            </SignedOut>  
        </nav>
    );
};
