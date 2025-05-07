'use server'

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { TaskFormValues } from "@/utils/supabase/types";
import Projects from "@/components/dashboard/projects/projects";
export  const CretaeTask=async(item:TaskFormValues)=> {
  
    
  
  const supabase = await createClient()
  const util = require('util')
  const {
      data: { user },
    } = await supabase.auth.getUser();
try{

  const insertData={
    title: item.title,
    userId:user?.id,
    is_del:item.is_del,
    
    description:item.description,
    endDate:item.endDate||null,
    startDate:item.startDate||null,
    status:item.status,
    attachments:item.attachments,
    priority:item.priority,
    
    paidAmount:item.paidAmount,
    clients:item.clients,
    projectId:item.projectId?item.projectId:null

  }
   
  
  
  const { data,error } = await supabase
  .from("tasks")
  .upsert(insertData).select()


if (error) {
 
    console.log('inserdata error',error,insertData)
  return {
      message: error,
      type: 'error',
      success: false,
      data:{}
      
  }
}

//   return data
    // revalidatePathLocale("/dashboard/account")
    revalidatePath("/dashboard/tasks")
    return {
      message: 'Success',
      success: true,
      type: 'success',
      data:data
     
    }
 
 }catch(err){
 
   return {
     message: err,
     type: 'error',
     success: false,
     data:{}
 }
 
 }


}

export  const GetTasks=async()=> {
  const supabase = await createClient()
  const {
      data: { user },
    } = await supabase.auth.getUser();

    try{
   
      const { data,error } = await supabase
      .from("tasks")
      .select('*, projects (*)').eq("userId", user?.id||'').eq('is_del', false).order("created_at",{ascending:false})
  

  
    if (error) {
     
      console.log('data is error',error)
      return {
          message: error,
          type: 'error',
          success: false,
          data:[]
      }
    }



  
  //   return data
        // console.log('data is',data)
        return {
          message: 'Success',
          success: true,
          type: 'success',
          data:data
        }
     
     }catch(err){
     
       return {
         message: err,
         type: 'error',
         success: false,
         data:[]
         
     }
     
     }
    
  


}

export  const GetTasksViaClients=async(date?:Date)=> {
  const supabase = await createClient()
  let datafind;
  const {
      data: { user },
    } = await supabase.auth.getUser();

    try{
   
      const { data,error } = await supabase
      .from("tasks")
      .select('*, projects (*, workspace (*) )').eq("userId", user?.id||'').eq('is_del', false).order("created_at",{ascending:false})
  
     
  
    if (error) {
     
      console.log('data is error',error)
      return {
          message: error,
          type: 'error',
          success: false,
          data:[]
      }
    }

    datafind=data;
    if(date){
      console.log('date is on api',date.toDateString())
      datafind=data.filter(item => {
        const itemDateStr = new Date(item.startDate).toDateString(); // Extract date part
        console.log('date is on db ',itemDateStr)
        return (
          // itemDateStr === todayStr ||
          (itemDateStr === date.toDateString())
        );
      });
      console.log('date is ',date.toDateString(),datafind)
    }

    const getClients=async(clientsArray:any)=>{
      if(!clientsArray){return []}
      console.log('data client is',clientsArray)
      // const clientIdsString = clientsArray||[];
      // const clientIdsArray = JSON.parse(clientIdsString)||[];
      const clientIds = clientsArray?.map((id:string) => parseInt(id, 10))
      
      console.log('data client is array',clientIds)
      if (!clientIds || clientIds.length === 0) return  {
        message: 'not have a clients',
        type: 'success',
        success:true ,
        data:[]
        
      };
      
      // Step 2: Fetch clients by IDs
      const { data: clients, error: clientsError } = await supabase
        .from('clients')
        .select('*')
        .in('id', clientIds);


        
if (clientsError) {
  console.error('Error fetching clients:', clientsError);
  return  {
    message: clientsError,
    type: 'error',
    success:false ,
    data:[]
    
  };
}

return clients

    }

    const resultData= (await Promise.all(datafind
    .map(async(item:any) =>{ 
        const cc=await getClients(item.clients);
      return (
      
      { ...item, clientData:cc }
    )}))).flat();
  
  //   return data
        // console.log('data is',data)
        return {
          message: 'Success',
          success: true,
          type: 'success',
          data:resultData
        }
     
     }catch(err){
     
       return {
         message: err,
         type: 'error',
         success: false,
         data:[]
         
     }
     
     }
    
  


}



