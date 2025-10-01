// app/layout.js
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "POF JBH Complex - Industrial Dashboard",
  description: "Real-time industrial production monitoring system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
