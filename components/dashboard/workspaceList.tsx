'use client'
import { DelWorkSpaces, GetWorkSpaces } from "@/app/api/workspace/route"
import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../hooks/use-toast";
import { SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    
      Edit2,
    EllipsisVertical,
    MoreVertical,
    PlusCircle,
    Trash2,
   
  } from "lucide-react";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

import { WorkSpaceForm } from "./workspace/workspace-form";

export default function WorkspaceList({changed,fnchangedupdate}:{changed:boolean,fnchangedupdate:any}){
    const [isloading, setIsloading] = useState(true);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isChanged, setIschanged] = useState(changed);
    const [isSelected,setIsSelected]= useState({});
    const [deleting, setDeleting] = useState(false);
    const [workspaces, setWorkspaces] = useState(Array());
    const { toast } = useToast();

    async function deleteWorkSpace(id:number){
        console.log('start delete')
        setDeleting(true);
        const deleteWorkSpace=await DelWorkSpaces(id);
        if(deleteWorkSpace.success){
            setDeleting(false);
            fnchangedupdate(true)
            toast({
                title: "WorkSpace deleted",
                description: "The workSpace has been deleted successfully.",
              });
             
        }
        else{
            setDeleting(false);
            toast({
                title: "Error",
                description: "Failed to Delete workSpace. Please try again.",
                variant: "destructive",
              });
        }
    }

    useEffect(()=>{
        setIschanged(changed)
        console.log('start use effect',isChanged)
        
        async function getworkspace() {
            const getworkspace=await GetWorkSpaces();
            if(getworkspace?.success){
                setWorkspaces(getworkspace?.data||[])
                setIsloading(false)
            }else{
                setIsloading(false)
                toast({
                    title: "Error",
                    description: "Failed to Load workSpace. Please try again.",
                    variant: "destructive",
                  });
            }
        }

        if(changed=== true){
       
           setIsloading(true)
            getworkspace()
            if(fnchangedupdate){
               fnchangedupdate(false)
               setIschanged(false)
            }
        }
    },[changed])


    return (
        <div>
        {isloading ?
            <div className="flex flex-col gap-4 p-5">
              <Skeleton className="w-[90%] h-[20px] rounded-lg" />
              <Skeleton className="w-[90%] h-[20px] rounded-lg" />
              <Skeleton className="w-[90%] h-[20px] rounded-lg" />
              <Skeleton className="w-[90%] h-[20px] rounded-lg" />
            </div>
            :
            <>
               <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <SidebarMenu>
          {workspaces.map((project) => (
            <SidebarMenuItem key={project.id}>
              <SidebarMenuButton asChild>
                <div className="flex justify-between">
                <a href={project.title}>
                  {/* <project.icon /> */}
                  <span>{project.title}</span>
                </a>
                <div>
             
                   <DropdownMenu>
  <DropdownMenuTrigger asChild>
  <Button variant="ghost" size={'icon'} className="p-0 focus:bg-gray-700 focus:border-0 ">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
   
    
        <DialogTrigger asChild>
         
<DropdownMenuItem onClick={()=>setIsSelected({id:project.id,title:project.title,is_del:false})} >
    <Edit2 />
    Edit
    </DropdownMenuItem>
          </DialogTrigger>
        
       
       
    <DropdownMenuItem onClick={()=>deleteWorkSpace(Number(project.id||0))}>
        <Trash2/>
        {deleting? 'Deleting..' :'Delete'}
        </DropdownMenuItem>
          
  </DropdownMenuContent>
</DropdownMenu>


                   </div>
                   </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
      <DialogTitle>Edit WorkSpace</DialogTitle>
      <DialogDescription>
     
      </DialogDescription>
    </DialogHeader>
            <WorkSpaceForm initialData={isSelected}  onSuccess={() => setIsCreateDialogOpen(false)} onChangedData={()=>fnchangedupdate(true)} />
          </DialogContent>
        </Dialog>

       
       
       
            </>}
            </div>
    )
}