export  const GetTask=async(id:string)=> {
    const supabase = await createClient()
    const {
        data: { user },
      } = await supabase.auth.getUser();
  
      try{
     
        const { data,error } = await supabase
        .from("tasks")
        .select('*').eq("id", id||'').eq("userId", user?.id||'').eq('is_del', false).single()
    
    
      if (error) {
       
    
        return {
            message: error,
            type: 'error',
            success: false,
            data:{}
        }
      }
    
    //   return data
          console.log('data is',data)
          return {
            message: 'Success',
            success: true,
            type: 'success',
            data:data
          }
       
       }catch(err){
       
         return {
           message: err,
           type: 'error',
           success: false,
           data:{}
           
       }
       
       }
      
    
  
  
  }

export  const DelTask=async(id:string)=> {
  const supabase = await createClient()
  const {
      data: { user },
    } = await supabase.auth.getUser();

    try{
   
      const { data,error } = await supabase
      .from("tasks")
      .update({ is_del: true })
  .eq('id', id) .select()
      
  
  
    if (error) {
     
  
      return {
          message: error,
          type: 'error',
          success: false,
          data:{}
      }
    }
  
  //   return data
        console.log('data is',data,error)
        revalidatePath("/dashboard/tasks")
        return {
          message: 'Success',
          success: true,
          type: 'success',
          data:data
        }
     
     }catch(err){
     
       return {
         message: err,
         type: 'error',
         success: false,
         data:{}
         
     }
     
     }
    
  


}


export const getClientsByIds=async(projectId:string) =>{
 
  const supabase = await createClient()
  try{
  const { data: project, error: projectError } = await supabase
  .from('projects')
  .select('clients')
  .eq('id', projectId)
  .single();

if (projectError) {
  console.error('Error fetching project:', projectError);
  return {
    message: projectError,
    type: 'error',
    success: false,
    data:[]
    
}
}


 // e.g., ["3", "5"]
 const clientIdsString = project.clients||[];
// const clientIdsArray = JSON.parse(clientIdsString)||[];
const clientIds = clientIdsString.map((id:string) => parseInt(id, 10))

console.log('data client is',clientIds)
if (!clientIds || clientIds.length === 0) return  {
  message: 'not have a clients',
  type: 'success',
  success:true ,
  data:[]
  
};

// Step 2: Fetch clients by IDs
const { data: clients, error: clientsError } = await supabase
  .from('clients')
  .select('*')
  .in('id', clientIds);

if (clientsError) {
  console.error('Error fetching clients:', clientsError);
  return  {
    message: clientsError,
    type: 'error',
    success:false ,
    data:[]
    
  };
}

 
  
 

   
    // revalidatePath("/dashboard/tasks")
    return {
      message: 'Success',
      success: true,
      type: 'success',
      data:clients
    }
  }catch(err){
     
    return {
      message: err,
      type: 'error',
      success: false,
      data:[]
      
  }
}
  
}
export  const UpdateTask=async(item:TaskFormValues)=> {
  const supabase = await createClient()
 
  const {
      data: { user },
    } = await supabase.auth.getUser();

    try{
   
  //     const { data,error } = await supabase
  //     .from("workspace")
  //     .update({ title: vtitle })
  // .eq('id', workspace.id) .select()

  const UpdateData={
    title: item.title,
    is_del:item.is_del,
    description:item.description,
    endDate:item.endDate||null,
    startDate:item.startDate||null,
    status:item.status,
    attachments:item.attachments,
    priority:item.priority,
    projectId:item.projectId||null,
    paidAmount:item.paidAmount,
    clients:item.clients,
  }

  const { data, error } = await supabase
  .from('tasks')
  .update(UpdateData)
  .eq('id', item.id||'') 
  .select()
  
    if (error) {
     
  
      return {
          message: error,
          type: 'error',
          success: false,
          data:{}
      }
    }
  
  //   return data
        console.log('data is',data,error)
        revalidatePath("/dashboard/tasks")
        return {
          message: 'Success',
          success: true,
          type: 'success',
          data:data
        }
     
     }catch(err){
     
       return {
         message: err,
         type: 'error',
         success: false,
         data:{}
         
     }
     
     }
    
  


}
