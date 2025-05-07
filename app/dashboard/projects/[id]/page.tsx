import { GetProject } from "@/app/api/projects/route";
import ProjectUI from "@/components/dashboard/projects/project-ui";
import { toast } from "@/components/hooks/use-toast";
type Params = Promise<{ id: string }>

const getProject=async(id:string)=>{
  const getDataprg=await GetProject(id);
 

return getDataprg
}
export default async function ProjectUi(props: {
    params: Params
  }) {
    const params = await props.params
    const id = params.id

    const getPrgData=await getProject(id)
    if(!getPrgData.success){
   
        toast({
       title: "Error",
       description: "Failed to open project. Please try again.",
       variant: "destructive",
     });
     }

    return(
      <ProjectUI prgitem={getPrgData.data||{}} />
    )
}