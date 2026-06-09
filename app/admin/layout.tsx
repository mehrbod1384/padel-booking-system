import Sidebar from "@/components/ui/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        {/* <Navbar /> */}

        <main className="p-6 h-screen overflow-y-auto dark:bg-zinc-900">
          {children}
        </main>
      </div>
    </div>
  );
}
