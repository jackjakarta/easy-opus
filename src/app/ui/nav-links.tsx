'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";


export function NavLinks() {
    const pathname = usePathname();
    
    return (
        <nav className="mt-3">
            <Link className={`link ${pathname === '/' ? 'active': ''} ms-4 me-2`} href='/'>
                Home
            </Link>

            <Link className={`link ${pathname === '/events' ? 'active': ''} me-2`} href='/events'>
                Events
            </Link>
        </nav>
    );
};
