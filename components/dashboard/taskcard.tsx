
 
'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useEffect, useState } from "react"
import ProgressColorDemo from "./progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "../ui/skeleton"


 
export function TaskCards({alltask,completed,title,des,badge,symbol,symbolleft,badgecolor}:{alltask:string,completed:string,title:any,des:any,badge:any,symbol:any,symbolleft:boolean,badgecolor:any}) {
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => setIsloading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    
    <Card className="flex-auto">
     
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {title} 
          {badge &&
          <Badge variant="outline" className={`${badgecolor}`} >{badge}</Badge> }
          </CardTitle>
        <CardDescription>{des}</CardDescription>
      </CardHeader>
      <CardContent>
      {isloading ?
      <div className="flex flex-col gap-4 p-5">
        <Skeleton className="w-[50%] h-[20px] rounded-full" />
        <Skeleton className="w-[90%] h-[20px] rounded-full" />
        <Skeleton className="w-[20%] h-[20px] rounded-full" />
        <Skeleton className="w-[95%] h-[20px] rounded-full" />
      </div>
      :
      <>
        {symbolleft && symbol &&
        `${completed}${symbol}/${alltask}${symbol}`
        }

{!symbolleft && symbol &&
        `${symbol}${completed}/${symbol}${alltask}`
        }

{!symbol &&
        `${completed}/${alltask}`
        }


        {/* <div className="flex items-center">
            <span className="w-1/6 text-right mr-2">50%</span>
            <div className="w-5/6">
              <Progress value={50}  className="w-full [&>div]:bg-green-500" />
            </div>
          </div> */}
           </>
          }
      </CardContent>
      <CardFooter className="flex justify-between ">
      <ProgressColorDemo completed={completed} alltask={alltask}/>
    

      </CardFooter>
     
    </Card>
    
  )
}


