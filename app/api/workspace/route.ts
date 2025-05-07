'use server'

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function POST(request:any) {
  
    
    const { title} = await request.json();
    const supabase = await createClient()
    const util = require('util')
    const {
        data: { user },
      } = await supabase.auth.getUser();
  try{
     
    const { data,error } = await supabase
    .from("workspace")
    .insert({
      title: title,
      userId:user?.id,
    })


  if (error) {
   

    return NextResponse.json({
        message: error,
        type: 'error',
        success: false
        
    })
  }

//   return data
      // revalidatePathLocale("/dashboard/account")
      return NextResponse.json({
        message: 'Success',
        success: true,
        type: 'success',
       
      })
   
   }catch(err){
   
     return NextResponse.json({
       message: err,
       type: 'error',
       success: false
       
   })
   
   }

  
}


export  const CretaeWorkSpace=async(request:any)=> {
  
    
  const title = request.title;
  const supabase = await createClient()
  const util = require('util')
  const {
      data: { user },
    } = await supabase.auth.getUser();
try{

  const insertData={
    title: title,
    userId:user?.id,
    is_del:request.is_del,
    id:request.id,
  }
   
  console.log('inserdata',insertData)
  const { data,error } = await supabase
  .from("workspace")
  .upsert({
    title: title,
    is_del:request.is_del,
    userId:user?.id,
  }).select()


if (error) {
 

  return {
      message: error,
      type: 'error',
      success: false,
      data:{}
      
  }
}

//   return data
    // revalidatePathLocale("/dashboard/account")
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

export  const GetWorkSpaces=async()=> {
  const supabase = await createClient()
  const {
      data: { user },
    } = await supabase.auth.getUser();

    try{
   
      const { data,error } = await supabase
      .from("workspace")
      .select('title,id').eq("userId", user?.id||'').eq('is_del', false).order("created_at",{ascending:false})
  
  
    if (error) {
     
  
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

export  const DelWorkSpaces=async(id:number)=> {
  const supabase = await createClient()
  const {
      data: { user },
    } = await supabase.auth.getUser();

    try{
   
      const { data,error } = await supabase
      .from("workspace")
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

export  const UpdateWorkSpace=async(workspace:any)=> {
  const supabase = await createClient()
  const vtitle=String(workspace.title) ||null
  const {
      data: { user },
    } = await supabase.auth.getUser();

    try{
   
  //     const { data,error } = await supabase
  //     .from("workspace")
  //     .update({ title: vtitle })
  // .eq('id', workspace.id) .select()
      
  const { data, error } = await supabase
  .from('workspace')
  .update({ title: workspace.title,is_del:false })
  .eq('id', workspace.id) 
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

export async function GET(request: Request){
    const supabase = await createClient()
    const {
        data: { user },
      } = await supabase.auth.getUser();

      try{
     
        const { data,error } = await supabase
        .from("workspace")
        .select('title,id').eq("userId", user?.id||'').eq('is_del', false).order("created_at",{ascending:false})
    
    
      if (error) {
       
    
        return NextResponse.json({
            message: error,
            type: 'error',
            success: false
            
        })
      }
    
    //   return data
          // revalidatePathLocale("/dashboard/account")
          return NextResponse.json({
            message: 'Success',
            success: true,
            type: 'success',
            data:data
          })
       
       }catch(err){
       
         return NextResponse.json({
           message: err,
           type: 'error',
           success: false
           
       })
       
       }
      
  }

function revalidatePathLocale(arg0: string) {
  throw new Error("Function not implemented.");
}
