'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";


export function NavLinks() {
    const pathname = usePathname();
    
    return (
        <nav className="flex justify-center space-x-4 mt-3">
            <Link className={`link ${pathname === '/' ? 'active': ''}`} href='/'>
                Home
            </Link>

            <Link className={`link ${pathname === '/events' ? 'active': ''}`} href='/events'>
                Events
            </Link>
        </nav>
    );
};
