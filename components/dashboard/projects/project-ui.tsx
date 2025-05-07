'use client'

import { useState } from "react";
import { ProjectForm } from "./project-form"

export default function ProjectUI({prgitem}:{prgitem:any}){
 const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    return(
        <ProjectForm  initialData={prgitem}  onSuccess={() => setIsCreateDialogOpen(false)}/>
    )
}