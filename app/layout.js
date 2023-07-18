import { Inter, Space_Grotesk } from "next/font/google";
import ClientLayout from "./components";
import { Provider } from "./context";
import "./globals.scss";
import "./nprogress.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata = {
  title: "Infin AI",
  description:
    "Supercharge your website effortlessly with Infin AI's AI-powered chatbot. Implement in minutes with minimal code, revolutionizing customer interaction with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={inter.className}>
        <Provider>
          {children}
          <ClientLayout />
        </Provider>
        <div id="portal" />
        <div id="prompt" />
        <div id="pageProgress" />
      </body>
    </html>
  );
}
