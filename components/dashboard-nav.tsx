

import HeaderAuth from "./header-auth";
import { PathNav } from "./path-nav";
import { ThemeSwitcher } from "./theme-switcher";
import { usePathname } from "next/navigation";

export default async function DashboardNav() {
   
    return (
      

<nav className="w-full  flex justify-center  h-16">
<div className="w-full  flex justify-between items-center p-3 px-5 text-sm">
  <div className="flex gap-5 items-center font-semibold">
    <PathNav/>
   
  </div>
  <div className="flex gap-5">
   <HeaderAuth/>
   <ThemeSwitcher />
   </div>
</div>
</nav>)}