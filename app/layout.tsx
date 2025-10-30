import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import { Instrument_Sans } from "next/font/google";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${instrumentSans.className}`}>
        <AuthProvider>
          <main className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <div className="flex grow">{children}</div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
