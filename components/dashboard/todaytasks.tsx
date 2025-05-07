'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useCallback, useEffect, useState } from "react"
import { Badge } from "../ui/badge";

import { Separator } from "../ui/separator";
import { Filter,EllipsisVertical,ArrowUpNarrowWide, Paperclip, MessageSquare, PlusCircle, User } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "../ui/checkbox";
import { formatTime } from "@/utils/tools";
import { useToast } from "../hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { GetTasksViaClients } from "@/app/api/tasks/route";
import { Skeleton } from "../ui/skeleton";

interface TodaysTasksProps {
    tasks: [];
    onTaskSelect: (taskId: number) => void;
  }
export function TodayTasks() {
    const [isloading, setIsloading] = useState(true);
    const [date, setDate] = useState<Date | undefined>(new Date('2025-05-05'))
    const [tasks, setTasks] = useState(Array());
    const { toast } = useToast()
    // const tasks=Array()
    useEffect(() => {
      async function getTasks() {
        console.log('date in task',date)
         const getData=await GetTasksViaClients(date);
         if(getData?.success){
          setTasks(getData?.data||[])
           setIsloading(false)
            //  setIschanged(false)
         }else{
          setIsloading(false)
             toast({
                 title: "Error",
                 description: "Failed to Load workSpace. Please try again.",
                 variant: "destructive",
               });
         }
     }

    
     setIsloading(true)
     getTasks()
     

      // const timer = setTimeout(() => setIsloading(false), 2000);
      // return () => clearTimeout(timer);
    }, [date]);
  
    const handleStatusChange = useCallback(async (taskId: number, isCompleted: boolean) => {
        try {
         
        } catch (error) {
          console.error('Failed to update task status:', error);
        }
      }, []);
    
      const getTaskBorderColor = (status: string) => {
        switch (status) {
          case "completed":
            return "border-success-500";
          case "in-progress":
            return "border-primary-500";
          case "on-hold":
            return "border-warning-500";
          case "cancelled":
            return "border-danger-500";
          default:
            return "border-neutral-300";
        }
      };
      
    return (
      
      <Card className="flex-auto">
     
        <CardHeader>
          <CardTitle className="flex justify-between items-center ">
            Today's Tasks
            <div className="flex gap-1">
            
            <Button variant={'ghost'} className="px-3 py-1">
                <Filter/>
                </Button>
                <Button variant={'ghost'} className="px-3 py-1">
                <ArrowUpNarrowWide/>
                </Button>
                <Button variant={'ghost'} className="px-3 py-1">
            <EllipsisVertical /> 
            </Button>
            </div>
            </CardTitle>
           
          <CardDescription>
          <Separator className="mt-2"/>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-5 py-3 flex flex-col gap-5 items-center">
        {isloading ?
        <div className="flex w-full flex-col gap-4 p-5">
          <Skeleton className="w-[50%] h-[20px] rounded-full" />
          <Skeleton className="w-[90%] h-[20px] rounded-full" />
          <Skeleton className="w-[20%] h-[20px] rounded-full" />
          <Skeleton className="w-[95%] h-[20px] rounded-full" />
        </div>
        :
        <>
  
  
          {tasks.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No tasks scheduled for today
          </div>
        ) : (
          tasks.map((task) => (
            <div 
              key={task.id} 
              className={`p-2 hover:bg-neutral-50 rounded-md border-l-4 w-full hover:text-neutral-700 ${getTaskBorderColor(task.status)}`}
            //   onClick={() => onTaskSelect(task.id)}
            >
              <div className="flex items-center">
                <div className="mr-3">
                  <Checkbox 
                    checked={task.status === 'completed'}
                    onCheckedChange={(checked) => {
                      handleStatusChange(task.id, checked as boolean);
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevent opening task modal
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium ">{task.title}</h3>
                    <div className="flex items-center">
                      {task.startDate && task.endDate && (
                        <span className="text-sm text-neutral-500 mr-2">
                          {formatTime(task.startDate)} - {formatTime(task.endDate)}
                        </span>
                      )}
                      <span className={`inline-block w-2 h-2 rounded-full ${
                        task.status === 'completed' ? 'bg-success-500' :
                        task.status === 'in-progress' ? 'bg-primary-500' : 
                        task.status === 'on-hold' ? 'bg-warning-500' : 
                        'bg-danger-500'
                      }`}></span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center">
                      <span className="inline-block px-2 py-0.5 bg-neutral-100 text-neutral-600 text-xs rounded mr-2">
                        {task.projects?.workspace?.title }
                         {/* task.workspaceId === 2 ? 'Development' : 'Sales'} */}
                      </span>
                      <div className="flex">
                      {task.clientData?.map((c:any)=>(
                                                    
                                                      
                                                    <Avatar key={`va-${c.id}`} className=" w-8 h-8 border-2  border-white -ml-1 first:ml-0">
                                                      <AvatarImage className="" src={c.avatar} alt={c.name} />
                                                      <AvatarFallback><User className="h-8 w-8" /></AvatarFallback>
                                                    </Avatar>
                                                 
                                                  
                                               ))}
                        {/* <Avatar className="w-6 h-6 border-2 border-white -ml-1 first:ml-0">
                          <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <Avatar className="w-6 h-6 border-2 border-white -ml-1">
                          <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" />
                          <AvatarFallback>MT</AvatarFallback>
                        </Avatar> */}
                      </div>
                    </div>
                    <div className="flex items-center text-neutral-400 text-sm">
                      <span className="mr-4">
                        <Paperclip className="h-3 w-3 inline mr-1" /> 2
                      </span>
                      <span>
                        <MessageSquare className="h-3 w-3 inline mr-1" /> 3
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
         </>
  }
        </CardContent>
        <CardFooter className="flex justify-between ">
       
        <button className="text-primary hover:text-primary-600 text-sm font-medium flex items-center mx-auto">
            <PlusCircle className="h-4 w-4 mr-1" /> Add New Task
          </button>
  
        </CardFooter>
       
      </Card>
      
    )
  }