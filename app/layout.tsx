import type { Metadata } from "next";
import Providers from "./components/provider";

export const metadata: Metadata = {
  title: "Movie Ticket Booking",
  description: "Movie ticket booking application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}