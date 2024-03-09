import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavigationMenu";
import { ClerkProvider } from "@clerk/nextjs";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NGage Social",
  description: "NGage social media app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {/* <NavBar /> */}
        {children}
        </body>
    </html>
    </ClerkProvider>
  );
}
