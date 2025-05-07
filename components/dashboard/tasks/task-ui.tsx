'use client'

import { useState } from "react";
import { TaskForm } from "./task-form";

export default function TaskUI({taskitem}:{taskitem:any}){
 const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    return(
        <TaskForm  initialData={taskitem}  onSuccess={() => setIsCreateDialogOpen(false)}/>
    )
}