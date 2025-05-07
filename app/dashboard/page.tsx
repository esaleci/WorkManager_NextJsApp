import { TaskCards } from "@/components/dashboard/taskcard";
import { TodayTasks } from "@/components/dashboard/todaytasks";
import WeeklyAvailability from "@/components/dashboard/weeklyavailability";
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";

import { createClient } from "@/utils/supabase/server";
import { TimerIcon } from "lucide-react";
import { redirect } from "next/navigation";
import ProgressChart from "@/components/dashboard/workprogress"
import UpcomingTasks from "@/components/dashboard/upcomingtask";


interface DashboardProps {
  onTaskSelect: (taskId: number) => void;
}
export default async function ProtectedPage() {
  const supabase = await createClient();
 const onTaskSelect= (taskId: number)=>{

 }
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-row gap-5 flex-wrap xs:flex-col ">  
    {/* <div className="bg-lime-500 w-24 h-24 px-12">
          <span>bg </span>
    </div> */}
    {/*  */}
      <div className="flex-[3_1_auto] flex gap-8 flex-wrap flex-col ">
        <div className="flex gap-5 flex-wrap xs:flex-col">
          <TaskCards badgecolor={''} symbol={null} symbolleft={false} title={'Tasks Completed'} des={'tasks on all projects Completed view here.'} badge={''} alltask="20" completed="13" />
          <TaskCards badgecolor={'bg-yellow-100/40'} symbol={'$'} symbolleft={false} title={'Total Amount'} des={'total amounts on all projects and paied .'} badge={'on Tracker'} alltask="10000" completed="300" />
        </div>
        <div className=" flex flex-col gap-5 ">
          <TodayTasks />
          <UpcomingTasks  />
          {/* tasks={Array()} onTaskSelect={onTaskSelect} */}
        </div>
      </div>
      <div className="flex-[1_1_auto] flex  gap-8 flex-wrap flex-col">

      <TaskCards badgecolor={'bg-green-100/40'} symbol={'h'} symbolleft={true} title={'Hours Tracked'} des={<TimerIcon/>} badge={'This Week'} alltask="40" completed="32"/>
        
         
         <WeeklyAvailability />

         <ProgressChart />
         
      </div>
     
    </div>
  );
}
