'use client'
import { useEffect, useState } from "react";
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
import { CalendarIcon, Clock, PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { formatTime, formatTime2, TaskPriorityEnum, TaskStatusEnum } from "@/utils/tools";
import { GetWorkSpaces } from "@/app/api/workspace/route";
import {Client, projectFormSchema, ProjectFormValues} from "@/utils/supabase/types"
import { useFormStatus } from "react-dom";
import { CretaeProject, UpdateProject } from "@/app/api/projects/route";
import { ClientDropdown } from "../clients/client-dropdown";
import { GetClients } from "@/app/api/clients/route";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ClientForm } from "../clients/client-form";
// Extend the insert schema with validation


interface TaskFormProps {
  onSuccess?: () => void;
  initialData?: Partial<ProjectFormValues>;
  onChangedData?:(value:boolean) => void;
}


interface initialState  {
  message: string
  type: string,
  success: false,
  data:any
}

export function ProjectForm({ onSuccess, initialData ,onChangedData}: TaskFormProps) {
  const { toast } = useToast();


   const startTimedata=formatTime2(initialData?.startDate||null);

   const endTimedata=formatTime2(initialData?.endDate||null);
  //  console.log('date is',startTimedata,endTimedata)
  const [startTime, setStartTime] = useState<string>(startTimedata||"09:00");
  const [endTime, setEndTime] = useState<string>(endTimedata || "10:00");
  const [workspaces, setWorkspaces] = useState(Array());
  const [isLoadingWorkspaces, setIsLoadingWorkspaces] = useState(false);
  const { pending } = useFormStatus()

  const [clients, setClients] = useState(Array())
  const [selectedClient, setSelectedClient] = useState<Client[] | null>([])
  const [dialogOpen, setDialogOpen] = useState(false)

  const [open, setOpen] = useState(false)
  // const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddClient = (newClient: Client) => {
    setClients((prev) => [newClient, ...prev])
    setDialogOpen(false)
  }

 const fillClientFromSavedData=(clients:Client[])=>{
  // setSelectedClient(null) clients?.some(c => c.id === client.id)
  const selectC= clients.filter((item:Client) => initialData?.clients?.includes((item.id??0)));
  setSelectedClient(selectC)
 }

  const handleDeleteClient = (id: string) => {
    setClients((prev) => prev.filter((client) => client.id !== id))
    if (selectedClient?.id === id) {
      setSelectedClient(null)
    }
  }

  useEffect(()=>{
  async function getworkspace() {
            const getworkspace=await GetWorkSpaces();
            if(getworkspace?.success){
                setWorkspaces(getworkspace?.data||[])
                setIsLoadingWorkspaces(false)
            }else{
              setIsLoadingWorkspaces(false)
                toast({
                    title: "Error",
                    description: "Failed to Load workSpace. Please try again.",
                    variant: "destructive",
                  });
            }
        }

        async function getClients() {
          const getClients=await GetClients();
          if(getClients?.success){
            setClients(getClients?.data||[])
              setIsLoadingWorkspaces(false)
              fillClientFromSavedData(getClients?.data)
          }else{
            setIsLoadingWorkspaces(false)
              toast({
                  title: "Error",
                  description: "Failed to Load workSpace. Please try again.",
                  variant: "destructive",
                });
          }
      }

        getworkspace()
        getClients()
  },[])

  
  // Set up form with default values
  const form = useForm<ProjectFormValues>({
    
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      status: initialData?.status || TaskStatusEnum.TODO,
      priority: initialData?.priority || TaskPriorityEnum.MEDIUM,
      workSpace: initialData?.workSpace || (workspaces?.[0]?.id || 1),
      userId: initialData?.userId || '',
      startDate: new Date(initialData?.startDate || Date.now()),
      endDate: new Date(initialData?.endDate || Date.now()),
      totalPrice: initialData?.totalPrice || 0,
      paidAmount: initialData?.paidAmount || 0,
      limitTask:initialData?.limitTask||1,
      clients:[],
      is_del:initialData?.is_del||false,
      id:initialData?.id||'',
      

    },
  });

  // Create task mutation
  // const createTaskMutation = useMutation({
  //   mutationFn: async (data: TaskFormValues) => {
  //     // Convert dates with times
  //     if (data.startDate) {
  //       const [startHours, startMinutes] = startTime.split(':').map(Number);
  //       const startDate = new Date(data.startDate);
  //       startDate.setHours(startHours, startMinutes);
  //       data.startDate = startDate;
  //     }
      
  //     if (data.endDate) {
  //       const [endHours, endMinutes] = endTime.split(':').map(Number);
  //       const endDate = new Date(data.endDate);
  //       endDate.setHours(endHours, endMinutes);
  //       data.endDate = endDate;
  //     }
      
  //     return apiRequest('POST', '/api/tasks', data);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
  //     queryClient.invalidateQueries({ queryKey: ['/api/tasks/today'] });
  //     queryClient.invalidateQueries({ queryKey: ['/api/tasks/upcoming'] });
  //     queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
  //     toast({
  //       title: "Task created",
  //       description: "The task has been created successfully.",
  //     });
  //     form.reset();
  //     onSuccess?.();
  //   },
  //   onError: () => {
  //     toast({
  //       title: "Error",
  //       description: "Failed to create task. Please try again.",
  //       variant: "destructive",
  //     });
  //   },
  // });

  // Form submission handler
  async function onSubmit(values: ProjectFormValues) {
   
        if (values.startDate) {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const startDate = new Date(values.startDate);
        startDate.setHours(startHours, startMinutes);
        values.startDate = startDate;
      }
      
      if (values.endDate) {
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        const endDate = new Date(values.endDate);
        endDate.setHours(endHours, endMinutes);
        values.endDate = endDate;
      }

      values.clients=selectedClient?.map(a => (a.id ?? '').toString()) || []; //selectedClient?.map((a)=> (a.id||''.toString()));

      console.log('data',values)
    let savedData:initialState;
        if(form.getValues().id||0 > 0){
          savedData = await UpdateProject(values);
        }else{
          savedData = await CretaeProject(values);
        }
        console.log('suu',savedData)
        if(savedData.success){
              toast({
            title: `Project ${values.id||0 >0 ? 'edited' : 'created'}`,
            description: `The project has been ${values.id||0 >0 ? 'edited' : 'created'} successfully.`,
          });
              form.reset();
          onSuccess?.();
          if(onChangedData)
             onChangedData(true)
        }else{
             toast({
            title: "Error",
            description:`Failed to ${values.id||0 >0 ? 'edited' : 'created'} project.. Please try again.` ,
            variant: "destructive",
          });
        }
  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1 ">
        <div className="space-y-4">
          {/* <h2 className="text-xl font-semibold">Create New Project</h2> */}
          
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Project title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Project description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="workSpace"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a workspace" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {workspaces?.map((workspace: any) => (
                        <SelectItem key={workspace.id} value={workspace.id.toString()}>
                          {workspace.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={TaskStatusEnum.TODO.toString()}>To Do</SelectItem>
                      <SelectItem value={TaskStatusEnum.IN_PROGRESS.toString()}>In Progress</SelectItem>
                      <SelectItem value={TaskStatusEnum.COMPLETED.toString()}>Completed</SelectItem>
                      <SelectItem value={TaskStatusEnum.ON_HOLD.toString()}>On Hold</SelectItem>
                      <SelectItem value={TaskStatusEnum.CANCELLED.toString()}>Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={TaskPriorityEnum.HIGH.toString()}>High</SelectItem>
                      <SelectItem value={TaskPriorityEnum.MEDIUM.toString()}>Medium</SelectItem>
                      <SelectItem value={TaskPriorityEnum.LOW.toString()}>Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
         
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="mt-2">
                <FormLabel>Start Time</FormLabel>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="time"
                    defaultValue={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="mt-2">
                <FormLabel>End Time</FormLabel>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="time"
                    defaultValue={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
              control={form.control}
              name="limitTask"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Limit Task</FormLabel>
                  <FormControl>
                    <div className="relative">
                     
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        className="pl-7"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Budget</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        className="pl-7"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="paidAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        className="pl-7"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <FormField
              control={form.control}
              name="clients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Clients</FormLabel>
                  <FormControl>
                    <div className="relative">
                     
                      <ClientDropdown
                      clients={clients}
                      onSelect={setSelectedClient}
                      onAddClient={handleAddClient}
                      selectedClient={selectedClient}
                      placeholder="Search or select client"
                    />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save Project"}
          </Button>
       
        </div>
      </form>
    </Form>
    <div className="flex gap-4 items-center justify-start">
     <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant={"ghost"}
                      onSelect={() => {
                        setDialogOpen(true)
                        setOpen(false)
                      }}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>Add new client</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
      <DialogTitle>Add New Client</DialogTitle>
      <DialogDescription>
      Fill in the details to add a new client to your list.
      </DialogDescription>
      </DialogHeader>
                    <div className="space-y-4 py-2 pb-4">
                     
                      <ClientForm 
                        onAddClient={handleAddClient} 
                        onCancel={() => setDialogOpen(false)}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                </div>
                </>
  );
}
