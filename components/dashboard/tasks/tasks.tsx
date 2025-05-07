'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCircle2,
  Clock,
  MoreVertical,
  PlusCircle,
  AlertCircle,
  Pause,
  Ban,
  Edit2,
  Trash2,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { TaskPriorityEnum, TaskStatusEnum } from "@/utils/tools";
import {taskFormSchema, TaskFormValues} from "@/utils/supabase/types"

import { toast } from "@/components/hooks/use-toast";
import { TaskForm } from "./task-form";
import { DelTask, GetTasks, GetTasksViaClients } from "@/app/api/tasks/route";


// interface ProjectProps {
//   onProjectSelect: (prjId: string) => void;
// }

export default function Tasks({date}:{date?:Date}) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [projectsdata, setProjectsData] = useState(Array());
  const [isSelected,setIsSelected]= useState({});
  const [isNewDialog,setIsNewDialog]= useState(true);
  const [deleting, setDeleting] = useState(false);
  const [isChanged, setIschanged] = useState(true);

//   const { data: tasks, isLoading } = useQuery({
//     queryKey: ['/api/tasks'],
//   });

function ChangingProjects(value:boolean){
    console.log('update',value)
    setIschanged(value)
    
  }

 useEffect(()=>{
   async function getTasks() {
             console.log('date in task',date)
              const getData=await GetTasksViaClients(date);
              if(getData?.success){
                setProjectsData(getData?.data||[])
                  setIsLoading(false)
                  setIschanged(false)
              }else{
                setIsLoading(false)
                  toast({
                      title: "Error",
                      description: "Failed to Load workSpace. Please try again.",
                      variant: "destructive",
                    });
              }
          }

          if(isChanged){
          setIsLoading(true)
          getTasks()
          }
 },[isChanged])

   
  const getFilteredTasks = (status?: string) => {
    if (!projectsdata) return [];
    console.log('status is',status,projectsdata)
    if (!status || status === "all") return projectsdata;
    return projectsdata.filter((task: any) => task.status === Number(status));
  };


  const onProjectSelect=(prjId:string)=>{
    const getPrg=projectsdata.find(f=>f.id==prjId)
    setIsSelected(getPrg)
  }
 
   async function deleteProject(prjId:string){
          console.log('start delete')
          setDeleting(true);
          const deleteWorkSpace=await DelTask(prjId);
          if(deleteWorkSpace.success){
              setDeleting(false);
              ChangingProjects(true);
              toast({
                  title: "Project deleted",
                  description: "The project has been deleted successfully.",
                });
               
          }
          else{
              setDeleting(false);
              toast({
                  title: "Error",
                  description: "Failed to Delete project. Please try again.",
                  variant: "destructive",
                });
          }
      }
  

  const getStatusIcon = (status: number) => {
    switch (status) {
      case TaskStatusEnum.COMPLETED:
        return <CheckCircle2 className="h-4 w-4 text-success-500" />;
      case TaskStatusEnum.IN_PROGRESS:
        return <Clock className="h-4 w-4 text-primary-500" />;
      case TaskStatusEnum.ON_HOLD:
        return <Pause className="h-4 w-4 text-warning-500" />;
      case TaskStatusEnum.CANCELLED:
        return <Ban className="h-4 w-4 text-danger-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const formatDate = (date: string | Date | null) => {
    if (!date) return "No date";
    const taskDate = new Date(date);
    return `${taskDate.toLocaleDateString()} ${taskDate.toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}`;
  };

  const SetDialogContent=({isNew}:{isNew:boolean})=>{
    return (
        <>
        {isNew ?
        <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
                                        <DialogTitle>Create New Task</DialogTitle>
                                        <DialogDescription />

                                        
                                    </DialogHeader>
          <TaskForm onSuccess={() => setIsCreateDialogOpen(false)} onChangedData={ChangingProjects} />
        </DialogContent> :

<DialogContent className="sm:max-w-[600px]">
<DialogHeader>
                                <DialogTitle>Edit Task</DialogTitle>
                                <DialogDescription />

                                
                            </DialogHeader>
    <TaskForm initialData={isSelected} onSuccess={() => setIsCreateDialogOpen(false)} onChangedData={ChangingProjects} />
</DialogContent>
  }
        </>
    )
  }

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>
            View and manage all your Tasks
          </CardDescription>
        </div>
       
          <DialogTrigger asChild>
            <Button onClick={(e)=>{e.stopPropagation();setIsNewDialog(true)}}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <SetDialogContent isNew={isNewDialog} />
       
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value={TaskStatusEnum.TODO.toString()}>To Do</TabsTrigger>
            <TabsTrigger value={TaskStatusEnum.IN_PROGRESS.toString()}>In Progress</TabsTrigger>
            <TabsTrigger value={TaskStatusEnum.COMPLETED.toString()}>Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className=" h-10 w-full" />
                <Skeleton className=" h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
                
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Status</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Clients</TableHead>
                    <TableHead className="w-28">Priority</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredTasks(activeTab).map((task: TaskFormValues) => (
                    <TableRow 
                      key={task.id} 
                    //   onClick={() => onProjectSelect(task.id||'')}
                      className="cursor-pointer"
                    >
                      <TableCell>
                        {getStatusIcon(task.status)}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {task.description || "No description"}
                        </div>
                      </TableCell>
                      <TableCell>
                      {task.projects ? (
                        <div>
                        <div className="font-medium">{task.projects?.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {task.projects?.description || "No description"}
                        </div>
                        </div>
                         ) : (
                          "No Project"
                        )}
                      </TableCell>
                      <TableCell>
                        {task.endDate ? (
                          <div>
                            <div className="font-medium">{formatDate(task.endDate)}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(task.endDate), { addSuffix: true })}
                            </div>
                          </div>
                        ) : (
                          "No deadline"
                        )}
                      </TableCell>
                      <TableCell>
                                              {task.clientData ? (
                                                <div>
                                                  <div className="flex gap-0  items-center justify-start">
                                                  {task.clientData?.map((c:any)=>(
                                                    
                                                      
                                                       <Avatar key={`va-${c.id}`} className=" h-8 w-8 !border border-stone-500 shadow-lg ml-[-10px]">
                                                         <AvatarImage className="" src={c.avatar} alt={c.name} />
                                                         <AvatarFallback><User className="h-8 w-8" /></AvatarFallback>
                                                       </Avatar>
                                                    
                                                     
                                                  ))}
                                                 
                      
                                                 </div>
                                                 <div className="flex gap-1  items-center justify-start pt-1">
                                                 {task.clientData?.map((c:any,index:any)=>(
                                                  <div  key={`cname-${c.id}`} className="text-xs text-muted-foreground">
                                                    {c.name||''} 
                                                    {index < (task?.clientData?.length||0 )-1 ?<span> ,</span>:'' }
                                                    
                                                  </div> 
                                                     
                                               ))}
                                                 </div>
                                                </div>
                                              ) : (
                                                "No Clients"
                                              )}
                                            </TableCell>
                      <TableCell>
                        <Badge variant={
                          task.priority === TaskPriorityEnum.HIGH ? "destructive" : 
                          task.priority === TaskPriorityEnum.MEDIUM ? "default" : 
                          "outline"
                        }>
                          {task.priority===TaskPriorityEnum.HIGH ? "High" :task.priority===TaskPriorityEnum.MEDIUM ? "Medium" :"Low" }
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {task.paidAmount ? (
                          <div>
                            {/* <div className="font-medium">${task.totalPrice.toFixed(2)}</div> */}
                            <div className="text-xs text-muted-foreground">
                              Paid: ${task.paidAmount?.toFixed(2) || "0.00"}
                            </div>
                          </div>
                        ) : (
                          "No budget"
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              onProjectSelect(task.id||'');
                            }}>
                              View details
                            </DropdownMenuItem>
                            <DialogTrigger asChild>
         
         <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              onProjectSelect(task.id||'');
                              ;setIsNewDialog(false)
                            }}>
             <Edit2 />
             Edit
             </DropdownMenuItem>
                   </DialogTrigger>
                            
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={()=>deleteProject(task.id||'')}>
        <Trash2/>
        {deleting? 'Deleting..' :'Delete'}
        </DropdownMenuItem>
                            
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
             
      
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
    {/* <SetDialogContent isNew={false}/> */}
    </Dialog>
  );
}