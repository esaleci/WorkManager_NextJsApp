'use server'

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Client } from "@/utils/supabase/types";
import path from "path"
import fs from 'fs/promises';

export  const CretaeClient=async(item:Client)=> {
  
    
  
  const supabase = await createClient()
  const util = require('util')
  const {
      data: { user },
    } = await supabase.auth.getUser();
try{

  const insertData={
    name: item.name,
    userId:user?.id,
    is_del:item.is_del,
    
    position:item.position,
    avatar:item.avatar||null,
   

  }
   
  console.log('inserdata ',insertData)
  
  const { data,error } = await supabase
  .from("clients")
  .insert(insertData).select()


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

export  const GetClients=async()=> {
  const supabase = await createClient()
  const {
      data: { user },
    } = await supabase.auth.getUser();

    try{
   
      const { data,error } = await supabase
      .from("clients")
      .select('*').eq("userId", user?.id||'').eq('is_del', false).order("created_at",{ascending:false})
  
  
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

export  const GetClient=async(id:string)=> {
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

export  const DelClient=async(id:string)=> {
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

export  const UpdateClient=async(item:Client)=> {
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
    name: item.name,
   
    is_del:item.is_del,
    
    position:item.position,
    avatar:item.avatar||null,
  }

  const { data, error } = await supabase
  .from('clients')
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


export  const AddClientsToProject=async(items:Client[],prjId:string)=> {
  
    
  
  const supabase = await createClient()
  const util = require('util')
 
try{

  const insertData=items.map((a)=>({clientId:a.id ,projectId:prjId }))
   
  
  
  const { data,error } = await supabase
  .from("clients")
  .insert(insertData).select()


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

export  const DelClientsOfProject=async(items:any[])=> {
  
    
  
  const supabase = await createClient()
  const util = require('util')
 
try{

  const deleteIds=items.map((a)=>(a.id))
   
  
  
  const { data,error } = await supabase
  .from("clients")
  .update({ is_del: true })
  .in('id', deleteIds) .select()


if (error) {
 
    console.log('inserdata error',error,deleteIds)
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

export async function UploadImage(file: File) {
  // const formData = await request.formData();
  // const file = formData.get('file') as Blob;

  if (!file) {
    return ({ type: 'error', success: false, message: 'No file uploaded' });
  }

  const fileExt = file.name.split('.').pop()
  const buffer = await file.arrayBuffer();
  const bufferTyped = Buffer.from(buffer);
  const fileName=file.name+Date.now().toString()+'.'+fileExt
  const savePath = path.join(process.cwd(), 'public', 'images', fileName);

  await fs.writeFile(savePath, bufferTyped);

  return {success: true, message: 'File saved', data: `/images/${fileName}` };
 
}