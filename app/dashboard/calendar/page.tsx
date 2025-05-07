
'use client'
import CalendarCom from "@/components/dashboard/calender-com";
import Tasks from "@/components/dashboard/tasks/tasks";
import WeeklyAvailability from "@/components/dashboard/weeklyavailability";
import { useEffect, useState } from "react";

import { use } from 'react'
 
type Params = Promise<{ datefind: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
 


export default function CalendarPage(props: {
    params: Params,
  searchParams: SearchParams
}) {
    
    // const params = use(props.params)
  const searchParams = use(props.searchParams)
//   const dateFind =params.datefind
  const dateFind = searchParams.datefind
let setDateFind=new Date()
  if(dateFind){
      setDateFind=new Date(dateFind)
  }

  console.log('query is',dateFind)
    // const query = Date(searchParams.queryKey)

const [date, setDate] = useState<Date | undefined>(setDateFind)

function setDateViewTask(cdate:Date){
   setDate(cdate)
}


function ViewTask({tdate}:{tdate:Date}){

     useEffect(()=>{
        console.log('set date is',tdate)
     },[tdate])

    return(
        <Tasks date={tdate} />
    )

}
    return (
        <div className="flex gap-5 items-top w-full justify-start flex-wrap">
            <div className="flex-1 flex flex-col gap-5">
<CalendarCom selecteddate={date} fnChangeDate={setDateViewTask} />
  <WeeklyAvailability />

            </div>
            <div className="flex-1">
              <ViewTask tdate={date||new Date()} />
            </div>
        </div>
       
    )
}