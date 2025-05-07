"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export default function ProgressColorDemo({alltask,completed}) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const prg=100/Number(alltask||0)*Number(completed||0)
    // console.log('progress task card is',prg,alltask,completed)
    const timer = setTimeout(() => setProgress(prg), 500);
    return () => clearTimeout(timer);

  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      
      <Progress value={progress}  className="w-full [&>div]:bg-green-500" />
      {/* <Progress value={progress} className="w-[60%] [&>div]:bg-rose-500" /> */}
    </div>
  );
}