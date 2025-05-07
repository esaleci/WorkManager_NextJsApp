"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, PlusCircle, Search, User } from "lucide-react"
import { Client } from "@/utils/supabase/types"
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ClientForm } from "./client-form"
import { cn } from "@/lib/utils"

interface ClientDropdownProps {
  clients: Client[]
  onSelect: (clients: Client[] | []) => void
  onAddClient: (client: Client) => void
  selectedClient?: Client[] | []
  placeholder?: string
}

export function ClientDropdown({
  clients,
  onSelect,
  onAddClient,
  selectedClient,
  placeholder = "Select a client"
}: ClientDropdownProps) {
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter clients based on search query
  const filteredClients = clients.filter((client) =>
    client.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddClient = (client: Client) => {
    onAddClient(client)
    setDialogOpen(false)
    // Select the newly added client
    toggleSelection(client)
  }

  const toggleSelection = (client:Client) => {
    onSelect(prev => {
      if (prev.some(c => c.id === client.id)) {
        // Remove if already selected
        return prev.filter(c => c.id !== client.id)
      } else {
        // Add if not selected
        return [...prev, client]
      }
    })
    console.log('select clients',client,selectedClient)
  };

  // Focus input when popover opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  const isSelected = (client:Client) =>
    selectedClient?.some(c => c.id === client.id)

  return (
    <div className="flex w-full  items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {/* {selectedClient ? (
              <div className="flex items-center">
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarImage src={selectedClient.avatar} alt={selectedClient.name} />
                  <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                </Avatar>
                <span>{selectedClient.name}</span>
              </div>
            ) : (
              placeholder
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
              {selectedClient||[].length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedClient?.map((client) => (
                <div key={client.id} className="flex items-center bg-stone-800 px-2 py-1 rounded text-sm">
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage src={client.avatar} alt={client.name} />
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  <span>{client.name}</span>
                </div>
              ))}
            </div>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput 
              placeholder="Search clients..." 
              className="h-9"
              value={searchQuery}
              onValueChange={setSearchQuery}
              ref={inputRef}
              // starticon={<Search className="h-4 w-4" />}
            />
            <CommandList>
              <CommandEmpty>
                <div className="py-6 text-center text-sm">
                  No clients found.
                </div>
              </CommandEmpty>
              <CommandGroup>
                {filteredClients.map((client) => (
                  <CommandItem
                    key={client.id}
                    value={client.id}
                    onSelect={() => {
                      toggleSelection(client)
                      setOpen(false)
                      setSearchQuery("")
                    }}
                  >
                    <div className="flex flex-1 items-center">
                      <Avatar className="mr-2 h-7 w-7">
                        <AvatarImage src={client.avatar} alt={client.name} />
                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span>{client.name}</span>
                        <span className="text-xs text-muted-foreground">{client.position}</span>
                      </div>
                    </div>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        isSelected(client) ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              {/* <CommandGroup>
              
              </CommandGroup> */}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
     
    </div>
  )
}