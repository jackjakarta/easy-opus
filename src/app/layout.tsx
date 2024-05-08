import { NavLinks } from "./ui/nav-links";
import './globals.css';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavLinks />
        <main className="my-8 mx-auto w-full max-w-2xl">{children}</main>
      </body>
    </html>
  );
};
