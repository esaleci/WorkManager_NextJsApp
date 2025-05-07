'use server'

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { ProjectFormValues } from "@/utils/supabase/types";
export  const CretaeProject=async(projectitem:ProjectFormValues)=> {
  
    
  
  const supabase = await createClient()
  const util = require('util')
  const {
      data: { user },
    } = await supabase.auth.getUser();
try{

  const insertData={
    title: projectitem.title,
    userId:user?.id,
    is_del:projectitem.is_del,
    
    description:projectitem.description,
    endDate:projectitem.endDate||null,
    startDate:projectitem.startDate||null,
    status:projectitem.status,
    limitTask:projectitem.limitTask,
    priority:projectitem.priority,
    totalPrice:projectitem.totalPrice,
    paidAmount:projectitem.paidAmount,
    clients:projectitem.clients,
    workSpace:projectitem.workSpace

  }
   
  
  
  const { data,error } = await supabase
  .from("projects")
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
    revalidatePath("/dashboard/projects")
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

export  const GetProjects=async()=> {
  const supabase = await createClient()
  const {
      data: { user },
    } = await supabase.auth.getUser();

    try{
   
      const { data,error } = await supabase
      .from("projects")
      .select('*').eq("userId", user?.id||'').eq('is_del', false).order("created_at",{ascending:false})
  
  
    if (error) {
     
  
      return {
          message: error,
          type: 'error',
          success: false,
          data:[]
      }
    }

//     const getClients=async(clientsArray:any)=>{
//       const clientIdsString = clientsArray||[];
//       const clientIdsArray = JSON.parse(clientIdsString)||[];
//       const clientIds = clientIdsArray.map((id:string) => parseInt(id, 10))
      
//       console.log('data client is',clientIds)
//       if (!clientIds || clientIds.length === 0) return  {
//         message: 'not have a clients',
//         type: 'success',
//         success:true ,
//         data:[]
        
//       };
      
//       // Step 2: Fetch clients by IDs
//       const { data: clients, error: clientsError } = await supabase
//         .from('clients')
//         .select('*')
//         .in('id', clientIds);


        
// if (clientsError) {
//   console.error('Error fetching clients:', clientsError);
//   return  {
//     message: clientsError,
//     type: 'error',
//     success:false ,
//     data:[]
    
//   };
// }

// return clients

//     }

//     const resultData=data
//     .map((item:any) => (

//       { ...item, clients: getClients(item.clients) }
//     ));

    
  
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


export  const GetViewProjects=async()=> {
  const supabase = await createClient()
  const {
      data: { user },
    } = await supabase.auth.getUser();

    try{
   
      const { data,error } = await supabase
      .from("projects")
      .select('*').eq("userId", user?.id||'').eq('is_del', false).order("created_at",{ascending:false})
  
  
    if (error) {
     
  
      return {
          message: error,
          type: 'error',
          success: false,
          data:[]
      }
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

    const getTasks=async(prgId:any)=>{
      if(!prgId){return []}
      
      
      // Step 2: Fetch clients by IDs
      const { data: clients, error: clientsError }  = await supabase.rpc('get_tasksprojects', { "prgid": prgId });


        
if (clientsError) {
  console.error('Error fetching clients:', clientsError);
  return  {
    message: clientsError.message,
    type: 'error',
    success:false ,
    data:[]
    
  };
}

return clients

    }

    const resultData= (await Promise.all(data
    .map(async(item:any) =>{ 
        const cc=await getClients(item.clients);
        const tasks=await getTasks(item.id);
      return (
      
      { ...item, clientData:cc,tasks:tasks }
    )}))).flat();

    
  
  //   return data
        // console.log('data is',resultData)
        const util = require('util')
        console.log(util.inspect({datahere:'data get ssdata is',resultData}, false, null, true /* enable colors */))
        return {
          message: 'Success',
          success: true,
          type: 'success',
          data:resultData
        }
     
     }catch(err){
      console.log('data error is',err)
       return {
         message: err,
         type: 'error',
         success: false,
         data:[]
         
     }
     
     }
    
  


}

export  const GetProject=async(id:string)=> {
    const supabase = await createClient()
    const {
        data: { user },
      } = await supabase.auth.getUser();
  
      try{
     
        const { data,error } = await supabase
        .from("projects")
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

export  const DelProjects=async(id:string)=> {
  const supabase = await createClient()
  const {
      data: { user },
    } = await supabase.auth.getUser();

    try{
   
      const { data,error } = await supabase
      .from("projects")
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
        revalidatePath("/dashboard")
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

export  const UpdateProject=async(projectitem:ProjectFormValues)=> {
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
    title: projectitem.title,
    is_del:projectitem.is_del,
    description:projectitem.description,
    endDate:projectitem.endDate||null,
    startDate:projectitem.startDate||null,
    status:projectitem.status,
    limitTask:projectitem.limitTask,
    priority:projectitem.priority,
    totalPrice:projectitem.totalPrice,
    paidAmount:projectitem.paidAmount,
    clients:projectitem.clients,
  }

  const { data, error } = await supabase
  .from('projects')
  .update(UpdateData)
  .eq('id', projectitem.id||'') 
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
        revalidatePath("/dashboard/project")
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
