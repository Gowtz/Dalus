import Sidenav from "@/components/Sidenav";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <Sidenav />
        {children}
      </SidebarProvider>
    </>
  );
}
