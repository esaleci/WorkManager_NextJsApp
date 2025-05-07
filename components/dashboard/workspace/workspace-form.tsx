'use client'
import useSWR from 'swr'

import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
// import { insertTaskSchema, TaskStatusEnum, TaskPriorityEnum } from "@shared/schema";
import { apiRequest } from "@/lib//queryClient";
import { useToast } from "@/components/hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface workSpaceFormSchemaDB {
    title:string;
    description:string;
  }
// Extend the insert schema with validation
const workSpaceFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  id:z.number().optional(),
  is_del:z.boolean().optional()
});

type WorkSpaceFormValues = z.infer<typeof workSpaceFormSchema>;

interface WorkSpaceFormProps {
  onSuccess?: () => void;
  initialData?: Partial<WorkSpaceFormValues>;
  onChangedData?:(value:boolean) => void;
}
import {CretaeWorkSpace, UpdateWorkSpace}  from '@/app/api/workspace/route'
import { useFormStatus } from 'react-dom';
 
interface initialState  {
  message: string
  type: string,
  success: false,
  data:any
}

export function WorkSpaceForm({ onSuccess, initialData,onChangedData }: WorkSpaceFormProps) {
  const { toast } = useToast();
  // const [state, formAction, pending] = useActionState(CretaeWorkSpace, initialState)
  const { pending } = useFormStatus()
//   const queryClient = useQueryClient();
  

  // const { data: workspaces, isLoading: isLoadingWorkspaces } = useQuery({
  //   queryKey: ['/api/workspace'],
  // });


  // Set up form with default values
  const form = useForm<WorkSpaceFormValues>({
    resolver: zodResolver(workSpaceFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      id:initialData?.id ||0,
      is_del:initialData?.is_del || false,
    },
  });

  

  // Create task mutation
  // const createTaskMutation = useMutation({
  //   mutationFn: async (data: WorkSpaceFormValues) => {
  //     // Convert dates with times
  //     return apiRequest('POST', '/api/workspace', data);
  //   },
  //   onSuccess: () => {
  //   //   queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
  //     toast({
  //       title: "WorkSpace created",
  //       description: "The workSpace has been created successfully.",
  //     });
  //     form.reset();
  //     onSuccess?.();
  //   },
  //   onError: () => {
  //     toast({
  //       title: "Error",
  //       description: "Failed to create workSpace. Please try again.",
  //       variant: "destructive",
  //     });
  //   },
  // });

  
  // Form submission handler
  async function onSubmit(values: WorkSpaceFormValues) {
    let savedData:initialState;
    if(form.getValues().id||0 > 0){
      savedData = await UpdateWorkSpace(values);
    }else{
      savedData = await CretaeWorkSpace(values);
    }
    console.log('suu',savedData)
    if(savedData.success){
          toast({
        title: `WorkSpace ${values.id||0 >0 ? 'edited' : 'created'}`,
        description: `The workSpace has been ${values.id||0 >0 ? 'edited' : 'created'} successfully.`,
      });
          form.reset();
      onSuccess?.();
      if(onChangedData){
        console.log('run changed workspace')
         onChangedData(true);
      }
    }else{
         toast({
        title: "Error",
        description: "Failed to create workSpace. Please try again.",
        variant: "destructive",
      });
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1">
        <div className="space-y-4">
         
          <input type='hidden' id='id' name='id' defaultValue={initialData?.id} />
          <input type='hidden' id='is_del' name='is_del' defaultChecked={initialData?.is_del} />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="WorkSpace title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
       
          </div>
        
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save WorkSpace"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
