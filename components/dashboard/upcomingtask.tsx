'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  Calendar, CircleChevronRight, MoreVertical, User } from "lucide-react";
import { format, addDays, startOfDay, isSameDay } from "date-fns";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { GetTasksViaClients } from "@/app/api/tasks/route";
import { toast } from "../hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { TaskFormValues } from "@/utils/supabase/types";
// import { Task } from "@shared/schema";

interface UpcomingTasksProps {
  tasks: any[];
  onTaskSelect: (taskId: number) => void;
}

//{ tasks, onTaskSelect }: UpcomingTasksProps

export default function UpcomingTasks() {
  const today = startOfDay(new Date());
  const tomorrow = addDays(today, 1);
  const dayAfterTomorrow = addDays(today, 2);
  const [isloading, setIsloading] = useState(true);
  const [tomorrowTasks, setTomorrowTasks] = useState(Array());
  const [dayAfterTomorrowTasks, setDayAfterTomorrowTasks] = useState(Array());
  const [tasks, setTasks] = useState(Array());
  const [ischanged, setIschanged] = useState(true);
  const [moreTomorrow,setMoreTomorrow]=useState(false)
  const [moreDayAfterTomorrowTasks,setMoreDayAfterTomorrowTasks]=useState(false)
  // Group tasks by day
  
  
  
  
  const formatShortTime = (date: string | Date) => {
    return format(new Date(date), "h:mm a");
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success-500";
      case "in-progress":
        return "bg-primary-500";
      case "on-hold":
        return "bg-warning-500";
      case "cancelled":
        return "bg-danger-500";
      default:
        return "bg-neutral-500";
    }
  };
  
  const getTagColor = (workspaceId: number) => {
    switch (workspaceId) {
      case 1: // Marketing
        return "bg-blue-100 text-primary-500";
      case 2: // Development
        return "bg-green-100 text-success-500";
      case 3: // Sales
        return "bg-orange-100 text-warning-500";
      default:
        return "bg-neutral-100 text-neutral-500";
    }
  };
  
  const renderTaskCard = (task: any) => (
    <div 
      key={task.id} 
      className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 min-w-[240px] flex-shrink-0 cursor-pointer"
      onClick={() => onTaskSelect(task.id)}
    >
      <div className="flex items-center justify-between mb-2">
        {task.startDate && (
          <span className={`text-xs font-medium px-2 py-1 ${getTagColor(task.workspaceId)} rounded-full`}>
            {formatShortTime(task.startDate)}
          </span>
        )}
        <div className={`w-5 h-5 rounded-full ${getStatusColor(task.status)} flex items-center justify-center`}>
          <i className="ri-briefcase-4-line text-xs text-white"></i>
        </div>
      </div>
      <h3 className="font-medium text-neutral-800">{task.title}</h3>
      <p className="text-sm text-neutral-500 mt-1 truncate">
        {task.description || "No description"}
      </p>
      <div className="flex items-center mt-3">
        <div className="flex -space-x-1">
          {task.clientData?.map((c:any)=>(
                                                             
                                                               
                                                             <Avatar key={`va-${c.id}`} className=" w-8 h-8 border-2  border-white -ml-1 first:ml-0">
                                                               <AvatarImage className="" src={c.avatar} alt={c.name} />
                                                               <AvatarFallback><User className="h-8 w-8" /></AvatarFallback>
                                                             </Avatar>
                                                          
                                                           
                                                        ))}
        </div>
        {/* Add more if needed */}
      </div>
    </div>
  );
 
      // const tasks=Array()
      
     

      useEffect(() => {
        
             
        const getTasksByDay = async(date: Date) => {
          console.log('tasks is',tasks)
          const getData=await GetTasksViaClients(date);
          if(getData?.success){
           setTasks(getData?.data||[])
            setIsloading(false)
              setIschanged(false)
          }else{
           setIsloading(false)
              toast({
                  title: "Error",
                  description: "Failed to Load workSpace. Please try again.",
                  variant: "destructive",
                });
          }


          return getData?.data||[]
          
          // .filter((task:TaskFormValues) => {
          //   if (!task.startDate){ console.log('task no startDate'); return false };
          //   const taskDate = startOfDay(new Date(task.startDate));
           
          //   return isSameDay(taskDate, date);
             
          // });
        };


        const setdata=async()=>{
         
          const vtomorrowTasks =await getTasksByDay(tomorrow);
          const vdayAfterTomorrowTasks =await getTasksByDay(dayAfterTomorrow);
          setMoreTomorrow(vtomorrowTasks?.length>4)
          setMoreDayAfterTomorrowTasks(vtomorrowTasks?.length>4)
          setTomorrowTasks(vtomorrowTasks.slice(0, 4));
          setDayAfterTomorrowTasks(vdayAfterTomorrowTasks.slice(0, 4));
          setIsloading(false)
        }

      //  if(!ischanged){
        setdata()
      //  }

        // const timer = setTimeout(() => setIsloading(false), 2000);
        // return () => clearTimeout(timer);
      }, []);


  return (
    <Card className="">
         
         <CardHeader>
               <CardTitle className="flex justify-between items-center ">
                Upcoming Tasks
                <div className="flex gap-1">
          <Button variant={'ghost'} className="px-3 py-1">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant={'ghost'} className="px-3 py-1">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
               </CardTitle>
               <CardDescription>
          <Separator className="mt-2"/>
          </CardDescription>
               </CardHeader>
      
      
      <CardContent className="p-4 ">
      {isloading ?
        <div className="flex flex-col gap-4 p-5">
          <Skeleton className="w-[50%] h-[20px] rounded-full" />
          <Skeleton className="w-[90%] h-[20px] rounded-full" />
          <Skeleton className="w-[20%] h-[20px] rounded-full" />
          <Skeleton className="w-[95%] h-[20px] rounded-full" />
        </div>
        :
        <>
        {(tomorrowTasks.length === 0 && dayAfterTomorrowTasks.length === 0) ? (
          <div className="text-center py-6 text-muted-foreground">
            No upcoming tasks for the next few days
          </div>
        ) : (
          <>
            {tomorrowTasks.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-neutral-500 mb-2">
                  Tomorrow - {format(tomorrow, "MMM dd")}
                </h3>
                <div className="flex flex-nowrap overflow-x-auto pb-2 scrollbar-hide gap-4">
                  {tomorrowTasks.map(renderTaskCard)}
                  <div className="flex items-start justify-center">
                  {moreTomorrow?  <Link  href={{
    pathname: '/dashboard/calendar',
    query: { datefind: tomorrow.toDateString() },
  }}><Badge className="flex gap-2">View More <CircleChevronRight/> </Badge></Link> :<Badge>No More ..</Badge> }
                  </div>
                </div>
              </div>
            )}
            
            {dayAfterTomorrowTasks.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-neutral-500 mb-2">
                  {format(dayAfterTomorrow, "MMM dd")} - {format(dayAfterTomorrow, "EEEE")}
                </h3>
                <div className="flex flex-nowrap overflow-x-auto pb-2 scrollbar-hide gap-4">
                  {dayAfterTomorrowTasks.map(renderTaskCard)}
                  <div className="flex items-start justify-center">
                  {moreTomorrow? <Link href={"/dashboard/calendar"}> <Badge className="flex gap-2">View More <CircleChevronRight/> </Badge> </Link>:<Badge>No More ..</Badge> }
                  </div>
                </div>
              </div>
            )}
          </>
        )}
         </>}
      </CardContent>
     
    </Card>
  );
}
