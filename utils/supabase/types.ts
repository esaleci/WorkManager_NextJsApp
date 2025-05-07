import { any, z } from "zod";

export const projectFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    startDate: z.date().optional().nullable(),
    endDate: z.date().optional().nullable(),
    totalPrice: z.number().min(0).optional().nullable(),
    paidAmount: z.number().min(0).optional().nullable(),
    clients:z.string().array().optional(),
    limitTask:z.number().min(1, "Title is required"),
    priority:z.number().min(1, "Title is required"),
    status:z.number().min(1, "Title is required"),
    is_del:z.boolean(),
    id:z.string().optional(),
    workSpace:z.number().min(1, "Title is required"),
    userId:z.string().optional(),
    username:z.string().optional()
  });
  
  export type ProjectFormValues = z.infer<typeof projectFormSchema>;


  
export const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  startDate: z.date().optional().nullable(),
  endDate: z.date().optional().nullable(),
  paidAmount: z.number().min(0).optional().nullable(),
  clients:z.string().array().optional(),
  attachments:z.string().array().optional(),
  priority:z.number().min(1, "Title is required"),
  status:z.number().min(1, "Title is required"),
  is_del:z.boolean(),
  id:z.number().optional(),
  projectId:z.string().optional(),
  userId:z.string().optional(),
  username:z.string().optional(),
  projects:projectFormSchema.optional(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;


  export interface Client {
    id?: number;
    name: string;
    position: string;
    avatar: string;
    is_del:boolean;
    userId?:string;
  }

  export function getEnumKeyValueByValue<T>(enumObj: T, value: string): keyof T | undefined {
    return Object.keys(enumObj).find(key => enumObj[key as keyof T] === value) as keyof T | undefined;
  }

  export function getEnumKeyByValue<T>(enumObj: T, value: string): keyof T | undefined {
    return (Object.keys(enumObj) as Array<keyof T>).find(
      key => enumObj[key] === value
    );
  }