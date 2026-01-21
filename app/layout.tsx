import "./globals.css";
import NavTabs from "./components/NavTabs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <NavTabs />
          {children}
        </main>
      </body>
    </html>
  );
}
