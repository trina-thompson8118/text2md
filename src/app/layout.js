import { Unna } from "next/font/google";
import "./globals.css";

const unna = Unna({
  variable: "--font-unna",
  weight: ["400", "700"], 
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${unna.variable} antialiased bg-gradient-to-br from-slate-100 to-slate-300`}>
        {children}
      </body>
    </html>
  );
}
