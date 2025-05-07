import HeaderAuth from "@/components/header-auth";
import Hero from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";


export default async function Home() {
  return (
    <>
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
     <nav className="w-full  flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full  flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}>Work Manager</Link>
                   
                  </div>
                  <div className="flex gap-5">
                   <HeaderAuth />
                   <ThemeSwitcher />
                   </div>
                </div>
              </nav>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Next steps</h2>
        {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
      </main>
      </div>
    </>
  );
}
