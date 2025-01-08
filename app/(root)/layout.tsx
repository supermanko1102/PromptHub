import Navbar from "@/app/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="font-work-sans">
      <Navbar />
      {children}
    </main>
  );
}
