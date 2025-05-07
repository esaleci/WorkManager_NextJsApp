'use client'
import { Calendar } from "@/components/ui/calendar"
import { useEffect, useState } from "react"
export default function CalendarCom({fnChangeDate,selecteddate}:{fnChangeDate:any,selecteddate?:Date}){
    const [date, setDate] = useState<Date | undefined>(selecteddate || new Date())
     
    useEffect(()=>{

        if(fnChangeDate)
            fnChangeDate(date)
    },[date])

    return (

      <Calendar 
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border flex items-center justify-center"
      />
    )
}