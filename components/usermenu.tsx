'use client'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import * as React from "react"
  import { DropdownMenuCheckboxItemProps  } from "@radix-ui/react-dropdown-menu"
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    DropdownMenuGroup, DropdownMenuItem
  } from "@/components/ui/dropdown-menu"
   
  type Checked = DropdownMenuCheckboxItemProps["checked"]
import HeaderAuth from "./header-auth"
import { Button } from "./ui/button"
import { signOutAction } from "@/app/actions"
   
  export function UserMenu({user}: {user: any}) {
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="p-0" variant="ghost">
          <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
            disabled
          >
            Activity Bar
          </DropdownMenuCheckboxItem>
          {/* <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
          
          </DropdownMenuCheckboxItem> */}
           <DropdownMenuSeparator />
           <DropdownMenuItem  onClick={signOutAction} className="">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
        </DropdownMenuGroup>
             {/* <Button type="submit" variant={"ghost"}>
          Sign out
        </Button> */}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }