'use client'
import {capitalizeFirstWord} from "@/utils/tools"
import { usePathname } from "next/navigation"
export const PathNav=()=>{
    const paths=usePathname().split('/');
    const path=capitalizeFirstWord(paths[paths.length-1]?.toLocaleLowerCase());
    return(
        <h2 className="text-xl">{path}</h2>
    )
}