import { Poppins } from "next/font/google";

import "./globals.css";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  maximumScale: 2,
  minimumScale: 1,
};

export default async function RootLayout({ children }) {
  return (
    <html>
      <body className={poppins.className}>
        <NextTopLoader
          color="#fff0c4"
          height={4}
          speed={500}
          showSpinner={false}
        />

        <div className="min-h-screen flex flex-col justify-between">
          <ToastContainer style={{ marginTop: "100px" }} autoClose={3000} />
          {/* <Header /> */}
          <main className="w-full flex-1 flex flex-wrap">
            <div className="w-full">{children}</div>
          </main>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
