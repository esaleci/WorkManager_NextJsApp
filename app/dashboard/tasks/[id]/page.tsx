
import { GetTask } from "@/app/api/tasks/route";
import TaskUI from "@/components/dashboard/tasks/task-ui";
import { toast } from "@/components/hooks/use-toast";
type Params = Promise<{ id: string }>

const getItem=async(id:string)=>{
  const getData=await GetTask(id);
 

return getData
}
export default async function TaskPage(props: {
    params: Params
  }) {
    const params = await props.params
    const id = params.id

    const getData=await getItem(id)
    if(!getData.success){
   
        toast({
       title: "Error",
       description: "Failed to open project. Please try again.",
       variant: "destructive",
     });
     }

    return(
      <TaskUI taskitem={getData.data||{}} />
    )
}