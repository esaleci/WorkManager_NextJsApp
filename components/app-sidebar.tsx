'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"

   
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Clock,
  BarChart2,
  Settings,
  Menu,
  PlusCircle,
  CombineIcon,
} from "lucide-react";

import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { WorkSpaceForm } from "./dashboard/workspace/workspace-form";
import { useEffect, useState } from "react";
import WorkspaceList from "./dashboard/workspaceList";

// Menu items.
const items =  [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    name: "My Projects",
    href: "/dashboard/projects",
    icon: <CombineIcon className="h-5 w-5" />,
  },
  {
    name: "My Tasks",
    href: "/dashboard/tasks",
    icon: <CheckSquare className="h-5 w-5" />,
  },
  {
    name: "Calendar",
    href: "/dashboard/calendar",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    name: "Time Tracking",
    href: "/dashboard/timetrack",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: <BarChart2 className="h-5 w-5" />,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];
  export function AppSidebar() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isChangeWorkspaces, setIsChangeWorkspaces] = useState(true);

    function changingWorkSpace(value:boolean){
      console.log('update',value)
      setIsChangeWorkspaces(value)
      
    }

    
   
    return (
      <Sidebar>
        <SidebarHeader className="flex w-full items-center h-16 p-5 bg-background border-b border-b-foreground/10" >
        <Link href={"/"}>Work Manager</Link>
       
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup >
          <SidebarMenu >
              {items.map((item) => (
                <SidebarMenuItem key={item.name} >
                  <SidebarMenuButton className="px-5 " asChild>
                    <a href={item.href}>
                      {item.icon }
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

          </SidebarGroup>
          <SidebarGroup>
            
            <div className="flex w-full justify-between items-center text-xs font-medium text-neutral-400 uppercase mb-2 px-3 pt-4  border-t border-t-foreground/20">
          <h3 className="">
                Workspaces
              </h3>

            
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size={'icon'} className="" variant={'ghost'}>
              <PlusCircle className=" h-4 w-4" />
              {/* Add Task */}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
      <DialogTitle>  Create New WorkSpace</DialogTitle>
      <DialogDescription>
     
      </DialogDescription>
    </DialogHeader>
            <WorkSpaceForm  onSuccess={() => setIsCreateDialogOpen(false)} onChangedData={()=>changingWorkSpace(true)} />
          </DialogContent>
        </Dialog>
        </div>
        <SidebarGroupContent>
        <WorkspaceList changed={isChangeWorkspaces} fnchangedupdate={changingWorkSpace} />
        </SidebarGroupContent>
          </SidebarGroup>
        
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }