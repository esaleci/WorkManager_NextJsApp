// export default async function Layout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="max-w-full flex  gap-12 items-start">
//       <div>

//       </div>
//       <div>
//       {children}
//       </div>
//     </div>
//   );
// }

import { AppSidebar } from "@/components/app-sidebar"
import DashboardNav from "@/components/dashboard-nav"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"



export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <main className="relative flex gap-5 w-full items-center flex-col">
          <div className="px-2 sticky flex  w-full justify-between items-center  top-0 z-50 bg-background border-b border-b-foreground/10 h-16">
          <SidebarTrigger />
          <DashboardNav />
          </div>
          <div className="px-8 py-2 flex gap-5 w-full items-center  ">
          {children}
          </div>
        </main>
      </SidebarProvider>
    )
  }