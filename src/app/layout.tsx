import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./sass/globals.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from "@/componets/main/navbar";
import Footer from "@/componets/main/footer";
import { HandleLogoutPopup } from "@/componets/main/handleGlobalPopups/handleHidingPopup";

//Import context providers, react's useContext API is used to prevent prop drilling
import { AuthContextProvider } from "@/context/AuthContext";
import { SettingsContextProvider } from "@/context/SettingsContext";
import { PopupContextProvider } from "@/context/PopupContext";
import { MovieActionProvider } from "@/context/MovieActionsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MovieBox - Moive and show data web app project",
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
        <AuthContextProvider>
          <MovieActionProvider>
            <PopupContextProvider>
              <SettingsContextProvider>
                <NavBar/>
              </SettingsContextProvider>
              <div className="layout">
                {children}
                <Footer/>
              </div>
              <HandleLogoutPopup/>
            </PopupContextProvider>
          </MovieActionProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
