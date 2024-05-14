import { ClerkProvider } from '@clerk/nextjs';
import { NavLinks } from "./ui/nav-links";
import './globals.css';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header>
            <NavLinks />  
          </header>
          <main className="my-8 mx-auto w-full max-w-2xl">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
};
