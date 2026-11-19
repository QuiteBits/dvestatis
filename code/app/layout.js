import "@fontsource-variable/josefin-sans";
import "./globals.css";

export const metadata = {
  title: "DEVSTATIS",
  description: "GitHub profile analytics and developer insights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
