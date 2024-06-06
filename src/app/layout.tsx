import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./sass/globals.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "@/componets/main/navbar";
import Footer from "@/componets/main/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MovieBox - Streaming Platform concept/Practice project",
  description: "A practice project and streaming platform concpet made with Typescript, Nextjs, Scss and Bootstrap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} id="root">
        <NavBar/>
        <div>
          {children}
          <Footer/>
        </div>
      </body>
    </html>
  );
}
