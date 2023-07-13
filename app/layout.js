import { Inter } from "next/font/google";
import ClientLayout from "./components";
import { Provider } from "./context";
import "./globals.scss";
import "./nprogress.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Comify Chat",
  description:
    "Supercharge your website effortlessly with Comify Chat's AI-powered chatbot. Implement in minutes with minimal code, revolutionizing customer interaction with ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
