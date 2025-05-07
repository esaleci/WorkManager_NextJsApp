'use client'

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Task } from "@shared/schema";

export default function ProgressChart() {
  const [timeframe, setTimeframe] = useState("week");
  const tasks =null
  const [isloading, setIsloading] = useState(true);
//   const { data: tasks } = useQuery({
//     queryKey: ['/api/tasks'],
//   });
  
  // Calculate the chart data
  const calculateStats = () => {
    if (!tasks) return { completed: 10, inProgress: 60, overdue: 30 };
    
    // const completed = tasks.filter((task: Task) => task.status === "completed").length;
    // const inProgress = tasks.filter((task: Task) => task.status === "in-progress").length;
    
    // // For demo purposes, we'll consider any task that has endDate in the past and is not completed
    const now = new Date();
    // const overdue = tasks.filter((task: Task) => {
    //   if (!task.endDate || task.status === "completed") return false;
    //   return new Date(task.endDate) < now && task.status !== "completed";
    // }).length;
    
    const total = 0;
    
    return {
      // completed: total > 0 ? Math.round((completed / total) * 100) : 0,
      // inProgress: total > 0 ? Math.round((inProgress / total) * 100) : 0,
      // overdue: total > 0 ? Math.round((overdue / total) * 100) : 0,

      completed: 10,
      inProgress:60,
      overdue: 30,
    };
  };
  
  const { completed, inProgress, overdue } = calculateStats();
  
  // Mock project progress data
  const projects = [
    { name: "Marketing Campaign", progress: 70, color: "bg-lime-500" },
    { name: "Website Redesign", progress: 45, color: "bg-yellow-500" },
    { name: "Product Launch", progress: 85, color: "bg-teal-500" },
  ];
  
  useEffect(() => {
      
    const timer = setTimeout(() => setIsloading(false), 2000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <Card className="overflow-hidden ">
       <CardHeader>
       <CardTitle className="flex justify-between items-center ">
        Work Progress
        <div className="flex items-center space-x-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="gap-2">
              <SelectValue placeholder="This Week" className="p-2" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardTitle>
      </CardHeader>
      <CardContent className="relative flex flex-col gap-8 p-4 ">
           {isloading ?
                <div className="flex flex-col gap-4 p-5">
                  <div className="flex justify-between items-center px-12">
                  <Skeleton className="w-24 h-24 rounded-full" />
                  <Skeleton className="w-24 h-24 rounded-full" />
                  <Skeleton className="w-24 h-24 rounded-full" />
                  </div>
                  <div className="flex flex-col gap-3 justify-between items-center">
                  <Skeleton className="w-[95%] h-[20px] rounded-full" />
                  <Skeleton className="w-[95%] h-[20px] rounded-full" />
                  <Skeleton className="w-[95%] h-[20px] rounded-full" />
                  </div>
                </div>
                :
                <>
        <div className="flex justify-between mb-8">
          <div className="text-center">
            <div className="relative inline-block">
              <svg className="w-20 h-20" width={100} height={100} viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#C7C7CB" strokeWidth="3" />
                <circle 
                  cx="18" 
                  cy="18" 
                  r="15" 
                  fill="none" 
                  stroke="#00c875" 
                  strokeWidth="3" 
                  strokeDasharray={`${completed} ${100 - completed}`} 
                  strokeDashoffset="25" 
                  transform="rotate(-90 18 18)" 
                />
                <text 
                  x="18" 
                  y="18" 
                  textAnchor="middle" 
                  dominantBaseline="central" 
                  fontSize="8" 
                  fontWeight="bold" 
                  fill="#C7C7CB"
                >
                  {completed}%
                </text>
              </svg>
            </div>
            <p className="text-sm font-medium text-neutral-500 mt-1">Completed</p>
          </div>
          
          <div className="text-center">
            <div className="relative inline-block">
              <svg className="w-20 h-20" width={100} height={100} viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#C7C7CB" strokeWidth="3" />
                <circle 
                  cx="18" 
                  cy="18" 
                  r="15" 
                  fill="none" 
                  stroke="#fdab3d" 
                  strokeWidth="3" 
                  strokeDasharray={`${inProgress} ${100 - inProgress}`} 
                  strokeDashoffset="25" 
                  transform="rotate(-90 18 18)" 
                />
                <text 
                  x="18" 
                  y="18" 
                  textAnchor="middle" 
                  dominantBaseline="central" 
                  fontSize="8" 
                  fontWeight="bold" 
                  fill="#C7C7CB"
                >
                  {inProgress}%
                </text>
              </svg>
            </div>
            <p className="text-sm font-medium text-neutral-500 mt-1">In Progress</p>
          </div>
          
          <div className="text-center">
            <div className="relative inline-block">
              <svg className="w-20 h-20" width={100} height={100} viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#C7C7CB" strokeWidth="3" />
                <circle 
                  cx="18" 
                  cy="18" 
                  r="15" 
                  fill="none" 
                  stroke="#e44258" 
                  strokeWidth="3" 
                  strokeDasharray={`${overdue} ${100 - overdue}`} 
                  strokeDashoffset="25" 
                  transform="rotate(-90 18 18)" 
                />
                <text 
                  x="18" 
                  y="18" 
                  textAnchor="middle" 
                  dominantBaseline="central" 
                  fontSize="8" 
                  fontWeight="bold" 
                  fill="#C7C7CB"
                >
                  {overdue}%
                </text>
              </svg>
            </div>
            <p className="text-sm font-medium text-neutral-500 mt-1">Overdue</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-5 ">
          {projects.map((project) => (
            <div key={project.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-medium text-neutral-700">{project.name}</div>
                <div className="text-sm text-neutral-400">{project.progress}%</div>
              </div>
              <div className="w-full h-2 bg-neutral-500 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${project.color} text-neutral-400`} 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        </>}
      </CardContent>
    </Card>
  );
}
